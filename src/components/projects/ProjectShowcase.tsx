import { ArrowUpRight, Github } from "lucide-react";
import { type Project, getDomainLabel, getDomainKind } from "@/data/projects";
import { type Locale, type Dictionary } from "@/lib/i18n";
import ProjectThumbnail from "./ProjectThumbnail";

interface ProjectShowcaseProps {
  project: Project;
  index: number;
  locale: Locale;
  dict: Dictionary;
}

export default function ProjectShowcase({
  project,
  index,
  locale,
  dict,
}: ProjectShowcaseProps) {
  const isReversed = index % 2 === 0;
  const padded = (index + 1).toString().padStart(2, "0");

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

  const accent = project.accent;
  const gradientAngle = isReversed ? "225deg" : "135deg";
  const articleStyle = {
    ["--project-accent" as string]: accent,
    background: `linear-gradient(${gradientAngle}, color-mix(in oklab, ${accent} 18%, transparent) 0%, transparent 65%), color-mix(in oklab, ${accent} 6%, var(--color-background-elevated))`,
    borderColor: `color-mix(in oklab, ${accent} 28%, var(--color-border-2))`,
  };

  return (
    <article
      style={articleStyle}
      className="project-showcase group relative grid grid-cols-1 gap-8 rounded-lg border p-6 transition-colors duration-300 md:grid-cols-12 md:items-center md:gap-12 md:p-10"
    >
      <div
        className={`relative md:col-span-7 ${
          isReversed ? "md:order-2" : "md:order-1"
        }`}
      >
        <div className="project-showcase__thumb relative">
          <ProjectThumbnail
            src={project.image}
            alt={project.imageAlt[locale]}
            priority={index === 0}
            aspect="16/10"
            sizes="(min-width: 1024px) 700px, 100vw"
          />
        </div>
      </div>

      <div
        className={`flex flex-col gap-5 md:col-span-5 ${
          isReversed ? "md:order-1" : "md:order-2"
        }`}
      >
        <div className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="inline-block h-2 w-2 rounded-full"
            style={{ backgroundColor: project.accent }}
          />
          <span
            className="font-mono text-[10px] uppercase tracking-[0.18em]"
            style={{ color: project.accent }}
          >
            {padded} / {typeLabel}
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

        <div className="flex flex-col gap-3 pt-2">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link inline-flex items-center gap-1.5 font-semibold uppercase tracking-[0.08em]"
              style={{ color: project.accent }}
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
            className="font-mono text-[11px] uppercase tracking-[0.14em]"
            style={{
              color:
                domainKind === "custom"
                  ? project.accent
                  : "var(--color-foreground-subtle)",
            }}
          >
            {domainLabel}
          </p>
        </div>
      </div>
    </article>
  );
}
