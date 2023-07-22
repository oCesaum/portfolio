import CalculadoraTG from "../../public/calculadora-taxa-gravidade.png";
import FastCart from "../../public/fast-cart.png";
import Image from "../../public/project-image.jpg";
import TailwindSpotify from "../../public/tailwind-spotify.png";
import Project from "./Project";

export default function Projects() {
  const projects = [
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
    },
    {
      projectName: "Calculadora - Taxa de Gravidade",
      projectDescription:
        "Uma calculadora simples feita para ajudar na produtividade dos técnicos em segurança do trabalho.",
      projectLink: "https://calculadora-hht.vercel.app/",
      projectImageUrl: CalculadoraTG,
    },
    {
      projectName: "Projeto 4 - Em construção",
      projectDescription:
        "Projeto em construção, imagem meramente ilustrativa",
      projectLink: "/#projects",
      projectImageUrl: Image,
    },
  ];

  return (
    <div className="mx-auto w-fit space-y-10 lg:space-y-0 lg:grid lg:grid-cols-2 sm:gap-10 lg:gap-20">
      {projects.map((project) => (
        <Project
          key={project.projectName}
          projectName={project.projectName}
          projectDescription={project.projectDescription}
          projectLink={project.projectLink}
          projectImageUrl={project.projectImageUrl}
        />
      ))}
    </div>
  );
}
