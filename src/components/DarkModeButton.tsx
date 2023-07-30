"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function DarkModeButton() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const handleThemeToggle = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };

  return (
    <button onClick={() => handleThemeToggle()}>
      {theme === "light" ? (
        <Sun className=" text-slate-900 animate-rotate group-hover:text-yellow-500 duration-500 transition-colors " />
      ) : (
        <Moon className="text-slate-200 animate-rotate group-hover:text-blue-500 duration-500 transition-colors" />
      )}
    </button>
  );
}
