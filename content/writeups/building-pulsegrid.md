PulseGrid is a small infrastructure monitor. An agent runs on a machine, reads its CPU and memory every few seconds, and sends the numbers to a backend. The backend stores the history, keeps track of which agents are still reporting, and raises an alert when something runs hot. A dashboard polls all of that and shows it.

Tools like Datadog and Grafana make this look effortless: install an agent, and a few seconds later there's a graph. I wanted to know what has to happen between those two points, so I built a much smaller version of the pipeline myself.

Most of it came together over about two and a half weeks in June 2026. Efua Yankey built most of the dashboard. The agent, the backend, the database, the alerting, and the Docker setup are mine, and so are most of the mistakes in this post.

It isn't finished. I'm moving ingestion onto Kafka and setting up ten containerized agents to test against, and I'll write those up properly once they work. This post covers what exists today and the bugs it took to get here.

![The agent pushes a reading about every six seconds. FastAPI validates it, writes it to PostgreSQL, and caches the latest state in Redis. The dashboard polls three endpoints every five seconds.](/writeups/pulsegrid/architecture.svg "PulseGrid as it runs today: one agent, one backend, two stores.")

## One agent and a print statement

The first version of the agent was 28 lines. It asked psutil for CPU and memory, printed a dictionary, and slept for five seconds.

```python
def collect_metrics():
    # `interval=1` blocks for one second to compute a stable CPU average.
    cpu_percent = psutil.cpu_percent(interval=1)
    memory = psutil.virtual_memory()

    return {
        "cpu_percent": cpu_percent,
        "memory_percent": memory.percent,
        "memory_used": memory.used,
        "memory_total": memory.total,
    }
```

One detail matters later: `cpu_percent(interval=1)` blocks for a full second so it can measure CPU over that window. Add the five-second sleep and the agent really reports about every six seconds, not every five.

The next night I gave it somewhere to send things. The first `backend/main.py` I committed was actually the agent's sending code, typo included: `BACKEND_URL - "https://127.0.0.1:8000/metrics"`, with a minus sign where the equals sign should be. The real FastAPI app replaced it about half an hour later.

That version had one endpoint, `POST /metrics`, and a Pydantic model describing what a payload should look like: an agent ID, a hostname, CPU and memory numbers, and a timestamp. FastAPI rejects anything that doesn't match with a 422 before my code ever runs. Accepted metrics went into a Python list.

This is a push model. Each agent decides when to report, and the backend just listens. Prometheus works the other way around and scrapes its targets on a schedule. With push, the backend never needs a list of machines ahead of time. An agent exists once it sends something, and, as it turned out later, an agent counts as alive for as long as it keeps sending things.

The list was obviously temporary. The comment above it said the data resets whenever the backend restarts, and since I ran uvicorn with `--reload`, the backend restarted every time I saved a file.

## My laptop has more memory than Postgres could count

Persistence came next: Postgres 16 in a Docker container, and a `Metric` table defined with SQLModel, which lets one class be both the Pydantic model and the database table. I committed "Store collected metrics in PostgreSQL" at 2:05 in the morning. Nine minutes later I committed "Change Column Data Type to BigINT", because of this:

```text
psycopg.errors.NumericValueOutOfRange: integer out of range
```

The rows it refused looked like this:

```text
memory_used  = 5277401088
memory_total = 17179869184
```

Python integers don't have a maximum size, so Pydantic accepted these happily. SQLModel, though, turns an `int` field into a Postgres `INTEGER` column, which is a signed 32-bit number that tops out at 2,147,483,647. Memory is measured in bytes, so that column could describe at most about 2 GB of RAM. My laptop has 16 GB, which is 17,179,869,184 bytes, about eight times the limit. Even the memory in use was more than double it. Any machine with more than 2 GB of RAM was going to break PulseGrid, which is close to every machine.

The fix was two lines in the model:

```python
# before
memory_used: int
memory_total: int

# after
memory_used: int = Field(sa_column=Column(BigInteger))
memory_total: int = Field(sa_column=Column(BigInteger))
```

`BIGINT` is 64-bit and goes up to about 9.2 quintillion, which should hold for a while.

