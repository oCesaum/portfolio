"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function DarkModeButton() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
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
      className="group inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:bg-white/10"
      aria-label="Alternar tema"
    >
      {theme === "light" ? (
        <Sun className="text-white animate-rotate transition-colors duration-200 group-hover:text-[var(--accent)]" />
      ) : (
        <Moon className="text-white animate-rotate transition-colors duration-200 group-hover:text-[var(--accent)]" />
      )}
    </button>
  );
}
