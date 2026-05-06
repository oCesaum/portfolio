import { type Dictionary } from "@/lib/i18n";

interface PrinciplesProps {
  dict: Dictionary;
}

export default function Principles({ dict }: PrinciplesProps) {
  return (
    <section
      id="principles"
      aria-labelledby="principles-title"
      className="border-t border-[var(--color-border-1)]"
    >
      <div className="container py-24">
        <header className="mx-auto max-w-3xl space-y-3 text-center">
          <p
            className="eyebrow-num font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-foreground-subtle)]"
            data-section="04"
            aria-hidden="true"
          >
            {dict.principles.eyebrow}
          </p>
          <h2
            id="principles-title"
            className="text-3xl font-semibold tracking-tight text-[var(--color-foreground)] md:text-4xl"
          >
            {dict.principles.title}
          </h2>
        </header>

        <ol className="mx-auto mt-16 flex max-w-3xl flex-col gap-12 md:gap-14">
          {dict.principles.items.map((item, idx) => (
            <li
              key={item}
              className={`principles-item text-2xl font-semibold leading-tight tracking-tight text-[var(--color-foreground)] md:text-3xl ${
                idx % 2 === 0 ? "md:self-start md:text-left" : "md:self-end md:text-right"
              }`}
              style={{
                animationDelay: `${idx * 120}ms`,
              }}
            >
              <span className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-accent)]">
                {(idx + 1).toString().padStart(2, "0")}
              </span>{" "}
              {item}
            </li>
          ))}
        </ol>
      </div>

      <style>{`
        .principles-item {
          opacity: 0;
          transform: translateY(20px);
          animation: principles-fade 700ms var(--ease-out) forwards;
        }
        @keyframes principles-fade {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .principles-item {
            opacity: 1 !important;
            transform: none !important;
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}
