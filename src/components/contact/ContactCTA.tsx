"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import MagneticWrapper from "@/components/ui/MagneticWrapper";

interface ContactCTAProps {
  label: string;
  url: string;
  rotating: readonly string[];
  ariaLabel: string;
}

export default function ContactCTA({
  label,
  url,
  rotating,
  ariaLabel,
}: ContactCTAProps) {
  const [idx, setIdx] = useState(0);
  const [reveal, setReveal] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (rotating.length <= 1) return;
    let mounted = true;
    const cycle = () => {
      if (!mounted) return;
      setReveal(false);
      window.setTimeout(() => {
        if (!mounted) return;
        setIdx((i) => (i + 1) % rotating.length);
        setReveal(true);
      }, 300);
    };
    const id = window.setInterval(cycle, 4500);
    return () => {
      mounted = false;
      window.clearInterval(id);
    };
  }, [rotating.length]);

  return (
    <MagneticWrapper radius={150} damping={0.16} className="inline-block">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
        className="group relative inline-flex items-center gap-5 rounded-lg border border-[var(--color-border-2)] bg-[var(--color-background-elevated)] px-6 py-5 transition-colors duration-200 hover:border-[var(--color-border-3)] sm:px-8"
      >
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-lg"
          style={{ animation: "contact-cta-glow 2.4s var(--ease-in-out) infinite" }}
        />
        <MessageCircle
          className="relative h-6 w-6 text-[var(--color-whatsapp)]"
          strokeWidth={1.75}
        />
        <span className="relative flex flex-col gap-1.5 leading-none">
          <span className="flex items-center gap-2 text-base font-semibold tracking-tight text-[var(--color-foreground)] sm:text-lg">
            {label}
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              strokeWidth={2}
            />
          </span>
          <span className="relative h-3 overflow-hidden">
            <span
              key={idx}
              className={`absolute inset-0 block font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-accent)] transition-opacity duration-300 group-hover:text-[var(--color-whatsapp)] ${
                reveal ? "opacity-100" : "opacity-0"
              }`}
              style={{
                clipPath: reveal ? "inset(0 0 0 0)" : "inset(0 0 100% 0)",
                transition:
                  "clip-path 600ms var(--ease-out), opacity 300ms var(--ease-out)",
              }}
            >
              {rotating[idx]}
            </span>
          </span>
        </span>

        <style>{`
          @keyframes contact-cta-glow {
            0% {
              transform: scale(1);
              opacity: 0.5;
              box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.4);
            }
            100% {
              transform: scale(1.04);
              opacity: 0;
              box-shadow: 0 0 0 12px rgba(37, 211, 102, 0);
            }
          }
          @media (prefers-reduced-motion: reduce) {
            span[aria-hidden="true"] {
              animation: none !important;
            }
          }
        `}</style>
      </a>
    </MagneticWrapper>
  );
}
