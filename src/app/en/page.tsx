import type { Metadata } from "next";
import { getDictionary } from "@/lib/i18n";
import PageShell from "@/components/layout/PageShell";
import PageSections from "@/components/PageSections";

export async function generateMetadata(): Promise<Metadata> {
  const dict = getDictionary("en");
  return {
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: {
      canonical: "/en",
      languages: {
        "pt-BR": "/",
        "en-US": "/en",
        "x-default": "/",
      },
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      alternateLocale: ["pt_BR"],
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

export default function HomePageEN() {
  const dict = getDictionary("en");
  return (
    <PageShell locale="en" dict={dict}>
      <PageSections locale="en" dict={dict} />
    </PageShell>
  );
}
