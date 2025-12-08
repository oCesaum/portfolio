import { StaticImageData } from "next/image";
import Barber from "../../public/barber.png";
import CalculadoraTG from "../../public/calculadora-taxa-gravidade.png";
import FastCart from "../../public/fast-cart.png";
import TailwindSpotify from "../../public/tailwind-spotify.png";
import Project from "./Project";

interface ProjectData {
  projectName: string;
  projectDescription: string;
  projectLink: string;
  projectImageUrl: StaticImageData;
  projectRepositoryUrl?: string;
}

export default function Projects() {
  const projects: ProjectData[] = [
    {
      projectName: "Fast Cart - Landing Page",
      projectDescription:
        "Um projeto feito para automatizar a criação de um carrinho de compras em sites de venda.",
      projectLink: "https://fast-cart-landing-page.vercel.app/",
      projectImageUrl: FastCart,
    },
    {
      projectName: "Tailwind Spotify",
      projectDescription:
        "O Tailwind Spotify é um clone do Spotify, utilizando Next.js e Tailwind para estilização.",
      projectLink: "https://tailwind-spotify-phi.vercel.app/",
      projectImageUrl: TailwindSpotify,
      projectRepositoryUrl: "https://github.com/oCesaum/tailwind-spotify",
    },
    {
      projectName: "Barber Landing Page",
      projectDescription: "Um projeto simples para barbearias",
      projectLink: "https://barber-landing-page-theta.vercel.app/",
      projectImageUrl: Barber,
      projectRepositoryUrl: "https://github.com/oCesaum/barber-landing-page",
    },
    {
      projectName: "Calculadora - Taxa de Gravidade",
      projectDescription:
        "Uma calculadora simples feita para ajudar na produtividade dos técnicos em segurança do trabalho.",
      projectLink: "https://calculadora-hht.vercel.app/",
      projectImageUrl: CalculadoraTG,
      projectRepositoryUrl:
        "https://github.com/oCesaum/calculadora-taxa-gravidade",
    },
  ];

  return (
    <div className="w-full space-y-10 lg:space-y-0 lg:grid lg:grid-cols-2 sm:gap-10 lg:gap-20">
      {projects.map((project) => (
        <Project
          key={project.projectName}
          projectName={project.projectName}
          projectDescription={project.projectDescription}
          projectLink={project.projectLink}
          projectImageUrl={project.projectImageUrl}
          projectRepositoryUrl={project?.projectRepositoryUrl}
        />
      ))}
    </div>
  );
}
