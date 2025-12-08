"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function DarkModeButton() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Verifica preferência salva ou do sistema
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
    const initialTheme = savedTheme || systemTheme;

    setTheme(initialTheme);
    document.documentElement.classList.toggle("dark", initialTheme === "dark");
  }, []);

  useEffect(() => {
    if (mounted) {
      document.documentElement.classList.toggle("dark", theme === "dark");
      localStorage.setItem("theme", theme);
    }
  }, [theme, mounted]);

  const handleThemeToggle = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  if (!mounted) {
    return null; // Evita flash de conteúdo incorreto
  }

  return (
    <button
      onClick={handleThemeToggle}
      className="group"
      aria-label="Alternar tema"
    >
      {theme === "light" ? (
        <Sun className="text-slate-900 animate-rotate group-hover:text-yellow-500 duration-200 transition-colors" />
      ) : (
        <Moon className="text-slate-200 animate-rotate group-hover:text-blue-500 duration-200 transition-colors" />
      )}
    </button>
  );
}
