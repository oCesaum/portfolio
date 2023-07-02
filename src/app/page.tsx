import AdditionalTechnologiesAndSkills from "@/components/AdditionalTechnologiesAndSkills";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Projects from "@/components/Projects";
import Technologies from "@/components/Technologies";
import Timeline from "@/components/Timeline";

export default function Home() {
  return (
    <main className="min-h-screen text-zinc-950 overflow-hidden">
      <Header />
        <section id="home" className="p-6 md:p-28 lg:p-32">
          <div className="max-w-xl md:max-w-lg lg:max-w-xl 2xl:max-w-3xl">
            <h1 className="text-4xl font-semibold uppercase">César Augusto</h1>
            <h2 className="text-7xl font-bold uppercase">Desenvolvedor <span className="text-transparent bg-gradient-to-r from-primary via-90% via-tertiary to-primary bg-clip-text webkit-text-fill-color-transparent animate-background-pan bg-200%">front-end</span></h2>
            <div className="text-base 2xl:text-xl">
              <p>Olá! Sou um desenvolvedor front-end apaixonado por criar experiências incríveis na web. Atualmente, estou aprimorando meus conhecimentos para me tornar um desenvolvedor full stack.</p>
            </div>
          </div>
        </section>
        <section id="projects" className="px-6 md:px-28 lg:px-32 pb-10 md:pb-24 lg:pb-32">
          <h2 className="mb-8 text-3xl md:text-xl lg:text-3xl 2xl:text-4xl font-semibold">Projetos</h2>
          <Projects />
        </section>
        <section id="technologies" className="px-6 md:px-28 lg:px-32 pb-10 md:pb-24 lg:pb-32 bg-zinc-950 text-zinc-100 pt-20">
          <h2 className="mb-10 text-3xl md:text-xl lg:text-3xl 2xl:text-4xl font-semibold uppercase">Tecnologias</h2>
          <Technologies />
          <h3 className="mt-10 text-xl font-semibold uppercase">Tecnologias e habilidades adicionais</h3>
          <h4 className="mb-8 text-sm md:text-[10px] lg:text-sm 2xl:text-lg text-zinc-400">Em aprendizado</h4>
          <AdditionalTechnologiesAndSkills />
        </section>
        <section id="about" className="px-6 md:px-28 lg:px-32 pb-10 md:pb-24 lg:pb-32 pt-20">
          <h2 className="mb-10 text-3xl md:text-xl lg:text-3xl 2xl:text-4xl font-semibold">Sobre mim</h2>
          <Timeline />
        </section>
      <Footer />
    </main>
  );
}
