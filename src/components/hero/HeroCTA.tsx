"use client";

import { ArrowDown, ArrowRight } from "lucide-react";
import MagneticWrapper from "@/components/ui/MagneticWrapper";

interface HeroCTAProps {
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
}

export default function HeroCTA({
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: HeroCTAProps) {
  return (
    <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
      <MagneticWrapper radius={80} damping={0.14}>
        <a
          href={primaryHref}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex h-12 items-center justify-center gap-2 rounded-sm bg-[var(--color-accent)] px-6 text-sm font-semibold uppercase tracking-[0.06em] text-[var(--color-background)] transition-colors duration-200 hover:bg-[var(--color-accent-strong)]"
        >
          <span>{primaryLabel}</span>
          <ArrowRight
            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
            strokeWidth={2}
          />
        </a>
      </MagneticWrapper>

      <a
        href={secondaryHref}
        className="group inline-flex h-12 items-center justify-center gap-2 rounded-sm border border-[var(--color-border-2)] px-6 text-sm font-semibold uppercase tracking-[0.06em] text-[var(--color-foreground)] transition-colors duration-200 hover:border-[var(--color-border-3)] hover:bg-white/[0.02]"
      >
        <span>{secondaryLabel}</span>
        <ArrowDown
          className="h-4 w-4 transition-transform duration-200 group-hover:translate-y-0.5"
          strokeWidth={2}
        />
      </a>
    </div>
  );
}
