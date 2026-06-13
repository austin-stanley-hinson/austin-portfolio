import { Navlinks } from '@/Constant/Constant'
import { X } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

type Props = {
  showNav: boolean;
  closeNav: () => void;
}
const MobileNav = ({ closeNav, showNav }: Props) => {
  const sidebarOpenClose = showNav ? "translate-x-0" : "translate-x-[-100%]";

  return (
    <div>
      {/*Overlay*/}
      <div className={`fixed inset-0 ${sidebarOpenClose} transform transition-all duration-500 z-1002 bg-ink
    opacity-70 w-full h-screen`}>
      </div>

      {/*NavLinks*/}
      <div className={`${sidebarOpenClose} fixed justify-center flex flex-col h-full transform transition-all duration-500 delay-300 w-[80%] sm:w-[60%] bg-canvas dark:bg-navy space-y-6 z-1050`}>
        {Navlinks.map((link, index) => {
          return (<Link key={index} href={link.href}>
            <p className="text-ink dark:text-on-dark w-fit text-[20px] ml-12 border-b-[1.5px] pb-1 border-hairline dark:border-white/15 transition-colors hover:text-coral sm:text-[30px]">
              {link.name}</p>
          </Link>
          );


        })}
        {/*Close icon*/}

        <X onClick = {closeNav} className="absolute top-[0.7rem] right-[1.4rem] sm:h-8 w-6 h-6 text-ink dark:text-on-dark cursor-pointer" />

      </div>
    </div>

  );
};

export default MobileNav;
