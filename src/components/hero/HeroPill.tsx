"use client";

interface HeroPillProps {
  text: string;
}

export default function HeroPill({ text }: HeroPillProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="inline-flex items-center gap-2.5 rounded-full border border-[var(--color-border-2)] bg-[var(--color-background-elevated)] px-4 py-2 font-mono text-[11px] tracking-[0.06em] text-[var(--color-foreground-muted)]"
    >
      <span className="relative inline-flex h-1.5 w-1.5">
        <span
          className="absolute inset-0 rounded-full bg-[var(--color-whatsapp)]"
          aria-hidden="true"
        />
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-full bg-[var(--color-whatsapp)]"
          style={{ animation: "hero-dot-pulse 1.6s var(--ease-in-out) infinite" }}
        />
      </span>
      <span>{text}</span>
      <style jsx>{`
        @keyframes hero-dot-pulse {
          0% {
            transform: scale(1);
            opacity: 0.6;
          }
          100% {
            transform: scale(2.6);
            opacity: 0;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          span[aria-hidden="true"]:last-child {
            animation: none !important;
            opacity: 0 !important;
          }
        }
      `}</style>
    </div>
  );
}
