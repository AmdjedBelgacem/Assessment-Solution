"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Icons from "./svg-components/Icons";

export default function LanguageToggle() {
  // Using the usePathname hook to get the current URL pathname, i sliced it to remove the language prefix to avoid any further complications.
  const url = usePathname().slice(4);

  // State variable to track whether the language dropdown is open or closed.
  const [isOpened, setIsOpened] = useState(false);

  // I Like to style this way in generale or if im using tailwind, it is cleaner in general
  const styles = {
    container:
      "absolute top-12 right-2 z-10 flex flex-col items-center h-min-screen max-w-[200px] w-4/12 bg-white/50 shadow-2xl dark:bg-black/50 backdrop-blur-lg p-3 rounded-xl gap-y-4 text-gray-800 dark:text-gray-200 transition-opacity ease-in-out duration-300",
    li: "bg-white/80 hover:bg-white shadow-2xl dark:bg-gray-800/80 dark:hover:bg-black p-2 rounded-xl w-full text-center font-semibold",
  };

  return (
    <div className="p-3">
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
