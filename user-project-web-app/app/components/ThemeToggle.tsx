"use client";
import React, { useState, useEffect } from "react";
import Icons from "./svg-components/Icons";

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    // Initialize the theme mode based on the value stored in local storage.
    const storedTheme = localStorage.getItem("theme");
    return storedTheme === "dark";
  });

  useEffect(() => {
    // Update the class and local storage when darkMode changes.
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    // Add an event listener to save the theme mode to local storage before the page is unloaded.
    const handleBeforeUnload = () => {
      localStorage.setItem("theme", darkMode ? "dark" : "light");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    // Remove the event listener when the component is unmounted.
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [darkMode]);

  return (
    <div className="p-3">
      <button
        onClick={() => setDarkMode((prevMode) => !prevMode)}
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
