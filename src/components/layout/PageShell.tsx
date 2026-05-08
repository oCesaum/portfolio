import { type Locale, type Dictionary } from "@/lib/i18n";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppFab from "@/components/layout/WhatsAppFab";

interface PageShellProps {
  locale: Locale;
  dict: Dictionary;
  children: React.ReactNode;
}

export default function PageShell({ locale, dict, children }: PageShellProps) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-sm focus:bg-[var(--color-foreground)] focus:px-3 focus:py-2 focus:text-sm focus:text-[var(--color-background)]"
      >
        {locale === "pt" ? "Pular para o conteúdo" : "Skip to content"}
      </a>
      <Header locale={locale} dict={dict} />
      <main id="main" className="relative">
        {children}
      </main>
      <Footer locale={locale} dict={dict} />
      <WhatsAppFab dict={dict} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: dict.meta.brand,
            jobTitle: dict.footer.role,
            url:
              process.env.NEXT_PUBLIC_SITE_URL ??
              "https://cesaraugusto.vercel.app",
            sameAs: [
              "https://github.com/oCesaum",
              "https://www.linkedin.com/in/cesar-augusto-pinho/",
            ],
          }),
        }}
      />
    </>
  );
}
