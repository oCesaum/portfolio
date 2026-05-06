import type { Metadata } from "next";
import { getDictionary } from "@/lib/i18n";
import PageShell from "@/components/layout/PageShell";
import PageSections from "@/components/PageSections";

export async function generateMetadata(): Promise<Metadata> {
  const dict = getDictionary("pt");
  return {
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: {
      canonical: "/",
      languages: {
        "pt-BR": "/",
        "en-US": "/en",
        "x-default": "/",
      },
    },
    openGraph: {
      type: "website",
      locale: "pt_BR",
      alternateLocale: ["en_US"],
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

export default function HomePage() {
  const dict = getDictionary("pt");
  return (
    <PageShell locale="pt" dict={dict}>
      <PageSections locale="pt" dict={dict} />
    </PageShell>
  );
}
