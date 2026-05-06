import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { type Locale, type Dictionary } from "@/lib/i18n";
import { buildWhatsAppUrl } from "@/lib/contact";

interface HeaderProps {
  locale: Locale;
  dict: Dictionary;
}

const navIds = ["projects", "work", "principles", "contact"] as const;

export default function Header({ locale, dict }: HeaderProps) {
  const otherLocale: Locale = locale === "pt" ? "en" : "pt";
  const whatsappUrl = buildWhatsAppUrl(dict.contact.whatsapp_message);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border-1)] bg-[var(--color-background)]/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between gap-6">
        <Link
          href={`/${locale}`}
          className="flex flex-col leading-tight"
          aria-label={`${dict.meta.brand} — ${dict.footer.role}`}
        >
          <span className="text-[15px] font-semibold tracking-tight text-[var(--color-foreground)]">
            {dict.meta.brand}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-foreground-subtle)]">
            {dict.footer.role}
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
          {navIds.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              className="text-sm font-medium text-[var(--color-foreground-muted)] transition-colors duration-150 hover:text-[var(--color-foreground)]"
            >
              {dict.nav[id]}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="flex items-center font-mono text-[10px] uppercase tracking-[0.16em]">
            <Link
              href={`/${locale}`}
              className={`px-1 ${
                locale === "pt"
                  ? "text-[var(--color-foreground)]"
                  : "text-[var(--color-foreground-subtle)] hover:text-[var(--color-foreground-muted)]"
              }`}
              aria-current={locale === "pt" ? "page" : undefined}
            >
              PT
            </Link>
            <span className="text-[var(--color-foreground-subtle)]">|</span>
            <Link
              href={`/${otherLocale === "en" ? "en" : "pt"}`}
              className={`px-1 ${
                locale === "en"
                  ? "text-[var(--color-foreground)]"
                  : "text-[var(--color-foreground-subtle)] hover:text-[var(--color-foreground-muted)]"
              }`}
              aria-current={locale === "en" ? "page" : undefined}
            >
              EN
            </Link>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden h-9 items-center gap-2 rounded-sm bg-[var(--color-accent)] px-4 text-xs font-semibold uppercase tracking-[0.08em] text-[var(--color-background)] transition-colors duration-150 hover:bg-[var(--color-accent-strong)] md:inline-flex"
            aria-label={dict.fab.aria_label}
          >
            {dict.hero.cta_primary}
            <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.75} />
          </a>
        </div>
      </div>
    </header>
  );
}
