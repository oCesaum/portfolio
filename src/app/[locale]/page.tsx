import { defaultLocale, getDictionary, isLocale, type Locale } from "@/lib/i18n";
import Hero from "@/components/hero/Hero";

export default async function LocalePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDictionary(locale);

  return (
    <>
      <Hero dict={dict} />
      <section
        id="projects"
        className="container border-t border-[var(--color-border-1)] py-24"
      >
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-foreground-subtle)]">
          {dict.projects.eyebrow} · F6 lands next
        </p>
      </section>
    </>
  );
}
