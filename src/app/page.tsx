import Footer from "@/components/Footer";
import Header from "@/components/Header";
import WhatsAppButton from "@/components/WhatsAppButton";
import { portfolioData } from "@/utils/portfolio-data";
import {
  ArrowUpRight,
  Github,
  Layers,
  Linkedin,
  Mail,
  Sparkles,
} from "lucide-react";
import Image from "next/image";

const featuredProject = portfolioData.projects.find((project) => project.featured);
const secondaryProjects = portfolioData.projects.filter(
  (project) => !project.featured,
);

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden text-[var(--foreground)]">
      <Header />

      <section
        id="home"
        className="relative px-6 pb-16 pt-10 md:px-10 md:pb-24 md:pt-14 xl:px-16"
      >
        <div className="hero-panel mx-auto grid max-w-7xl gap-10 overflow-hidden rounded-[2rem] px-6 py-8 md:px-10 md:py-10 xl:grid-cols-[1.2fr_0.8fr] xl:px-14 xl:py-14">
          <div className="relative z-10 flex flex-col justify-between gap-10">
            <div className="space-y-8">
              <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--muted-foreground)]">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur">
                  <Sparkles className="h-4 w-4 text-[var(--accent)]" />
                  Nova fase do portfólio
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  Disponível para projetos e parcerias
                </span>
              </div>

              <div className="space-y-5">
                <p className="text-sm uppercase tracking-[0.35em] text-[var(--muted-foreground)]">
                  {portfolioData.profile.name}
                </p>
                <h1 className="max-w-4xl text-4xl font-semibold leading-none text-white sm:text-5xl lg:text-6xl xl:text-7xl">
                  {portfolioData.profile.role} com foco em produtos web que unem{" "}
                  <span className="text-[var(--accent)]">clareza, impacto e execução</span>.
                </h1>
                <p className="max-w-2xl text-base leading-8 text-[var(--muted-foreground)] md:text-lg">
                  {portfolioData.profile.summary}
                </p>
                <p className="max-w-xl text-sm leading-7 text-[var(--soft-foreground)] md:text-base">
                  {portfolioData.profile.intro}
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-medium text-slate-950 transition duration-300 hover:translate-y-[-2px] hover:bg-[var(--accent-strong)]"
                >
                  Ver projetos
                  <ArrowUpRight className="h-4 w-4" />
                </a>
                <a
                  href={`mailto:${portfolioData.profile.email}`}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white transition duration-300 hover:border-white/30 hover:bg-white/5"
                >
                  Entrar em contato
                  <Mail className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {portfolioData.highlights.map((item) => (
                <div
                  key={item.label}
                  className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5 backdrop-blur"
                >
                  <p className="text-sm text-[var(--muted-foreground)]">{item.label}</p>
                  <p className="mt-4 text-2xl font-semibold text-white">{item.value}</p>
                  <p className="mt-3 text-sm leading-6 text-[var(--soft-foreground)]">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10 flex flex-col gap-6">
            <div className="rounded-[1.75rem] border border-white/10 bg-[rgba(10,12,18,0.75)] p-6 shadow-[0_30px_120px_rgba(0,0,0,0.35)]">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-[var(--muted-foreground)]">
                    Recorte profissional
                  </p>
                  <p className="mt-2 text-xl font-semibold text-white">
                    Stack moderna com base prática
                  </p>
                </div>
                <div className="rounded-full border border-white/10 p-3 text-[var(--accent)]">
                  <Layers className="h-5 w-5" />
                </div>
              </div>

              <div className="space-y-4 pt-5">
                {portfolioData.expertise.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-[1.25rem] border border-white/10 bg-white/5 p-4"
                  >
                    <p className="text-base font-medium text-white">{item.title}</p>
                    <p className="mt-2 text-sm leading-6 text-[var(--soft-foreground)]">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <a
                href={portfolioData.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5 transition duration-300 hover:translate-y-[-2px] hover:bg-white/10"
              >
                <Linkedin className="h-5 w-5 text-[var(--accent)]" />
                <p className="mt-8 text-lg font-medium text-white">LinkedIn</p>
                <p className="mt-2 text-sm leading-6 text-[var(--soft-foreground)]">
                  Perfil profissional com histórico e conexões.
                </p>
              </a>
              <a
                href={portfolioData.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5 transition duration-300 hover:translate-y-[-2px] hover:bg-white/10"
              >
                <Github className="h-5 w-5 text-[var(--accent)]" />
                <p className="mt-8 text-lg font-medium text-white">GitHub</p>
                <p className="mt-2 text-sm leading-6 text-[var(--soft-foreground)]">
                  Repositórios e implementação dos projetos publicados.
                </p>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="px-6 py-16 md:px-10 md:py-24 xl:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="section-kicker">Projetos selecionados</p>
              <h2 className="section-title">Projetos com mais presença, contexto e peso visual.</h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-[var(--muted-foreground)] md:text-base">
              O objetivo aqui não é listar tudo de forma genérica, mas valorizar o que
              já existe de real com uma apresentação mais madura e convincente.
            </p>
          </div>

          {featuredProject && (
            <article className="project-feature mb-6 grid gap-6 overflow-hidden rounded-[2rem] border border-black/5 bg-[var(--panel)] p-4 shadow-[0_20px_80px_rgba(15,23,42,0.08)] md:p-6 xl:grid-cols-[1.15fr_0.85fr]">
              <div className="overflow-hidden rounded-[1.5rem]">
                <Image
                  src={featuredProject.image}
                  alt={`Preview do projeto ${featuredProject.name}`}
                  width={1200}
                  height={900}
                  className="h-full w-full object-cover"
                  priority
                />
              </div>
              <div className="flex flex-col justify-between gap-6 p-2 md:p-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.25em] text-[var(--muted-foreground)]">
                    Projeto em destaque
                  </p>
                  <h3 className="mt-3 text-3xl font-semibold text-[var(--foreground-strong)]">
                    {featuredProject.name}
                  </h3>
                  <p className="mt-4 text-base leading-8 text-[var(--muted-foreground)]">
                    {featuredProject.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {featuredProject.tags.map((tag) => (
                    <span key={tag} className="tag-chip">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3">
                  <a
                    href={featuredProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition duration-300 hover:translate-y-[-2px]"
                  >
                    Abrir projeto
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                  {featuredProject.repositoryUrl && (
                    <a
                      href={featuredProject.repositoryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-5 py-3 text-sm font-medium text-slate-900 transition duration-300 hover:translate-y-[-2px] hover:border-slate-950"
                    >
                      Ver repositório
                      <Github className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            </article>
          )}

          <div className="grid gap-5 lg:grid-cols-2">
            {secondaryProjects.map((project) => (
              <article
                key={project.name}
                className="group overflow-hidden rounded-[1.75rem] border border-black/5 bg-[var(--panel)] p-4 shadow-[0_20px_80px_rgba(15,23,42,0.05)] transition duration-300 hover:translate-y-[-4px]"
              >
                <div className="relative overflow-hidden rounded-[1.25rem]">
                  <Image
                    src={project.image}
                    alt={`Preview do projeto ${project.name}`}
                    width={1000}
                    height={700}
                    className="h-64 w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="space-y-5 p-2 pt-5">
                  <div>
                    <h3 className="text-2xl font-semibold text-[var(--foreground-strong)]">
                      {project.name}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-[var(--muted-foreground)] md:text-base">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="tag-chip">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition duration-300 hover:bg-slate-800"
                    >
                      Ver projeto
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                    {project.repositoryUrl && (
                      <a
                        href={project.repositoryUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-5 py-3 text-sm font-medium text-slate-900 transition duration-300 hover:border-slate-950"
                      >
                        Código
                        <Github className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="expertise" className="px-6 py-16 md:px-10 md:py-24 xl:px-16">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="section-card-dark">
            <p className="section-kicker text-[var(--accent)]">Expertise</p>
            <h2 className="mt-4 text-3xl font-semibold text-white md:text-4xl">
              Direção visual forte, engenharia limpa e construção pragmática.
            </h2>
            <p className="mt-5 text-sm leading-7 text-[var(--soft-foreground)] md:text-base">
              A nova estrutura do portfólio parte do que já é verdadeiro na sua base:
              capacidade técnica, repertório web e foco em solução. O redesign organiza
              isso com mais narrativa, contraste e intenção.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {portfolioData.expertise.map((item) => (
              <article key={item.title} className="section-card">
                <p className="text-lg font-semibold text-[var(--foreground-strong)]">
                  {item.title}
                </p>
                <p className="mt-4 text-sm leading-7 text-[var(--muted-foreground)]">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="stack" className="px-6 py-16 md:px-10 md:py-24 xl:px-16">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-black/5 bg-[var(--panel)] p-6 shadow-[0_20px_80px_rgba(15,23,42,0.05)] md:p-8 xl:p-10">
          <div className="grid gap-10 xl:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="section-kicker">Stack e repertório</p>
              <h2 className="section-title">Tecnologias organizadas para leitura rápida e posicionamento forte.</h2>
              <p className="mt-5 text-sm leading-7 text-[var(--muted-foreground)] md:text-base">
                Em vez de uma listagem fria, a stack aparece como repertório visual e técnico,
                reforçando domínio em tecnologias atuais sem poluir a experiência.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-[var(--muted-foreground)]">
                  Tecnologias principais
                </p>
                <div className="flex flex-wrap gap-3">
                  {portfolioData.techStack.map((item) => (
                    <span key={item} className="stack-chip">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-[var(--muted-foreground)]">
                  Habilidades adicionais
                </p>
                <div className="flex flex-wrap gap-3">
                  {portfolioData.additionalSkills.map((item) => (
                    <span key={item} className="stack-chip stack-chip-muted">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="px-6 py-16 md:px-10 md:py-24 xl:px-16">
        <div className="mx-auto grid max-w-7xl gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <div className="section-card">
            <p className="section-kicker">Perfil</p>
            <h2 className="mt-4 text-3xl font-semibold text-[var(--foreground-strong)] md:text-4xl">
              Um posicionamento mais maduro, sem perder a base real do projeto atual.
            </h2>
          </div>

          <div className="section-card">
            <div className="space-y-5 text-sm leading-8 text-[var(--muted-foreground)] md:text-base">
              {portfolioData.about.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="px-6 pb-16 pt-4 md:px-10 md:pb-24 xl:px-16">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(253,224,71,0.18),transparent_30%),linear-gradient(135deg,#0f172a,#020617)] px-6 py-8 md:px-10 md:py-10">
          <div className="grid gap-8 xl:grid-cols-[1fr_auto] xl:items-end">
            <div>
              <p className="section-kicker text-[var(--accent)]">Contato</p>
              <h2 className="mt-4 max-w-3xl text-3xl font-semibold text-white md:text-4xl">
                Se a ideia for construir algo com mais qualidade visual e técnica, vamos conversar.
              </h2>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-[var(--soft-foreground)] md:text-base">
                Portfólio reposicionado para comunicar melhor o que você já faz de verdade:
                desenvolver produtos web modernos, úteis e bem apresentados.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href={`mailto:${portfolioData.profile.email}`}
                className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-medium text-slate-950 transition duration-300 hover:bg-[var(--accent-strong)]"
              >
                <Mail className="h-4 w-4" />
                {portfolioData.profile.email}
              </a>
              <a
                href={portfolioData.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-white transition duration-300 hover:bg-white/5"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
