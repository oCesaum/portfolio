import { ArrowUpRight, Github } from "lucide-react";
import { type Project, getDomainLabel, getDomainKind } from "@/data/projects";
import { type Locale, type Dictionary } from "@/lib/i18n";
import ProjectThumbnail from "./ProjectThumbnail";

interface ProjectFeaturedProps {
  project: Project;
  locale: Locale;
  dict: Dictionary;
}

export default function ProjectFeatured({ project, locale, dict }: ProjectFeaturedProps) {
  const typeLabel =
    project.kind === "featured"
      ? dict.projects.type_featured
      : project.kind === "client"
        ? dict.projects.type_client
        : project.kind === "product"
          ? dict.projects.type_product
          : dict.projects.type_study;
  const domainLabel = getDomainLabel(project.url);
  const domainKind = getDomainKind(project.url);

  return (
    <article className="group grid grid-cols-1 gap-6 border border-[var(--color-border-2)] bg-[var(--color-background-elevated)] p-6 transition-colors duration-200 hover:border-[var(--color-border-3)] md:grid-cols-[1.1fr_0.9fr] md:gap-10 md:p-8">
      <ProjectThumbnail
        src={project.image}
        alt={project.imageAlt[locale]}
        priority
        aspect="16/10"
        sizes="(min-width: 1024px) 640px, 100vw"
      />

      <div className="flex flex-col justify-between gap-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-accent)]">
              01 / {typeLabel}
            </span>
            {project.duration && (
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--color-foreground-subtle)]">
                {project.duration}
              </span>
            )}
          </div>

          <h3 className="text-3xl font-semibold leading-tight tracking-tight text-[var(--color-foreground)] md:text-4xl">
            {project.name[locale]}
          </h3>

          <p className="max-w-prose text-base leading-relaxed text-[var(--color-foreground-muted)]">
            {project.description[locale]}
          </p>

          <ul className="flex flex-wrap gap-2" aria-label="Categories">
            {project.tags[locale].map((tag) => (
              <li
                key={tag}
                className="inline-flex items-center border border-[var(--color-border-2)] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-foreground-muted)]"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link inline-flex items-center gap-1.5 font-semibold uppercase tracking-[0.08em] text-[var(--color-accent)]"
            >
              {dict.projects.cta_view}
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-200 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                strokeWidth={2}
              />
            </a>
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-semibold uppercase tracking-[0.08em] text-[var(--color-foreground-muted)] transition-colors duration-150 hover:text-[var(--color-foreground)]"
              >
                {dict.projects.cta_repo}
                <Github className="h-3.5 w-3.5" strokeWidth={1.75} />
              </a>
            )}
          </div>
          <p
            className={`font-mono text-[11px] uppercase tracking-[0.14em] ${
              domainKind === "custom"
                ? "text-[var(--color-accent)]"
                : "text-[var(--color-foreground-subtle)]"
            }`}
          >
            {domainLabel}
          </p>
        </div>
      </div>
    </article>
  );
}
