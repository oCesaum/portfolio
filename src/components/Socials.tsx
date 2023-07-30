import { Github, Instagram, Linkedin } from "lucide-react";

interface SocialsProps {
  componentType: string;
}

export default function Socials({ componentType }: SocialsProps) {
  return (
    <ul
      className={`${
        componentType === "header" ? "hidden md:flex" : "flex"
      } items-center gap-4`}
    >
      <li title="Github">
        <a
          href="https://github.com/oCesaum"
          target="_blank"
          rel="noopener"
          className="relative before:w-0 before:hover:w-full before:transition-all before:duration-200 before:h-0.5 before:bg-slate-900 dark:before:bg-slate-200 before:absolute before:-bottom-2"
          aria-label="Link para meu Github"
        >
          <Github className="text-slate-950 dark:text-slate-200" />
        </a>
      </li>
      <li title="LinkedIn">
        <a
          href="https://www.linkedin.com/in/cesar-augusto-pinho/"
          target="_blank"
          rel="noopener"
          className="relative before:w-0 before:hover:w-full before:transition-all before:duration-200 before:h-0.5 before:bg-slate-900 dark:before:bg-slate-200 before:absolute before:-bottom-2"
          aria-label="Link para meu LinkedIn"
        >
          <Linkedin className="text-slate-950 dark:text-slate-200" />
        </a>
      </li>
      <li title="Instagram">
        <a
          href="https://www.instagram.com/_cesaum/"
          target="_blank"
          rel="noopener"
          className="relative before:w-0 before:hover:w-full before:transition-all before:duration-200 before:h-0.5 before:bg-slate-900 dark:before:bg-slate-200 before:absolute before:-bottom-2"
          aria-label="Link para meu Instagram"
        >
          <Instagram className="text-slate-950 dark:text-slate-200" />
        </a>
      </li>
    </ul>
  );
}
