import { Github, Instagram, Linkedin } from "lucide-react";
import { portfolioData } from "@/utils/portfolio-data";

interface SocialsProps {
  componentType: "header" | "footer";
}

const baseClassName =
  "inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[var(--muted-foreground)] transition hover:border-white/20 hover:bg-white/10 hover:text-white";

export default function Socials({ componentType }: SocialsProps) {
  return (
    <ul
      className={`items-center gap-3 ${
        componentType === "header" ? "flex" : "flex"
      }`}
    >
      <li title="GitHub">
        <a
          href={portfolioData.socials.github}
          target="_blank"
          rel="noopener noreferrer"
          className={baseClassName}
          aria-label="Abrir GitHub"
        >
          <Github className="h-4 w-4" />
        </a>
      </li>
      <li title="LinkedIn">
        <a
          href={portfolioData.socials.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className={baseClassName}
          aria-label="Abrir LinkedIn"
        >
          <Linkedin className="h-4 w-4" />
        </a>
      </li>
      <li title="Instagram">
        <a
          href={portfolioData.socials.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className={baseClassName}
          aria-label="Abrir Instagram"
        >
          <Instagram className="h-4 w-4" />
        </a>
      </li>
    </ul>
  );
}
