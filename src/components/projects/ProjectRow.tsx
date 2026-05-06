import { ArrowUpRight, Github } from "lucide-react";
import { type Project, getDomainLabel, getDomainKind } from "@/data/projects";
import { type Locale, type Dictionary } from "@/lib/i18n";
import ProjectThumbnail from "./ProjectThumbnail";

interface ProjectRowProps {
  project: Project;
  index: number;
  locale: Locale;
  dict: Dictionary;
}

export default function ProjectRow({ project, index, locale, dict }: ProjectRowProps) {
  const typeLabel =
    project.kind === "client"
      ? dict.projects.type_client
      : project.kind === "product"
        ? dict.projects.type_product
        : dict.projects.type_study;
  const domainLabel = getDomainLabel(project.url);
  const domainKind = getDomainKind(project.url);
  const padded = index.toString().padStart(2, "0");

  return (
    <article className="group grid grid-cols-1 gap-5 border-b border-[var(--color-border-1)] py-8 transition-colors duration-200 last:border-b-0 md:grid-cols-[180px_24px_1fr_auto] md:items-start md:gap-6">
      <ProjectThumbnail
        src={project.image}
        alt={project.imageAlt[locale]}
        aspect="4/3"
        sizes="(min-width: 1024px) 180px, 100vw"
      />

      <div className="hidden font-mono text-sm leading-none text-[var(--color-foreground-muted)] transition-colors duration-200 group-hover:text-[var(--color-accent)] md:block md:pt-2">
        {padded}
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h3 className="text-xl font-semibold leading-tight tracking-tight text-[var(--color-foreground)]">
            {project.name[locale]}
          </h3>
          {project.duration && (
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--color-foreground-subtle)]">
              {project.duration}
            </span>
          )}
        </div>

        <p className="line-clamp-2 max-w-prose text-sm leading-relaxed text-[var(--color-foreground-muted)]">
          {project.description[locale]}
        </p>

        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-foreground-subtle)]">
          {project.tags[locale].join(" · ")}
        </p>

        <p
          className={`font-mono text-[11px] uppercase tracking-[0.14em] md:hidden ${
            domainKind === "custom"
              ? "text-[var(--color-accent)]"
              : "text-[var(--color-foreground-subtle)]"
          }`}
        >
          {domainLabel}
        </p>
      </div>

      <div className="flex flex-col items-start gap-3 md:items-end md:text-right">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-foreground-subtle)]">
          {typeLabel}
        </span>
        <p
          className={`hidden font-mono text-[11px] uppercase tracking-[0.14em] md:block ${
            domainKind === "custom"
              ? "text-[var(--color-accent)]"
              : "text-[var(--color-foreground-subtle)]"
          }`}
        >
          {domainLabel}
        </p>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-semibold uppercase tracking-[0.08em] text-[var(--color-accent)]"
          >
            {dict.projects.cta_view}
            <ArrowUpRight className="h-3 w-3" strokeWidth={2} />
          </a>
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold uppercase tracking-[0.08em] text-[var(--color-foreground-muted)] transition-colors duration-150 hover:text-[var(--color-foreground)]"
            >
              {dict.projects.cta_repo}
              <Github className="h-3 w-3" strokeWidth={1.75} />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
