import React from 'react'
import Image from "next/image";
import { highlights } from '@/data';
import { stats } from '@/data'

const About = () => {
  return (
    <div id = "about" className="scroll-mt-24 py-24 bg-surface-soft dark:bg-navy">
      {/* Section heading (editorial serif, scoped to this section) */}
      <div className="text-center mb-16 px-6">
        <h2 className="font-serif font-normal tracking-[-0.02em] text-4xl md:text-5xl text-ink dark:text-on-dark mb-4">
          About <span className="text-coral">Me</span>
        </h2>
        <p className="text-warm-muted dark:text-on-dark-soft max-w-2xl mx-auto">
          Get to know the developer behind the code
        </p>
      </div>
      {/* Image */}
      <div data-aos="fade-right" data-aos-delay="0" data-aos-anchor-placement="top-center" className="flex flex-col lg:flex-row items-center gap-16 w-[90%] xl:w-[80%] mx-auto mt-16">
        <div className="relative w-full lg:w-[45%] h-112.5 lg:h-137.5 overflow-hidden rounded-xl border border-hairline dark:border-white/10">
          <Image
            src="/images/user.jpg"
            alt="profile"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Content */}
        <div data-aos="fade-left" data-aos-delay="150" data-aos-anchor-placement="top-center" className="space-y-6 max-w-2xl text-center lg:text-left">

          <h3 className="font-serif font-normal tracking-[-0.02em] text-3xl text-ink dark:text-on-dark">
            Always learning. Always building.
          </h3>

          <p className="text-ink-body dark:text-on-dark-soft leading-relaxed text-lg">
            I’m a Computer Science and Applied Mathematics student who gets
            excited about turning messy ideas into working software, from AI
            tools and dashboards to mobile products and backend systems.
          </p>

          <p className="text-ink-body dark:text-on-dark-soft leading-relaxed text-lg">
            Lately, I’ve been pulled toward performance, system design,
            distributed systems, and the mathematical thinking behind fast,
            reliable products. Outside of code, I’m probably defending LeBron’s
            GOAT case, watching the Lakers, or getting hooked on shows that make
            me think differently.
          </p>
          {/* highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            {highlights.map((item) => {
              return (
                <div
                  key={item.text}
                  className="flex items-center gap-3 text-sm"
                >
                  <div className="w-8 h-8 rounded-lg bg-coral/10 flex items-center justify-center">
                    <item.icon className="w-4 h-4 text-coral" />
                  </div>
                  <span className="text-warm-muted dark:text-on-dark-soft">{item.text}</span>
                </div>
              )
            })}

          </div>
        </div>
      </div>
      {/* stats */}
      <div className="mt-16 w-[80%] mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6" >
          {stats.map((stat) => {
            return (
              <div
                data-aos="zoom-in"
                data-aos-delay="300"
                data-aos-anchor-placement="top-center"
                key={stat.label}
                className="bg-surface-card dark:bg-navy-elevated border border-hairline dark:border-white/10 rounded-lg p-6 text-center">

                <div className="font-serif text-4xl md:text-5xl text-coral mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-warm-muted dark:text-on-dark-soft">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>


  )
}

export default About
