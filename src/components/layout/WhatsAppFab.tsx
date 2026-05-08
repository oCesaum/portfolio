"use client";

import { MessageCircle } from "lucide-react";
import MagneticWrapper from "@/components/ui/MagneticWrapper";
import { type Dictionary } from "@/lib/i18n";
import { buildWhatsAppUrl } from "@/lib/contact";

interface WhatsAppFabProps {
  dict: Dictionary;
}

export default function WhatsAppFab({ dict }: WhatsAppFabProps) {
  const url = buildWhatsAppUrl(dict.contact.whatsapp_message);

  return (
    <MagneticWrapper radius={80} damping={0.14} className="fixed bottom-6 right-6 z-[60]">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={dict.fab.aria_label}
        className="group relative inline-flex h-14 items-center gap-3 rounded-full border border-white/10 bg-[var(--color-whatsapp)] px-5 text-sm font-semibold text-[var(--color-background)] shadow-[0_4px_16px_rgba(37,211,102,0.22)] transition-colors duration-200"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-full"
          style={{
            animation: "fab-pulse 2.4s var(--ease-in-out) infinite",
          }}
        />
        <MessageCircle className="relative h-6 w-6" strokeWidth={1.75} />
        <span className="relative hidden text-[var(--color-background)] sm:inline">
          {dict.fab.label}
        </span>
      </a>
      <style jsx>{`
        @keyframes fab-pulse {
          0% {
            transform: scale(1);
            opacity: 0.5;
            background: rgba(37, 211, 102, 0.5);
          }
          100% {
            transform: scale(2.4);
            opacity: 0;
            background: rgba(37, 211, 102, 0);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          span[aria-hidden="true"] {
            animation: none !important;
          }
        }
      `}</style>
    </MagneticWrapper>
  );
}
