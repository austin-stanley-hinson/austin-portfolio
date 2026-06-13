import { experiences } from "@/data";
import { Briefcase, GraduationCap } from "lucide-react";
import React from "react";

const Experience = () => {
  return (
    <div id="experience" className="scroll-mt-24 py-24 bg-canvas dark:bg-navy">
      {/* Section heading (editorial serif, scoped to this section) */}
      <div className="text-center mb-16 px-6">
        <h2 className="font-serif font-normal tracking-[-0.02em] text-4xl md:text-5xl text-ink dark:text-on-dark mb-4">
          Experience &amp; <span className="text-coral">Education</span>
        </h2>
        <p className="text-warm-muted dark:text-on-dark-soft max-w-2xl mx-auto">
          My professional journey and academic background
        </p>
      </div>
      <div className="relative px-6 max-w-4xl mx-auto">
        {/* timeline line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-linear-to-b from-coral/60 to-coral/10 md:-translate-x-px"></div>
        {experiences.map((item, index) => {
          return (
            <div
              data-aos="zoom-in"
              data-aos-delay={index * 100}
              data-aos-anchor-placement="top-center"
              key={index}
              className={`relative flex flex-col md:flex-row gap-8 mb-12 ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}
            >
              {/* timeline node */}
              <div className="absolute left-4 md:left-1/2 w-8 h-8 -translate-x-1/2 rounded-full bg-canvas dark:bg-navy border-2 border-coral flex items-center justify-center z-10">
                {item.type === "work" ? (
                  <Briefcase className="w-4 h-4 text-coral" />
                ) : (
                  <GraduationCap className="w-4 h-4 text-coral" />
                )}
              </div>

              {/* Content */}
              <div className="ml-16 md:ml-0 md:w-[calc(50%-2rem)]">
                <div className="bg-surface-card dark:bg-navy-elevated border border-hairline dark:border-white/10 rounded-lg p-6">
                  <div className="flex items-center gap-2 text-sm mb-2">
                    <span className="px-3 py-1 rounded-full bg-canvas dark:bg-navy border border-hairline dark:border-white/10 text-warm-muted dark:text-on-dark-soft font-medium">
                      {item.period}
                    </span>
                  </div>
                  <h3 className="text-xl font-medium text-ink dark:text-on-dark mb-1">{item.title}</h3>
                  <p className="text-warm-muted dark:text-on-dark-soft text-sm mb-3">
                    {item.company}
                  </p>
                  <p className="text-ink-body dark:text-on-dark-soft text-sm mb-4">
                    {item.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {item.technologies.map((tech) => {
                      return (
                        <span
                          key={tech}
                          className="text-xs px-3 py-1 rounded-full bg-surface-soft dark:bg-navy-soft border border-hairline dark:border-white/10 text-warm-muted dark:text-on-dark-soft font-medium"
                        >
                          {tech}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="hidden md:block md:w-[calc(50%-2rem)]"></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Experience;
