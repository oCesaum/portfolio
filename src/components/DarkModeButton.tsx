"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function DarkModeButton() {
  const [theme, setTheme] = useState(localStorage.theme ?? "light");

  useEffect(() => {
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
