import { skillCategories } from "@/data";
import SkillCard from "./SkillCard";
import React from "react";

const Skills = () => {
  return (
    <div id = "skills" className="scroll-mt-24 py-24 bg-canvas dark:bg-navy">
      {/* Section heading (editorial serif, scoped to this section) */}
      <div className="text-center mb-16 px-6">
        <h2 className="font-serif font-normal tracking-[-0.02em] text-4xl md:text-5xl text-ink dark:text-on-dark mb-4">
          Technical <span className="text-coral">Skills</span>
        </h2>
        <p className="text-warm-muted dark:text-on-dark-soft max-w-2xl mx-auto">
          Technologies I&apos;ve been working with recently
        </p>
      </div>

      <div className="space-y-12 w-[80%] mx-auto">
        {skillCategories.map((category) => {
          return (
            <div key={category.title}>
              <h3 className="text-xl font-medium text-ink dark:text-on-dark mb-6 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-coral"></span>
                {category.title}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {category.skills.map((skill, index) => {
                  return (
                    <div
                      data-aos="zoom-in"
                      data-aos-delay={index * 100}
                      data-aos-anchor-placement="top-center"
                      key={index}
                    >
                      <SkillCard name={skill.name} icon={skill.icon} />
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Skills;
