"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function DarkModeButton() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.theme || "light";
    }
    return "light";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    if (typeof window !== 'undefined') {
      localStorage.theme = theme;
    }
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