Changing the model doesn't change the table, though. `SQLModel.metadata.create_all()` creates tables that don't exist yet and leaves existing ones alone, so the old `INTEGER` columns were still there. Every insert had failed, so the table was empty, and the simplest move was to throw the database away and let the backend recreate it on startup. `docker compose down -v` stops the containers and deletes their volumes, which is where Postgres keeps its data. I ran it and got:

```text
no configuration file provided: not found
```

The Compose file lives in `infra/`, and I was in the project root.

```bash
cd infra
docker compose down -v
docker compose up -d
```

The backend recreated the table with `BIGINT` columns on its next start, and inserts went through.

Wiping the volume was fine because there was nothing in it to lose. On a database with real history I'd need a migration, an `ALTER TABLE ... ALTER COLUMN ... TYPE BIGINT`, ideally through a tool like Alembic so the change is versioned alongside the code. PulseGrid still doesn't have migrations.

The part worth remembering is that two layers both claimed to describe the same payload and disagreed about what an integer is. Nothing on the Python side could have caught it, because on the Python side nothing was wrong.

## "Failed to fetch"

Efua built the dashboard in Next.js: stat cards for CPU and memory, a table of recent readings, a history chart, and later panels for agent health and alerts, all refreshed every five seconds. The first time it ran against my backend, it showed one thing:

```text
Failed to fetch
```

The backend itself was fine. The agent was still posting a reading every six seconds and the rows were landing in Postgres. The dashboard just couldn't get any of them back out.

I went through the usual suspects: a wrong API URL, a response shape the frontend didn't expect, and CORS. Efua had already called it in her pull request ("Backend needs CORS middleware added before the dashboard can call it from the browser"), and it was CORS.

A browser treats `http://localhost:3000`, where the dashboard runs, and `http://127.0.0.1:8000`, where the API runs, as different origins. An origin is the scheme, host, and port together, and both the host and the port differ here. When a page fetches from another origin, the browser still sends the request and the server still answers. But unless the response carries an `Access-Control-Allow-Origin` header naming the page's origin, the browser won't let the page read it. The `fetch` call rejects with a bare `TypeError`: no status code, no body. The actual reason is only printed in the developer console.

That also explains why everything else worked. The agent and `curl` don't enforce CORS at all. It's a rule browsers apply on behalf of the page, which is why a server can log a request as successful while the page says it failed.

The fix was FastAPI's CORS middleware:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:3001",
        "http://127.0.0.1:3001",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

There are four origins because `localhost` and `127.0.0.1` count as different hosts, and Next.js moves to port 3001 when 3000 is already taken. In production this list would be the dashboard's real domain and nothing else.

## Late or dead?

The question I found most interesting in the whole project: how does the backend decide a machine has gone away?

PulseGrid doesn't ping anything. Agents push, so the only evidence an agent is alive is that its metrics keep arriving. I added an `Agent` table with a `last_seen_at` column that every incoming metric updates, so each metric doubles as a heartbeat. `GET /agents` compares that to the current time:

```python
seconds_since_seen = (now - last_seen_at).total_seconds()

computed_status = (
    "offline"
    if seconds_since_seen > OFFLINE_THRESHOLD_SECONDS
    else agent.status
)
```

`OFFLINE_THRESHOLD_SECONDS` is 30.

### Offline the moment it came online

The first version set `last_seen_at` to the timestamp inside the payload, the time the agent said it took the reading. The agent produced that with `datetime.now()`, which is local time with no timezone attached. The backend compared it against `datetime.utcnow()`, which is UTC, also with no timezone attached. In June, Eastern time is four hours behind UTC, so every agent was about 14,400 seconds overdue the instant it reported, and every agent showed as offline.

Eight minutes later I switched `last_seen_at` to the backend's own clock at the moment the request arrives.

That fix turned out to be right for more reasons than the bug. The agent's clock was the wrong thing to trust in the first place. Machines drift, get misconfigured, or sit in other timezones, and the question the backend is really asking is "when did I last hear from you?", which only the backend's clock can answer. With receive time, a single clock makes every liveness decision.

A few days later Efua pointed out in a review that `datetime.utcnow()` is deprecated in Python 3.12 and was making alert times display in UTC, so I moved everything to timezone-aware `datetime.now(timezone.utc)`. That created a smaller follow-up: the columns are plain `timestamp` without a time zone, so Postgres hands back naive datetimes, and Python refuses to subtract a naive datetime from an aware one. `/agents` now treats naive values from the database as UTC before comparing.

