"use client";
import React, { useState, useEffect } from "react";
import Icons from "./svg-components/Icons";

// ThemeToggle component to toggle between dark and light mode.
const ThemeToggle = () => {
  // State variable to track the current theme mode (dark or light).
  const [darkMode, setDarkMode] = useState<boolean>(false);

  // useEffect to load the theme mode from local storage on component mount.
  useEffect(() => {
    // Retrieving the theme mode from local storage.
    const theme = localStorage.getItem("theme");

    // Updating the component state based on the retrieved theme mode.
    theme === "dark" ? setDarkMode(true) : setDarkMode(false);
  }, []);

  // useEffect to update the theme mode in local storage and apply styles when darkMode changes.
  useEffect(() => {
    // Checking the current theme mode and updating local storage and styles accordingly.
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
      <button
        onClick={() => setDarkMode(!darkMode)}
        className={`transform duration-300 ease-in ${
          darkMode ? "dark-mode rotate-[360deg]" : "light-mode rotate-0"
        }`}
      >
        {darkMode ? (
          <Icons.moon width="30" height="30" />
        ) : (
          <Icons.Sun width="30" height="30" />
        )}
      </button>
    </div>
  );
};

export default ThemeToggle;
