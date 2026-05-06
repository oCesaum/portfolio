import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://cesaraugusto.vercel.app";
  const lastModified = new Date();

  return locales.map((locale) => ({
    url: `${base}/${locale}`,
    lastModified,
    changeFrequency: "monthly",
    priority: locale === "pt" ? 1 : 0.9,
    alternates: {
      languages: {
        "pt-BR": `${base}/pt`,
        "en-US": `${base}/en`,
        "x-default": `${base}/pt`,
      },
    },
  }));
}
