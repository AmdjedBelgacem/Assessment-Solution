"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Icons from "./svg-components/Icons";

export default function LanguageToggle() {
  const url = usePathname().slice(4);
  const [isOpened, setIsOpened] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (dropdownRef.current && (dropdownRef.current as HTMLElement).contains(event.target)) {
        setIsOpened(false);
      }
    };

    // Adding event listener when the component mounts
    document.addEventListener("mousedown", handleClickOutside);

    // Cleaning up the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const styles = {
    container:
      "absolute top-12 right-2 z-10 flex flex-col items-center h-min-screen max-w-[200px] w-4/12 bg-white/50 shadow-2xl dark:bg-black/50 backdrop-blur-lg p-3 rounded-xl gap-y-4 text-gray-800 dark:text-gray-200 transition-opacity ease-in-out duration-300",
    li: "bg-white/80 hover:bg-white shadow-2xl dark:bg-gray-800/80 dark:hover:bg-black p-2 rounded-xl w-full text-center font-semibold",
  };

  return (
    <div className="p-3" ref={dropdownRef}>
      <button onClick={() => setIsOpened(!isOpened)}>
        <Icons.globe width="30" height="30" />
      </button>
      <nav
        className={`${
          isOpened ? "opacity-100" : "opacity-0 pointer-events-none"
        } ${styles.container}`}
      >
        <Link href={`/en/${url}`} className={`${styles.li}`}>
          English
        </Link>
        <Link href={`/fr/${url}`} className={`${styles.li}`}>
          {" "}
          Français
        </Link>
        <Link href={`/tr/${url}`} className={`${styles.li}`}>
          {" "}
          Türkçe
        </Link>
      </nav>
    </div>
  );
}
