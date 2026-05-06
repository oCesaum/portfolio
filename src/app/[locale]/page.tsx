import { defaultLocale, getDictionary, isLocale, type Locale } from "@/lib/i18n";

export default async function LocalePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDictionary(locale);

  return (
    <div className="container py-24">
      <p
        className="eyebrow-num"
        data-section="01"
        aria-hidden="true"
      >
        {dict.hero.eyebrow}
      </p>
      <h1
        id="hero-title"
        className="mt-6 max-w-[18ch] text-balance text-[clamp(3rem,7.5vw,6rem)] font-bold leading-[0.95] tracking-[-0.022em] text-[var(--color-foreground)]"
      >
        {dict.hero.title_line1}
        <br />
        {dict.hero.title_line2}
      </h1>
      <p className="mt-8 max-w-[60ch] text-lg leading-relaxed text-[var(--color-foreground-muted)]">
        {dict.hero.lead}
      </p>
      <p className="mt-16 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-foreground-subtle)]">
        F3 layout shell deployed · Hero, Projects, Work, Principles, Contact land in F5–F8.
      </p>
    </div>
  );
}
