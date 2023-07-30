"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function DarkModeButton() {
  const [prefersDarkMode, setPrefersDarkMode] = useState(false);
  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem("theme");
    return storedTheme || (prefersDarkMode ? "dark" : "light");
  });
  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      setPrefersDarkMode(mediaQuery.matches);

      const handleChange = (event: {
        matches: boolean | ((prevState: boolean) => boolean);
      }) => {
        setPrefersDarkMode(event.matches);
      };

      mediaQuery.addEventListener("change", handleChange);

      return () => {
        mediaQuery.removeEventListener("change", handleChange);
      };
    }

    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleThemeToggle = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };

  return (
    <button onClick={handleThemeToggle}>
      {theme === "light" ? (
        <Sun className="text-slate-900 animate-rotate" />
      ) : (
        <Moon className="text-slate-200 animate-rotate" />
      )}
    </button>
  );
}
