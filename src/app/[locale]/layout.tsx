import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  defaultLocale,
  getDictionary,
  getLangAttr,
  isLocale,
  locales,
  type Locale,
} from "@/lib/i18n";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppFab from "@/components/layout/WhatsAppFab";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDictionary(locale);
  return {
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        "pt-BR": "/pt",
        "en-US": "/en",
        "x-default": "/pt",
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "pt" ? "pt_BR" : "en_US",
      alternateLocale: locale === "pt" ? ["en_US"] : ["pt_BR"],
      siteName: dict.meta.brand,
      title: dict.meta.title,
      description: dict.meta.description,
    },
    twitter: {
      card: "summary_large_image",
      creator: "@oCesaum",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;
  const dict = getDictionary(locale);

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
            url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://cesaraugusto.vercel.app",
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
