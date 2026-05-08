import type { Dictionary } from "./i18n";

export const contactInfo = {
  whatsappNumber: "5531987373513",
  whatsappDisplay: "+55 31 98737-3513",
  channels: {
    linkedin: "https://www.linkedin.com/in/cesar-augusto-pinho/",
    github: "https://github.com/oCesaum",
    instagram: "https://www.instagram.com/csr_pinho/",
  },
} as const;

export function buildWhatsAppUrl(message: Dictionary["contact"]["whatsapp_message"]): string {
  const text = encodeURIComponent(message);
  return `https://wa.me/${contactInfo.whatsappNumber}?text=${text}`;
}
