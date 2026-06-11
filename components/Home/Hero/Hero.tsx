"use client"
import React from "react";
import { TypeAnimation } from "react-type-animation";
import { Button } from "@/components/ui/button";
import { Download, FolderOpen } from "lucide-react";

const Hero = () => {
  return (
    <div
      id="home"
      className="
        relative min-h-screen
        bg-[radial-gradient(circle_476px_at_54.8%_51.5%,rgba(168,229,253,1)_0%,rgba(244,244,254,1)_42.3%,rgba(244,244,254,1)_100.2%)]
        dark:bg-[radial-gradient(circle_farthest-corner_at_50.3%_47.3%,rgba(113,42,92,1)_0.1%,rgba(40,25,46,1)_90%)]
        flex items-center justify-center overflow-hidden
      " >
      {/* content */}
      <div className="relative z-10 text-center">
        {/* sub title */}
        <div data-aos="fade-up" className="sm:mb-6">
          <span className="inline-flex items-center gap-2 px-4 rounded-full bg-white dark:bg-gray-600 text-sm text-muted-foreground dark:text-gray-200 mb-8">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            <span>Available for opportunities</span>
          </span>
        </div>
        {/* title */}
        <h1 data-aos="fade-up" data-aos-delay="100" className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
          <span className="text-purple-600 dark:text-yellow-200"> Hi, I&apos;m Austin Hinson</span>
        </h1>
        {/* Typewrite effect */}
        <div data-aos="fade-up" data-aos-delay="200" className="text-xl sm:text-2xl md:text-3xl text-black dark:text-white font-semibold mb-4 sm:mb-8 h-12">
          <TypeAnimation
            sequence={[
              "Tech Instructor and Mentor",
              2000,
              "Full-Stack Developer",
              2000,
              "Systems Builder",
              2000,
              "Problem Solver in Code",
            ]}

            wrapper="span"
            speed={50}
            repeat={Infinity}
            className="font-mono"

          />
        </div>
        {/* description */}
        <p data-aos="fade-up" data-aos-delay="300" className="text-lg text-shadow-muted dark:text-gray-200 max-w-2xl">
          Building scalable systems where performance and precision meet.
          Focused on writing efficient, reliable software for real-world problems.
        </p>
        {/* buttons */}
        <div data-aos="fade-up" data-aos-delay="400" className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Button size={"lg"} asChild className="w-fit mx-auto sm:mx-0">
            <a href="#projects">
              <FolderOpen className="w-5 h-5 mr-2" />
              View Projects
            </a>
          </Button>
          <Button size={"lg"} asChild className="w-fit mx-auto sm:mx-0">
            <a href="#_">
              <Download className="w-5 h-5 mr-2" />
              Download CV
            </a>
          </Button>


        </div>
      </div>
    </div>
  );
};

export default Hero;