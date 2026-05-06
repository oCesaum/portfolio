import { defaultLocale, getDictionary, isLocale, type Locale } from "@/lib/i18n";
import Hero from "@/components/hero/Hero";
import Projects from "@/components/projects/Projects";

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
      <Projects locale={locale} dict={dict} />
    </>
  );
}
