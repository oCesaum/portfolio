import Project from "./Project";

import Image from "../../public/project-image.jpg"
import FastCart from "../../public/fast-cart.png"
import TailwindSpotify from "../../public/tailwind-spotify.png"
import MapaTaticoDMZ from "../../public/mapa-tatico-dmz.png"

export default function Projects() {
  const projects = [
    {
      projectName: 'Fast Cart',
      projectDescription: 'Um projeto feito para facilitar a criação de um carrinho de compras em sites de venda, apenas adicionando o script o carrinho é criado automaticamente.',
      projectLink: 'https://fast-cart-landing-page.vercel.app/',
      projectImageUrl: FastCart,
    },
    {
      projectName: 'Tailwind Spotify',
      projectDescription: 'O Tailwind Spotify é um projeto para aprimoramento das minhas habilidades em Tailwind, fazendo assim um clone do Spotify. O projeto ainda não está concluído, mas clique no link para ver como está ficando.',
      projectLink: 'https://tailwind-spotify-phi.vercel.app/',
      projectImageUrl: TailwindSpotify,
    },
    {
      projectName: 'Projeto 3',
      projectDescription: 'Descrição do projeto 3... Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic nobis repellat adipisci, in, autem debitis commodi ab rerum, culpa natus inventore molestias distinctio ipsa assumenda libero quisquam fugiat modi obcaecati.',
      projectLink: '/#projects',
      projectImageUrl: Image,
    },
    {
      projectName: 'Projeto 4',
      projectDescription: 'Descrição do projeto 4... Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic nobis repellat adipisci, in, autem debitis commodi ab rerum, culpa natus inventore molestias distinctio ipsa assumenda libero quisquam fugiat modi obcaecati.',
      projectLink: '/#projects',
      projectImageUrl: Image,
    },
  ];

  return (
    <div className="md:grid md:grid-cols-2 gap-0 md:gap-10 lg:gap-20 mx-auto w-fit">
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
};
