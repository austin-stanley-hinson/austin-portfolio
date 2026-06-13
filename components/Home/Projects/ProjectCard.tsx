import React from "react";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import { ExternalLink } from "lucide-react";

type Props = {
  title: string;
  description: string;
  image: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
};

const ProjectCard = ({
  title,
  description,
  image,
  techStack,
  githubUrl,
  liveUrl,
}: Props) => {
  return (
    <div className="group relative h-full flex flex-col bg-surface-card dark:bg-navy-elevated border border-hairline dark:border-white/10 rounded-lg overflow-hidden">

      {/* Image container */}
      <div className="relative h-48 overflow-hidden border-b border-hairline dark:border-white/10">
        <Image
          src={image}
          alt={title}
          width={400}
          height={400}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Main content */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-lg text-ink dark:text-on-dark font-medium mb-2 transition-colors group-hover:text-coral">
          {title}
        </h3>

        <p className="text-warm-muted dark:text-on-dark-soft text-sm mb-4 line-clamp-2">
          {description}
        </p>

        {/* Tech stacks */}
        <div className="flex flex-wrap gap-2 mb-6">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="text-xs px-3 py-1 rounded-full bg-surface-soft dark:bg-navy-soft border border-hairline dark:border-white/10 text-warm-muted dark:text-on-dark-soft font-medium"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action buttons */}
        {(liveUrl || githubUrl) && (
          <div className="mt-auto flex flex-wrap gap-3">
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 h-9 px-4 rounded-md bg-coral text-white text-sm font-medium transition-colors hover:bg-coral-active w-fit"
              >
                <ExternalLink className="w-4 h-4" />
                View Site
              </a>
            )}
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 h-9 px-4 rounded-md border border-hairline dark:border-white/15 bg-canvas dark:bg-navy text-ink dark:text-on-dark text-sm font-medium transition-colors hover:bg-surface-soft dark:hover:bg-navy-elevated w-fit"
              >
                <FaGithub className="w-4 h-4" />
                View Code
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
