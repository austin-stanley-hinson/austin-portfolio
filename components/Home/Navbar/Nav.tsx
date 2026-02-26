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
    navBg ? "bg-white shadow-md dark:bg-gray-800" : "bg-transparent"
  } z-50`}
>      <div className="flex items-center h-full justify-between w-[90%] xl:w-[80%] mx-auto">
        {/* LOGO */}
        <Logo />
        {/*NavLinks*/}
        <div className="hidden lg:flex items-center space-x-10">
          {Navlinks.map((link, index) => {
            return (
              <Link
                key={index}
                href={link.href}
                className="dark:text-white text-black hover:text-yellow-500 dark:hover:text-yellow-200 font-semibold transition-all duration-200"
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
            className="box-border relative z-20 inline-flex items-center justify-center w-auto px-6 sm:px-8 py-3 
            overflow-hidden font-bold text-white transition-all duration-300 bg-indigo-600 rounded-md cursor-pointer
            group ring-offset-2 ring-1 ring-indigo-300 ring-offset-indigo-200 hover:ring-offset-indigo-500
            ease focus:outline-none"
          >
            <span className="relative z-20 flex items-center space-x-2 text-sm">
              <Download className="w-4 h-4" />
              <span>Download Resume</span>
            </span>
          </a>

          {/*Theme Toggler */}
          <ThemeToggler/>

          {/*Burger Menu for smaller screens*/}
          <MenuIcon onClick = {openNav} className = "w-8 h-8 cursor-pointer text-black dark:text-white lg:hidden"/>

        </div>
      </div>
    </div>
  )
}

export default Nav