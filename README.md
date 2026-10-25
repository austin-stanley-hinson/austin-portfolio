# Austin Hinson — the Grimoire

My portfolio, built as a notebook. Each writeup covers something I built and what it taught me, the bookshelf lists what I'm studying (with my notes), and the home page keeps the rest short.

**Live:** [austinhinson.tech](https://www.austinhinson.tech)

The seal is the Adinkra symbol *Nea Onnim No Sua A, Ohu*: "one who does not know can know through learning." That's what the site is for.

## What's here

| Page | What it holds |
| --- | --- |
| `/` | Intro, what I'm currently learning, and experience |
| `/writeups` | Projects and what building them taught me |
| `/bookshelf` | Readings, math, tools, and concepts, linked to sources and my notes |

A floating **Ask me about Austin** chat answers questions about my work, grounded in the same content the pages render.

## Stack

- **Next.js 16** (App Router) with **React 19** and **TypeScript**
- **Tailwind CSS v4**, with Cormorant Garamond, EB Garamond, and Inter
- **react-markdown** + **remark-gfm** for writeups
- **Anthropic SDK** (`claude-haiku-5-5`) for the chat
- Deployed on **Vercel**, with a Vercel Firewall rate limit on the chat

## How it's organized

```
content/          everything the site says
  site.ts         profile, education, experience, "currently" line
  writeups.ts     writeup list (title, summary, status, links)
  writeups/       writeup bodies as <slug>.md
  bookshelf.ts    books, tools, and concepts
  types.ts        shapes for all of the above
lib/grimoire.ts   the one read path for content (pages + API use it)
app/              pages and API routes
components/Grimoire/  header, footer, lists, chat, seal, animations
```

Pages and API routes both read through `lib/grimoire.ts`, so the content can move to a CMS or database later without touching the UI.

## Updating content

**Publish a writeup**
1. Write `content/writeups/<slug>.md` (Markdown, tables and code blocks supported).
2. In `content/writeups.ts`, set that entry's `status` to `"inscribed"` and add a `date` (`YYYY-MM-DD`).

Entries marked `"being-written"` show in the list with their summary and links, but don't open yet.

**Add to the bookshelf.** Add an entry to the right section in `content/bookshelf.ts`. Put `source` (where to get it), optionally `paper`, and `notes` (a Google Doc) under `links`. Add a short `comment` if you have one, and set `current: true` to mark what you're reading now.

**Everything else** (experience, the "currently" line, internship status, resume link) lives in `content/site.ts`.

After any change, bump `lastUpdated` in `content/site.ts`. It's the date shown in the footer.

## API

| Route | Returns |
| --- | --- |
| `GET /api/writeups` | All writeups, numbered |
| `GET /api/writeups/:slug` | One writeup plus its Markdown body (`null` until published) |
| `GET /api/bookshelf` | Bookshelf sections and entries |
| `POST /api/ask` | Streams a plain-text chat answer |

## The chat

`/api/ask` builds its instructions from the site content, so it knows about new writeups and books as soon as they're added. Answers stream in as plain text, are capped at 1,000 tokens, and cost roughly $0.0004 each on Haiku 5.5. Without an API key it streams a short fallback reply, so the page never breaks.

In production, a Vercel Firewall rule limits `POST /api/ask` to 20 requests per 10 minutes per IP. Over the limit, the chat tells the visitor to wait a minute.

## Running locally

```bash
git clone https://github.com/austin-stanley-hinson/austin-portfolio.git
cd austin-portfolio
npm install
```

Create `.env.local` (ignored by git):

```bash
ANTHROPIC_API_KEY=sk-ant-...        # from the Claude Console; omit to use the fallback reply
ASK_AUSTIN_MODEL=claude-haiku-5-5   # optional, this is the default
```

Then:

```bash
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

On Vercel, set the same variables under Project Settings → Environment Variables.

## Credits

Seal and favicon: [*Nea onnim no sua a ohu*](https://commons.wikimedia.org/wiki/File:Nea_onnim_no_sua_a_ohu.svg) by Pablo Busatto, [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/), recolored. Layout inspired by [Robert Tezock's site](https://tezock.com).
