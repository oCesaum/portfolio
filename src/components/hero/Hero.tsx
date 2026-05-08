import { type Dictionary } from "@/lib/i18n";
import { buildWhatsAppUrl } from "@/lib/contact";
import HeroTitle from "./HeroTitle";
import HeroCTA from "./HeroCTA";

interface HeroProps {
  dict: Dictionary;
}

export default function Hero({ dict }: HeroProps) {
  const whatsappUrl = buildWhatsAppUrl(dict.contact.whatsapp_message);

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative overflow-hidden"
    >
      <div className="container relative grid grid-cols-1 gap-12 pb-24 pt-24 md:grid-cols-12 md:pt-32 lg:gap-y-0">
        <p
          aria-hidden="true"
          className="hero-eyebrow-vertical pointer-events-none hidden font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-foreground-subtle)] md:absolute md:left-2 md:top-32 md:block lg:left-4"
        >
          {dict.hero.eyebrow}
        </p>

        <div className="md:col-span-8">
          <HeroTitle
            line1={dict.hero.title_line1}
            line2={dict.hero.title_line2}
          />
        </div>

        <div className="space-y-8 md:col-span-6 md:col-start-7 md:translate-y-24">
          <p
            className="hero-fade-up max-w-[60ch] text-lg leading-relaxed text-[var(--color-foreground-muted)]"
            style={{ animationDelay: "700ms" }}
          >
            {dict.hero.lead}
          </p>

          <div className="hero-fade-up" style={{ animationDelay: "900ms" }}>
            <HeroCTA
              primaryLabel={dict.hero.cta_primary}
              primaryHref={whatsappUrl}
              secondaryLabel={dict.hero.cta_secondary}
              secondaryHref="#projects"
            />
          </div>

          <ul
            aria-label="Stack"
            className="hero-fade-up flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[var(--color-foreground-muted)]"
            style={{ animationDelay: "1100ms" }}
          >
            {dict.hero.stack_inline.map((item, idx) => (
              <li
                key={item}
                className={`inline-flex items-center gap-3 ${
                  idx === 0
                    ? "font-semibold text-[var(--color-foreground)]"
                    : ""
                }`}
              >
                {item}
                {idx < dict.hero.stack_inline.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="text-[var(--color-foreground-subtle)]"
                  >
                    ·
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <style>{`
        .hero-eyebrow-vertical {
          transform: rotate(-90deg);
          transform-origin: left top;
        }
        .hero-fade-up {
          opacity: 0;
          transform: translateY(16px);
          animation: hero-fade-up 600ms var(--ease-out) forwards;
        }
        @keyframes hero-fade-up {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-fade-up {
            opacity: 1 !important;
            transform: none !important;
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}
