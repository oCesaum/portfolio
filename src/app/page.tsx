import AdditionalTechnologiesAndSkills from "@/components/AdditionalTechnologiesAndSkills";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Projects from "@/components/Projects";
import Technologies from "@/components/Technologies";
import Timeline from "@/components/Timeline";
import Image from "next/image";

import Mario from "../../public/mario.gif";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden text-slate-950">
      <Header />
      <section
        id="home"
        className="px-6 pb-10 pt-20 md:px-28 md:pb-24 lg:px-32 lg:pb-32"
      >
        <div className="max-w-lg space-y-3 md:max-w-md lg:max-w-lg 2xl:max-w-xl">
          <h1 className="text-xl md:text-2xl font-semibold uppercase">
            César Augusto
          </h1>
          <h2 className="text-2xl md:text-5xl font-bold uppercase">
            Desenvolvedor{" "}
            <span className="webkit-text-fill-color-transparent animate-background-pan bg-gradient-to-r from-blue-800 via-blue-600 via-90% to-blue-800 bg-200% bg-clip-text text-transparent">
              front-end
            </span>
          </h2>
          <div className="text-sm md:text-base">
            <p>
              Olá! Sou um{" "}
              <b>desenvolvedor front-end em transição de carreira.</b>{" "}
              Atualmente trabalhando como técnico em segurança do trabalho.{" "}
            </p>
          </div>
        </div>
      </section>
      <section
        id="projects"
        className="px-6 pb-10 pt-20 md:px-28 md:pb-24 lg:px-32 lg:pb-32"
      >
        <p className="mb-6 text-xl md:text-2xl font-semibold uppercase">
          Projetos
        </p>
        <Projects />
      </section>
      <div className="rounded-t-3xl overflow-hidden">
        <Image
          className="w-screen max-w-[1920px]"
          src={Mario}
          alt="Mario gif"
          aria-label="Mario gif"
        />
      </div>
      <section
        id="technologies"
        className="bg-slate-950 px-6 pb-10 pt-20 text-slate-100 md:px-28 md:pb-24 lg:px-32 lg:pb-32 rounded-b-3xl"
      >
        <p className="mb-6 text-xl md:text-2xl font-semibold uppercase">
          Tecnologias
        </p>
        <Technologies />
        <p className="my-10 text-xl font-semibold uppercase">
          Tecnologias e habilidades adicionais
        </p>
        <AdditionalTechnologiesAndSkills />
      </section>
      <section
        id="about"
        className="px-6 pb-10 pt-20 md:px-28 md:pb-24 lg:px-32 lg:pb-32"
      >
        <p className="mb-6 text-xl md:text-2xl font-semibold uppercase">
          Sobre mim
        </p>
        <Timeline />
      </section>
      <Footer />
    </main>
  );
}
