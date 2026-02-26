"use client"
import React from 'react'
import { useEffect } from 'react';
import Hero from './Hero/Hero';
import About from './About/About';
import Skills from './Skills/Skills';
import Project from './Projects/Projects';
import Experience from './Experience/Experience';
import Contact from './Contact/Contact';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Home = () => {
  useEffect(() => {
    const initAOS = async () => {
      await import("aos");
      AOS.init({
        duration: 1000,
        easing: "ease",
        once: true,
        anchorPlacement: "top-bottom",
      });
    };
    initAOS();
  }, []);
return (
  <div>
    <Hero/>
    <About/>
    <Skills/>
    <Project/>
    <Experience/>
    <Contact/>
  </div>
  );
}

export default Home;

