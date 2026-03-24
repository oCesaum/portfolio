"use client";

import { MessageCircle } from "lucide-react";
import { portfolioData } from "@/utils/portfolio-data";

export default function WhatsAppButton() {
  const whatsappUrl = `https://wa.me/${portfolioData.profile.whatsapp}?text=${encodeURIComponent(
    portfolioData.socials.whatsappMessage,
  )}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-3 rounded-full border border-emerald-400/20 bg-emerald-500 px-4 py-3 text-sm font-medium text-slate-950 shadow-[0_16px_40px_rgba(16,185,129,0.35)] transition duration-300 hover:translate-y-[-2px] hover:bg-emerald-400"
      aria-label="Entrar em contato pelo WhatsApp"
    >
      <MessageCircle className="h-5 w-5" />
      <span className="hidden sm:inline">Falar no WhatsApp</span>
    </a>
  );
}
