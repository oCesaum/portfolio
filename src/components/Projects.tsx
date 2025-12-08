import { StaticImageData } from "next/image";
import Barber from "../../public/barber.png";
import CalculadoraTG from "../../public/calculadora-taxa-gravidade.png";
import FastCart from "../../public/fast-cart.png";
import TailwindSpotify from "../../public/tailwind-spotify.png";
import ProjectImage from "../../public/project-image.jpg";
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
      projectName: "DOM Comparator Universal",
      projectDescription:
        "Ferramenta web completa para comparação de sitemaps XML e código HTML com normalização inteligente, robô automatizado e interface moderna com suporte a tema claro/escuro.",
      projectLink: "https://dom-comparator.vercel.app/",
      projectImageUrl: ProjectImage,
      projectRepositoryUrl: "https://github.com/oCesaum/DOM-Comparator",
    },
    {
      projectName: "Doce Compota",
      projectDescription:
        "Landing page para loja de geleias artesanais, desenvolvida com HTML, CSS e JavaScript, focada em apresentar produtos de forma atrativa e responsiva.",
      projectLink: "https://docecompota.com.br/",
      projectImageUrl: ProjectImage,
      projectRepositoryUrl: "https://github.com/oCesaum/Landing-Page-Doce-Compota",
    },
    {
      projectName: "Fast Cart - Landing Page",
      projectDescription:
        "Um projeto feito para automatizar a criação de um carrinho de compras em sites de venda.",
      projectLink: "https://fast-cart-landing-page.vercel.app/",
      projectImageUrl: FastCart,
      projectRepositoryUrl: "https://github.com/oCesaum/fast-cart-landing-page",
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
