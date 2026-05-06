import { type Locale, type Dictionary } from "@/lib/i18n";
import Hero from "@/components/hero/Hero";
import Projects from "@/components/projects/Projects";
import Principles from "@/components/principles/Principles";
import Contact from "@/components/contact/Contact";

interface PageSectionsProps {
  locale: Locale;
  dict: Dictionary;
}

export default function PageSections({ locale, dict }: PageSectionsProps) {
  return (
    <>
      <Hero dict={dict} />
      <Projects locale={locale} dict={dict} />
      <Principles dict={dict} />
      <Contact locale={locale} dict={dict} />
    </>
  );
}
