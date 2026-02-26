import SectionHeading from "@/components/Helper/SectionHeading";
import { skillCategories } from "@/data";
import SkillCard from "./SkillCard"; 
import React from "react";

const Skills = () => {
  return (
    <div id = "skills" className="scroll-mt-24 py-16 bg-gray-100 dark:bg-gray-950">
      <SectionHeading
        title_1="Technical"
        title_2="Skills"
        description="Technologies I've been working with recently"
      />

      <div className="space-y-12 w-[80%] mx-auto">
        {skillCategories.map((category) => {
          return (
            <div key={category.title}>
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-purple-600"></span>
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