### Picking the number

Back to late versus dead. A reading arrives about every six seconds, so a 30-second threshold means an agent has to miss roughly five reports in a row before PulseGrid calls it offline. Set it lower and one slow request could flag a healthy agent; the agent's request timeout alone is five seconds. Set it higher and a real failure takes longer to show up.

If an agent stops right after a successful report, it's flagged 30 seconds later. If it stops just before its next report was due, about 24. The dashboard polls every five seconds, so it can take a few more seconds to appear on screen. That's what I mean when I say PulseGrid notices a failure within about 30 seconds: it's a threshold I configured, checked by stopping the agent and watching it flip to offline. It isn't a detection time measured across many failures. I haven't run that test yet.

It's also worth being precise about what "offline" means. PulseGrid knows that an agent stopped reporting. It can't tell a crashed machine from a crashed agent or a broken network in between. And right now the agent crashes more easily than it should: `send_metrics` has no `try`/`except`, so if the backend isn't reachable, `requests.post` raises a `ConnectionError` and the loop exits. A perfectly healthy laptop can show up as offline because the backend happened to be restarting when the agent tried to send.

### Heartbeats that expire on their own

Efua's Redis branch added a second way to answer the same question. Each metric also writes a key with a 30-second expiry:

```python
redis_client.setex(f"agent:{payload.agent_id}:heartbeat", 30, "alive")
```

Every report resets the timer. If the reports stop, Redis deletes the key itself, and "is this agent alive?" becomes "does this key exist?" There are no timestamps to compare and no timezones involved.

![A timeline: reports at 0, 6, and 12 seconds each reset a 30-second heartbeat key. The agent stops at 14 seconds, the last key expires at 42, and the next dashboard poll shows the agent offline.](/writeups/pulsegrid/heartbeat.svg "Each report resets the 30-second timer. When the reports stop, the key runs out and the agent counts as offline.")

The TTL version is simpler to reason about, but right now PulseGrid has both, and they don't share an answer. The dashboard reads `/agents`, which uses the Postgres timestamp. The Redis heartbeat is only checked by `/agents/{agent_id}/latest`, which the dashboard doesn't call. With the same 30-second threshold they mostly agree, but there's no reason to maintain two. Going offline also doesn't create an alert. Status is computed only when someone asks for it, which makes "an agent went offline" the most obvious missing alert in the system.

### Alerts

The other half of "is everything okay" is thresholds. Each metric is checked against CPU and memory limits, 75% for a warning and 90% for critical, and crossing one writes a row to an `Alert` table.

The first version did that on every report. Memory above 75% isn't unusual on a laptop with a browser open, and an agent sitting there produced a fresh warning about every six seconds, roughly ten a minute.

So I added a cooldown: before creating an alert, look for one with the same agent, metric, and severity in the last five minutes, and skip it if there is one.

```python
cooldown_start = datetime.now(timezone.utc) - timedelta(seconds=ALERT_COOLDOWN_SECONDS)

statement = (
    select(Alert)
    .where(Alert.agent_id == agent_id)
    .where(Alert.alert_type == alert_type)
    .where(Alert.severity == severity)
    .where(Alert.created_at >= cooldown_start)
)
```

Because severity is part of the check, a warning that escalates to critical still alerts right away. The weak spot is that the check ignores status, so if you resolve an alert and the problem comes back within five minutes, you won't hear about it.

Alerts also have a lifecycle now, `open` to `acknowledged` to resolved, through two `PATCH` endpoints. "Resolved" is stored with a capital R while the other two statuses are lowercase, and the filter on `GET /alerts` accepts both spellings to cope with it.

## When the cache took ingestion down with it

Redis was there to make reads cheap. The latest reading for each agent lives in memory under one key, so the dashboard's stat cards don't need a Postgres query, and the heartbeat key from earlier lives there too.

When I pulled Efua's Redis branch to test it, every metric the agent sent came back as a 500. The traceback, trimmed:

```text
cache_latest_metric(payload)
...
ConnectionRefusedError: [Errno 61] Connection refused
```

The connection was going to `localhost:6379`, and nothing was listening there. The code expected a Redis server, but `docker-compose.yml` still only started Postgres. Adding the service took seven lines:

