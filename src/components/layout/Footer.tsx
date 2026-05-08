import Link from "next/link";
import { Github, Instagram, Linkedin, MessageCircle } from "lucide-react";
import { type Locale, type Dictionary } from "@/lib/i18n";
import { buildWhatsAppUrl, contactInfo } from "@/lib/contact";

interface FooterProps {
  locale: Locale;
  dict: Dictionary;
}

const year = new Date().getFullYear();

export default function Footer({ locale, dict }: FooterProps) {
  const whatsappUrl = buildWhatsAppUrl(dict.contact.whatsapp_message);

  const socials = [
    { id: "github", url: contactInfo.channels.github, Icon: Github, label: "GitHub" },
    { id: "linkedin", url: contactInfo.channels.linkedin, Icon: Linkedin, label: "LinkedIn" },
    {
      id: "instagram",
      url: contactInfo.channels.instagram,
      Icon: Instagram,
      label: "Instagram",
    },
    { id: "whatsapp", url: whatsappUrl, Icon: MessageCircle, label: "WhatsApp" },
  ] as const;

  return (
    <footer className="border-t border-[var(--color-border-1)]">
      <div className="container flex flex-col gap-6 py-12 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold text-[var(--color-foreground)]">
            {dict.meta.brand}
          </p>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-foreground-subtle)]">
            {dict.footer.role} · {year}
          </p>
        </div>

        <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:gap-6">
          <ul className="flex items-center gap-4" aria-label="Social channels">
            {socials.map(({ id, url, Icon, label }) => (
              <li key={id}>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="block text-[var(--color-foreground-subtle)] transition-colors duration-150 hover:text-[var(--color-foreground)]"
                >
                  <Icon className="h-[18px] w-[18px]" strokeWidth={1.5} />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center font-mono text-[10px] uppercase tracking-[0.16em]">
            <Link
              href="/"
              className={`px-1 ${
                locale === "pt"
                  ? "text-[var(--color-foreground)]"
                  : "text-[var(--color-foreground-subtle)] hover:text-[var(--color-foreground-muted)]"
              }`}
            >
              PT
            </Link>
            <span className="text-[var(--color-foreground-subtle)]">|</span>
            <Link
              href="/en"
              className={`px-1 ${
                locale === "en"
                  ? "text-[var(--color-foreground)]"
                  : "text-[var(--color-foreground-subtle)] hover:text-[var(--color-foreground-muted)]"
              }`}
            >
              EN
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
