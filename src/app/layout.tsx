import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://cesaraugusto.vercel.app",
  ),
  title: {
    default: "César Augusto — Full-stack engineer",
    template: "%s | César Augusto",
  },
  description:
    "Produtos web claros, do briefing ao deploy. Trabalho com founders e times pequenos que precisam de execução técnica direta.",
  applicationName: "César Augusto",
  authors: [{ name: "César Augusto" }],
  creator: "César Augusto",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