```yaml
redis:
  image: redis:7
  container_name: pulsegrid-redis
  restart: always
  ports:
    - "6379:6379"
```

After `docker compose up -d`, Redis answered `PONG` and the 500s stopped.

The bigger question was why a missing cache could break ingestion at all. Here's the order of operations in `POST /metrics`:

```python
session.add(metric)
agent = upsert_agent(payload, session)
alerts = create_threshold_alerts(payload, session)
cache_latest_metric(payload)   # Redis

session.commit()               # Postgres
```

The Redis write happens before the Postgres commit. When Redis raises, the request fails before `commit()` runs and the whole transaction is thrown away: the metric, the `last_seen_at` update, any new alerts. The agent prints the 500 and moves on to its next reading, because it doesn't retry. So while Redis was down, every reading was lost. And since `last_seen_at` stopped updating, the dashboard would have shown every agent as offline while all of them were running fine. A cache outage looked exactly like a fleet outage.

![The five steps of POST /metrics in order. Steps one to three are staged in a Postgres transaction, step four writes to Redis and raises when Redis is down, and step five, the commit, is never reached.](/writeups/pulsegrid/request-order.svg "One request, five steps. The cache write sits in front of the commit, so a Redis failure throws away the reading.")

Everything in Redis is derived. It could all be rebuilt from Postgres, so it shouldn't be able to block the write that actually matters. The smallest fix is to commit to Postgres first, then update Redis inside a `try`/`except` that logs the failure instead of raising. That isn't in the code yet.

## What I'm building now

That incident is also the best argument I have for the next piece. Right now `POST /metrics` does everything while the agent waits: insert the metric, update the agent, run the cooldown queries, write to Redis, commit. If any of it fails, the whole request fails.

The plan, which has been in the docs since the first week, is agents → FastAPI → Kafka → a worker → Postgres and Redis. The API's job shrinks to validating a payload and publishing it as an event. A worker consumes the events and does the storage and alerting. If Postgres or Redis is having a bad minute, events wait in Kafka instead of disappearing into a 500.

![Today, FastAPI writes to Postgres and Redis inside the agent's request. In the planned version, FastAPI publishes to Kafka and a separate worker writes to Postgres and Redis.](/writeups/pulsegrid/today-vs-planned.svg "Today versus the plan. The dashed pieces are still being built.")

To be honest about scale: one laptop sending a reading every six seconds doesn't come close to needing a message broker for throughput. What Kafka changes here is coupling, so that a storage problem stops being the agent's problem. It also brings its own questions, like what happens when a worker writes a row and crashes before recording that it finished. Those are better answered with the real implementation in front of me, so I'll come back to them.

The other piece is the test environment. One agent on one laptop isn't much of a distributed system, so I'm setting up ten agents in Docker containers that I can start, stop, and kill one at a time to see how offline detection, alerts, and ingestion hold up. These are ten containers on one machine, not ten servers. They share a kernel and hardware, and an agent reading memory through psutil inside a container generally sees the host's numbers, because `/proc/meminfo` in a container reports host memory. So it'll be a good test of the pipeline and the failure handling, and a weak test of the metrics themselves.

Both are in progress, and both will get their own write-up once they're done.

## Looking back

What works today: an agent that reports CPU and memory about every six seconds, a backend that validates and stores every reading, agents that flip to offline about 30 seconds after they go quiet, threshold alerts with a cooldown and a lifecycle, a cache for the latest state, and a dashboard that shows all of it.

What I'd change:

- Make the Redis write happen after the commit and best-effort, so a cache outage can't lose data.
- Keep one heartbeat mechanism instead of two, and make going offline raise an alert.
- Give the agent retries with backoff and a small local buffer, so a backend restart doesn't kill it or drop readings.
- Add migrations before the schema changes again.
- Bring the README in line with the code. It lists disk, network, and log collection, and the agent sends CPU and memory.

Going back over the bugs in this post, almost none of them were inside a single component. The agent worked, FastAPI worked, Postgres worked. Things broke where two pieces met and each assumed something about the other: a Python int and a Postgres integer, a browser and an API on a different port, two clocks in different timezones, a backend and a Redis server that wasn't there. Every component I add brings more of those seams, and Kafka will add a few of its own. Most of the work on PulseGrid so far has been finding them.

The code is on [GitHub](https://github.com/austin-stanley-hinson/PulseGrid).
