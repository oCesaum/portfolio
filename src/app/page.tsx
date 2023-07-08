import AdditionalTechnologiesAndSkills from "@/components/AdditionalTechnologiesAndSkills";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Projects from "@/components/Projects";
import Technologies from "@/components/Technologies";
import Timeline from "@/components/Timeline";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden text-zinc-950">
      <Header />
      <section id="home" className="p-6 md:p-28 lg:p-32">
        <div className="max-w-xl md:max-w-lg lg:max-w-xl 2xl:max-w-3xl">
          <h1 className="text-4xl font-semibold uppercase">César Augusto</h1>
          <h2 className="text-7xl font-bold uppercase">
            Desenvolvedor{" "}
            <span className="webkit-text-fill-color-transparent animate-background-pan bg-gradient-to-r from-primary via-tertiary via-90% to-primary bg-200% bg-clip-text text-transparent">
              front-end
            </span>
          </h2>
          <div className="text-base 2xl:text-xl">
            <p>
              Olá! Sou um <b>desenvolvedor front-end em tansição de carreira</b>
              .Atuo atualmente como técnico em segurança do trabalho.{" "}
              <b>Planejo me tornar um desenvolvedor full stack.</b>
            </p>
          </div>
        </div>
      </section>
      <section
        id="projects"
        className="px-6 pb-10 md:px-28 md:pb-24 lg:px-32 lg:pb-32"
      >
        <h2 className="mb-8 text-3xl font-semibold md:text-xl lg:text-3xl 2xl:text-4xl">
          Projetos
        </h2>
        <Projects />
      </section>
      <section
        id="technologies"
        className="bg-zinc-950 px-6 pb-10 pt-20 text-zinc-100 md:px-28 md:pb-24 lg:px-32 lg:pb-32"
      >
        <h2 className="mb-10 text-3xl font-semibold uppercase md:text-xl lg:text-3xl 2xl:text-4xl">
          Tecnologias
        </h2>
        <Technologies />
        <h3 className="mt-10 text-xl font-semibold uppercase">
          Tecnologias e habilidades adicionais
        </h3>
        <h4 className="mb-8 text-sm text-zinc-400 md:text-[10px] lg:text-sm 2xl:text-lg">
          Em aprendizado
        </h4>
        <AdditionalTechnologiesAndSkills />
      </section>
      <section
        id="about"
        className="px-6 pb-10 pt-20 md:px-28 md:pb-24 lg:px-32 lg:pb-32"
      >
        <h2 className="mb-10 text-3xl font-semibold md:text-xl lg:text-3xl 2xl:text-4xl">
          Sobre mim
        </h2>
        <Timeline />
      </section>
      <Footer />
    </main>
  );
}
