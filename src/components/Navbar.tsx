"use client";

import { useState } from "react";
import { Link } from "react-scroll";
import { Menu, X } from "lucide-react";
import DarkModeButton from "./DarkModeButton";
import { navigationItems } from "@/utils/portfolio-data";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div className="flex items-center gap-3">
      <nav className="hidden xl:block">
        <ul className="flex items-center gap-6">
          {navigationItems.map((item) => (
            <li key={item.id}>
              <Link
                to={item.id}
                smooth
                duration={450}
                offset={-92}
                className="cursor-pointer text-[0.72rem] uppercase tracking-[0.1em] text-[var(--muted-foreground)] transition hover:text-white"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <DarkModeButton />

      <button
        type="button"
        className="inline-flex h-9 w-9 items-center justify-center border border-white/10 bg-white/[0.02] text-white transition hover:bg-white/[0.06] xl:hidden"
        onClick={() => setIsMenuOpen(true)}
        aria-label="Abrir menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div
        className={`fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm transition ${
          isMenuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div
          className={`absolute right-4 top-4 w-[min(92vw,24rem)] border border-white/10 bg-[rgba(7,10,18,0.96)] p-5 shadow-2xl transition duration-300 ${
            isMenuOpen ? "translate-y-0" : "-translate-y-4"
          }`}
        >
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted-foreground)]">
                Navegação
              </p>
              <p className="mt-1 text-base font-medium text-white">César Augusto</p>
            </div>
            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center border border-white/10 bg-white/[0.02] text-white"
              onClick={closeMenu}
              aria-label="Fechar menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <ul className="space-y-3">
            {navigationItems.map((item) => (
              <li key={item.id}>
                <Link
                  to={item.id}
                  smooth
                  duration={450}
                  offset={-90}
                  onClick={closeMenu}
                  className="block cursor-pointer border border-white/10 bg-white/[0.03] px-4 py-3 text-xs uppercase tracking-[0.12em] text-white transition hover:bg-white/[0.08]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
