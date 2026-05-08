"use client";

import { useEffect, useState } from "react";

interface HeroTitleProps {
  line1: string;
  line2: string;
}

const cursorGlyphs = ["▌", "_", "·"] as const;

export default function HeroTitle({ line1, line2 }: HeroTitleProps) {
  const [glyph, setGlyph] = useState<string>(cursorGlyphs[0]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let i = 0;
    const id = window.setInterval(() => {
      i = (i + 1) % cursorGlyphs.length;
      setGlyph(cursorGlyphs[i]!);
    }, 4000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <h1
      id="hero-title"
      className="hero-title text-balance font-bold leading-[0.95] tracking-[-0.022em] text-[var(--color-foreground)]"
      style={{ fontSize: "clamp(3rem, 7.5vw, 6rem)" }}
    >
      <span className="hero-title__line" style={{ animationDelay: "250ms" }}>
        {line1}
      </span>
      <br />
      <span className="hero-title__line" style={{ animationDelay: "350ms" }}>
        {line2}{" "}
        <span
          aria-hidden="true"
          className="hero-title__cursor inline-block text-[var(--color-accent)]"
        >
          {glyph}
        </span>
      </span>
      <style jsx>{`
        .hero-title__line {
          display: inline-block;
          clip-path: inset(0 0 100% 0);
          animation: hero-line-mask 800ms var(--ease-out) forwards;
        }
        .hero-title__cursor {
          opacity: 0;
          animation: hero-cursor-fade 200ms var(--ease-out) 1100ms forwards,
            hero-cursor-blink 1s steps(1) 1100ms infinite;
        }
        @keyframes hero-line-mask {
          to {
            clip-path: inset(0);
          }
        }
        @keyframes hero-cursor-fade {
          to {
            opacity: 1;
          }
        }
        @keyframes hero-cursor-blink {
          50% {
            opacity: 0;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-title__line {
            clip-path: none !important;
            animation: none !important;
          }
          .hero-title__cursor {
            opacity: 1 !important;
            animation: none !important;
          }
        }
      `}</style>
    </h1>
  );
}
