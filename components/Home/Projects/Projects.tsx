import { projects } from "@/data";
import React from "react";
import ProjectCard from "./ProjectCard";

const Project = () => {
  return (
    <div id = "projects" className="scroll-mt-24 py-24 bg-surface-soft dark:bg-navy-soft">
      {/* Section heading (editorial serif, scoped to this section) */}
      <div className="text-center mb-16 px-6">
        <h2 className="font-serif font-normal tracking-[-0.02em] text-4xl md:text-5xl text-ink dark:text-on-dark mb-4">
          Featured <span className="text-coral">Projects</span>
        </h2>
        <p className="text-warm-muted dark:text-on-dark-soft max-w-2xl mx-auto">
          A selection of my recent work and side projects
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 w-[80%] mx-auto">
        {projects.map((project, index) => {
          return (
            <div
              data-aos="fade-up"
              data-aos-delay={index * 100}
              data-aos-anchor-placement="top-center"
              key={index}
            >
              <ProjectCard {...project} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Project;
