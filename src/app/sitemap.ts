import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://cesaraugusto.vercel.app";
  const lastModified = new Date();

  const alternates = {
    languages: {
      "pt-BR": base,
      "en-US": `${base}/en`,
      "x-default": base,
    },
  } as const;

  return [
    {
      url: base,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
      alternates,
    },
    {
      url: `${base}/en`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
      alternates,
    },
  ];
}
