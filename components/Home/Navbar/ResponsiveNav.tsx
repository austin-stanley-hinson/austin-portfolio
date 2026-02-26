"use client"
import React, { useState } from 'react'
import Nav from './Nav'
import MobileNav from './MobileNav'

const ResponsiveNav = () => {
  const [showNav, setsShowNav] = useState(false);

  const openNavHandler = () => setsShowNav(true);
  const closeNavHandler = () => setsShowNav(false);

  return (
    <div>
      <Nav openNav = {openNavHandler}/>
      <MobileNav showNav = {showNav} closeNav = {closeNavHandler}/>
    </div>
    
  );
};

export default ResponsiveNav;