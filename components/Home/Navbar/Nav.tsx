"use client";
import Logo from '@/components/Helper/Logo'
import { Navlinks } from '@/Constant/Constant'
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { Download, MenuIcon } from 'lucide-react'
import ThemeToggler from '@/components/Helper/ThemeToggler'


type Props = {
  openNav: () => void;
};

const Nav = ({openNav}:Props) => {
  const [navBg, setNavBg] = useState(false);

  useEffect(() => {

    const handler = () => {
      if (window.scrollY >= 90) setNavBg(true);
      if (window.scrollY < 90) setNavBg(false);
    };

    window.addEventListener("scroll", handler)

    return () => window.removeEventListener("scroll", handler);

  }, [])

  return (
    <div
      className={`fixed top-0 left-0 w-full h-[12vh] transition-all duration-200 ${
        navBg
          ? "bg-canvas/90 dark:bg-navy/90 backdrop-blur-sm border-b border-hairline dark:border-white/10"
          : "bg-transparent"
      } z-50`}
    >
      <div className="flex items-center h-full justify-between w-[90%] xl:w-[80%] mx-auto">
        {/* LOGO */}
        <Logo />
        {/*NavLinks*/}
        <div className="hidden lg:flex items-center space-x-10">
          {Navlinks.map((link, index) => {
            return (
              <Link
                key={index}
                href={link.href}
                className={`${
                  navBg ? "text-ink dark:text-on-dark" : "text-on-dark"
                } hover:text-amber dark:hover:text-amber font-medium text-sm transition-colors duration-200`}
              >
                <p> {link.name}</p>
              </Link>
            );
          })}
        </div>
        {/*Download Button*/}
        <div className = "flex items-center space-x-4">
          <a
            href="#_"
            className="inline-flex items-center justify-center gap-2 h-10 px-5 rounded-md bg-coral text-white text-sm font-medium transition-colors hover:bg-coral-active"
          >
            <Download className="w-4 h-4" />
            <span>Download Resume</span>
          </a>

          {/*Theme Toggler */}
          <ThemeToggler/>

          {/*Burger Menu for smaller screens*/}
          <MenuIcon onClick = {openNav} className = {`w-8 h-8 cursor-pointer lg:hidden ${navBg ? "text-ink dark:text-on-dark" : "text-on-dark"}`}/>

        </div>
      </div>
    </div>
  )
}

export default Nav
