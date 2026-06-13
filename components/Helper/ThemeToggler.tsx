"use client";
import React, {useEffect, useState} from 'react'
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';

const ThemeToggler = () => {
  const [mounted, setMounted] = useState(false);
  const {theme, setTheme, systemTheme} = useTheme();

  useEffect(()=>{
    const mountCheck = () => {
      setMounted(true);
    };

    mountCheck();
  }, [])

  if(!mounted) return null;

  const currentTheme = theme === "system" ? systemTheme : theme;


  return (
    <button onClick = {() => setTheme(currentTheme === "dark" ? "light" : "dark")}
    className="p-2 transition w-10 h-10 cursor-pointer bg-surface-card dark:bg-navy-elevated border border-hairline dark:border-white/10 rounded-md
    flex flex-col items-center justify-center">

    {currentTheme === "dark" ? (
      <Sun className='text-on-dark w-5 h-5 cursor-pointer'/>
    ) : (
      <Moon className='text-ink w-5 h-5 cursor-pointer'/>
    )}
  </button>
  );

};


export default ThemeToggler