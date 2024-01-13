"use client";
import React, { useState, useEffect } from "react";
import Icons from "./svg-components/Icons";

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    theme === "dark" ? setDarkMode(true) : setDarkMode(false);
  }, []);

  useEffect(() => {
    if (darkMode) {
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
    } else {
      localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="p-3">
      <button onClick={()=>setDarkMode(!darkMode)} className={`transform duration-300 ease-in ${darkMode ? "dark-mode rotate-[360deg]" : "light-mode rotate-0"}`}>{darkMode ? <Icons.moon width="30" height="30"/> : <Icons.Sun width="30" height="30"/>}</button>
    </div>
  );
};

export default ThemeToggle;
