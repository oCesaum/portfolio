import { Github, Instagram, Linkedin } from "lucide-react";
import { type Dictionary, type Locale } from "@/lib/i18n";
import { buildWhatsAppUrl, contactInfo } from "@/lib/contact";
import ContactCTA from "./ContactCTA";

interface ContactProps {
  locale: Locale;
  dict: Dictionary;
}

export default function Contact({ locale, dict }: ContactProps) {
  const whatsappUrl = buildWhatsAppUrl(dict.contact.whatsapp_message);

  const channels = [
    {
      id: "linkedin",
      url: contactInfo.channels.linkedin,
      Icon: Linkedin,
      label: "LinkedIn",
    },
    {
      id: "github",
      url: contactInfo.channels.github,
      Icon: Github,
      label: "GitHub",
    },
    {
      id: "instagram",
      url: contactInfo.channels.instagram,
      Icon: Instagram,
      label: "Instagram",
    },
  ];

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="border-t border-[var(--color-border-1)]"
    >
      <div className="container grid grid-cols-1 gap-12 py-24 md:grid-cols-12 md:gap-12">
        <div className="space-y-6 md:col-span-5">
          <p
            className="eyebrow-num font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-foreground-subtle)]"
            data-section="05"
            aria-hidden="true"
          >
            {dict.contact.eyebrow}
          </p>
          <h2
            id="contact-title"
            className="text-3xl font-bold leading-tight tracking-[-0.018em] text-[var(--color-foreground)] md:text-4xl"
          >
            {dict.contact.title}
          </h2>
          <p className="max-w-prose text-base leading-relaxed text-[var(--color-foreground-muted)]">
            {dict.contact.lead}
          </p>
        </div>

        <div className="space-y-8 md:col-span-7">
          <ContactCTA
            label={dict.contact.cta_primary}
            url={whatsappUrl}
            rotating={dict.contact.cta_rotating}
            ariaLabel={dict.fab.aria_label}
          />

          <p className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--color-foreground-muted)]">
            {dict.contact.fallback}
          </p>

          <div className="space-y-3 pt-4">
            <p
              className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-foreground-subtle)]"
              aria-hidden="true"
            >
              {dict.contact.other_channels_eyebrow}
            </p>
            <ul className="flex flex-wrap gap-3" aria-label={dict.contact.other_channels_eyebrow}>
              {channels.map(({ id, url, Icon, label }) => (
                <li key={id}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${label} ${locale === "pt" ? "em nova aba" : "in a new tab"}`}
                    className="inline-flex items-center gap-2 border border-[var(--color-border-2)] bg-[var(--color-background-elevated)] px-4 py-2.5 text-sm text-[var(--color-foreground-muted)] transition-colors duration-150 hover:border-[var(--color-border-3)] hover:text-[var(--color-foreground)]"
                  >
                    <Icon className="h-4 w-4" strokeWidth={1.5} />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
