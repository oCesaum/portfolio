import Footer from "@/components/Footer";
import Header from "@/components/Header";
import WhatsAppButton from "@/components/WhatsAppButton";
import { portfolioData } from "@/utils/portfolio-data";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Github,
  Linkedin,
  Mail,
  SquareStack,
} from "lucide-react";
import Image from "next/image";

const featuredProject = portfolioData.projects.find((project) => project.featured);
const secondaryProjects = portfolioData.projects.filter(
  (project) => !project.featured,
);
const highlightedProjects = secondaryProjects.slice(0, 2);
const projectList = secondaryProjects.slice(2);

export default function Home() {
  return (
    <main className="portfolio-shell text-[var(--foreground)]">
      <Header />

      <div className="page-wrap px-4 pb-8 md:px-6 xl:px-10">
        <div className="main-frame mx-auto max-w-[1180px] overflow-hidden rounded-[1.6rem]">
          <section id="home" className="frame-section frame-hero">
            <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="space-y-6">
                <div className="space-y-3">
                  <p className="micro-label">Full-stack engineer</p>
                  <h1 className="hero-title max-w-[13ch]">
                    Engenharia de precisao para experiencias digitais.
                  </h1>
                  <p className="hero-copy max-w-2xl">
                    {portfolioData.profile.summary} {portfolioData.profile.intro}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <a href="#projects" className="primary-button">
                    Ver projetos
                  </a>
                  <a
                    href={`mailto:${portfolioData.profile.email}`}
                    className="secondary-button"
                  >
                    Entrar em contato
                  </a>
                </div>
              </div>

              <div className="hero-visual-card">
                <div className="tech-poster">
                  <div className="tech-poster__shape" />
                  <p className="tech-poster__title">Technical</p>
                  <p className="tech-poster__subtitle">Portfólio profissional</p>
                </div>
              </div>
            </div>

            <div className="stats-strip">
              <div className="stats-main">
                <span className="stats-main__value">10+</span>
                <span className="stats-main__label">tecnologias em uso recorrente</span>
              </div>
              <div className="stats-list">
                {portfolioData.techStack.slice(0, 5).map((tech) => (
                  <span key={tech} className="stats-list__item">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </section>

          <section id="projects" className="frame-section">
            <div className="section-topline">
              <div>
                <p className="micro-label">Portfólio</p>
                <h2 className="frame-title">Projetos em destaque</h2>
              </div>
              <p className="section-note">
                Projetos reais reorganizados em uma vitrine mais curada, com mais
                contexto visual e leitura mais estratégica.
              </p>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              {featuredProject && (
                <article className="project-card project-card--featured">
                  <div className="project-card__image">
                    <Image
                      src={featuredProject.image}
                      alt={`Preview do projeto ${featuredProject.name}`}
                      width={1100}
                      height={760}
                      className="h-full w-full object-cover"
                      priority
                    />
                  </div>
                  <div className="project-card__body">
                    <div>
                      <p className="project-card__eyebrow">Projeto principal</p>
                      <h3 className="project-card__title">{featuredProject.name}</h3>
                      <p className="project-card__copy">{featuredProject.description}</p>
                    </div>
                    <div className="project-card__meta">
                      {featuredProject.tags.map((tag) => (
                        <span key={tag} className="micro-pill">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="project-card__actions">
                      <a
                        href={featuredProject.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-link"
                      >
                        Abrir projeto
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                      {featuredProject.repositoryUrl && (
                        <a
                          href={featuredProject.repositoryUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-link text-link--muted"
                        >
                          Repositório
                          <Github className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              )}

              <div className="grid gap-4">
                {highlightedProjects.map((project) => (
                  <article key={project.name} className="project-card project-card--compact">
                    <div className="project-card__image compact-image">
                      <Image
                        src={project.image}
                        alt={`Preview do projeto ${project.name}`}
                        width={900}
                        height={700}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="project-card__body">
                      <div>
                        <h3 className="project-card__title">{project.name}</h3>
                        <p className="project-card__copy">{project.description}</p>
                      </div>
                      <div className="project-card__actions">
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-link"
                        >
                          Ver projeto
                          <ArrowUpRight className="h-4 w-4" />
                        </a>
                        {project.repositoryUrl && (
                          <a
                            href={project.repositoryUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-link text-link--muted"
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

            <div className="project-list mt-4">
              {projectList.map((project) => (
                <article key={project.name} className="project-row">
                  <div className="project-row__media">
                    <Image
                      src={project.image}
                      alt={`Preview do projeto ${project.name}`}
                      width={900}
                      height={640}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="project-row__content">
                    <div>
                      <h3 className="project-row__title">{project.name}</h3>
                      <p className="project-row__copy">{project.description}</p>
                    </div>
                    <div className="project-row__tags">
                      {project.tags.map((tag) => (
                        <span key={tag} className="micro-pill micro-pill--subtle">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="project-row__actions">
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-link"
                      >
                        Visitar
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                      {project.repositoryUrl && (
                        <a
                          href={project.repositoryUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-link text-link--muted"
                        >
                          GitHub
                          <Github className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section id="about" className="frame-section">
            <div className="grid gap-6 lg:grid-cols-[1fr_0.88fr]">
              <div className="space-y-5">
                <p className="micro-label">Sobre mim</p>
                <h2 className="frame-title max-w-[11ch]">
                  Engenharia com proposito.
                </h2>
                <div className="space-y-4">
                  {portfolioData.about.map((paragraph) => (
                    <p key={paragraph} className="section-paragraph max-w-2xl">
                      {paragraph}
                    </p>
                  ))}
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
                  <BriefcaseBusiness className="h-3.5 w-3.5" />
                  Solucoes web com foco em clareza e execucao
                </div>
              </div>

              <div className="portrait-panel">
                <div className="portrait-panel__frame">
                  <div className="portrait-panel__glow" />
                  <div className="portrait-panel__plate">
                    <p className="portrait-panel__plate-label">Profile review</p>
                    <p className="portrait-panel__plate-title">César Augusto</p>
                    <p className="portrait-panel__plate-copy">
                      Desenvolvedor full-stack com base prática em WordPress, PHP,
                      Node.js e ecossistema React.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="content-divider" />

            <div className="section-topline">
              <div>
                <p className="micro-label">Trajetória profissional</p>
                <h3 className="subsection-title">Recortes da atuação</h3>
              </div>
              <p className="section-note">
                Em vez de inflar experiência, a seção destaca o que já é verificável na
                sua base: stack, tipo de entrega e foco de produto.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {portfolioData.highlights.map((item) => (
                <article key={item.label} className="info-panel">
                  <p className="info-panel__label">{item.label}</p>
                  <p className="info-panel__value">{item.value}</p>
                  <p className="info-panel__copy">{item.description}</p>
                </article>
              ))}
            </div>

            <div id="expertise" className="content-divider" />

            <div className="section-topline">
              <div>
                <p className="micro-label">Especialidade</p>
                <h3 className="subsection-title">Areas de especialidade</h3>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {portfolioData.focusAreas.map((item) => (
                <article key={item.title} className="focus-card">
                  <SquareStack className="mb-5 h-4 w-4 text-[var(--accent)]" />
                  <p className="focus-card__title">{item.title}</p>
                  <p className="focus-card__copy">{item.description}</p>
                </article>
              ))}
            </div>

            <div id="stack" className="content-divider" />

            <div className="section-topline">
              <div>
                <p className="micro-label">Stack</p>
                <h3 className="subsection-title">Tecnologias e ferramentas</h3>
              </div>
            </div>

            <div className="tech-grid">
              {portfolioData.techStack.map((tech) => (
                <div key={tech} className="tech-grid__item">
                  {tech}
                </div>
              ))}
            </div>

            <div className="content-divider" />

            <div className="section-topline">
              <div>
                <p className="micro-label">Filosofia</p>
                <h3 className="subsection-title">Filosofia de trabalho</h3>
              </div>
            </div>

            <div className="principles-panel">
              {portfolioData.principles.map((principle) => (
                <div key={principle} className="principles-panel__item">
                  {principle}
                </div>
              ))}
            </div>
          </section>

          <section id="contact" className="frame-section">
            <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
              <div className="space-y-5">
                <p className="micro-label">Contato</p>
                <h2 className="frame-title max-w-[12ch]">
                  Vamos construir algo extraordinario?
                </h2>
                <p className="section-paragraph max-w-xl">
                  Estou sempre em busca de colaboracoes que desafiem o processo e
                  levem produtos web para um nivel mais consistente em termos visuais,
                  tecnicos e estrategicos.
                </p>

                <div className="contact-grid">
                  {portfolioData.contactCards.map((item) => (
                    <div key={item.label} className="contact-grid__item">
                      <p className="contact-grid__label">{item.label}</p>
                      <p className="contact-grid__value">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="contact-side">
                <div className="contact-side__panel">
                  <div className="contact-side__image">
                    <Image
                      src="/project-image.jpg"
                      alt="Estação de trabalho"
                      width={1200}
                      height={900}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="contact-side__content">
                    <h3 className="contact-side__title">
                      Localizado no Brasil, atuando em projetos web com visão de produto.
                    </h3>
                    <p className="contact-side__copy">
                      A nova interface reforça um posicionamento mais autoral e mais próximo
                      da direção do Stitch, sem perder o que já existia de real no seu portfólio.
                    </p>
                    <div className="contact-side__actions">
                      <a
                        href={`mailto:${portfolioData.profile.email}`}
                        className="primary-button"
                      >
                        <Mail className="h-4 w-4" />
                        Email
                      </a>
                      <a
                        href={portfolioData.socials.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="secondary-button"
                      >
                        <Linkedin className="h-4 w-4" />
                        LinkedIn
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
