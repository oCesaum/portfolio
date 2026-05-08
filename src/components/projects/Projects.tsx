import { type Locale, type Dictionary } from "@/lib/i18n";
import { projects } from "@/data/projects";
import ProjectShowcase from "./ProjectShowcase";

interface ProjectsProps {
  locale: Locale;
  dict: Dictionary;
}

export default function Projects({ locale, dict }: ProjectsProps) {
  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      className="border-t border-[var(--color-border-1)]"
    >
      <div className="container py-24">
        <header className="mb-16 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <p
              className="eyebrow-num font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-foreground-subtle)]"
              data-section="02"
              aria-hidden="true"
            >
              {dict.projects.eyebrow}
            </p>
            <h2
              id="projects-title"
              className="text-4xl font-bold leading-[1.0] tracking-[-0.018em] text-[var(--color-foreground)] md:text-5xl"
            >
              {dict.projects.title}
            </h2>
          </div>
          <p className="max-w-prose text-base text-[var(--color-foreground-muted)] md:max-w-md md:text-right">
            {dict.projects.subtitle}
          </p>
        </header>

        <div className="space-y-24 md:space-y-28">
          {projects.map((project, idx) => (
            <ProjectShowcase
              key={project.id}
              project={project}
              index={idx}
              locale={locale}
              dict={dict}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
