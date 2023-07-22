import Image, { StaticImageData } from "next/image";

interface ProjectProps {
  projectName: string;
  projectDescription: string;
  projectLink: string;
  projectImageUrl: StaticImageData;
}

const Project = ({
  projectName,
  projectDescription,
  projectLink,
  projectImageUrl,
}: ProjectProps) => {
  return (
    <div className="flex w-full flex-col rounded-lg bg-zinc-200 text-center shadow-2xl overflow-hidden group relative">
      <Image
        className="group-hover:scale-125 transition-all duration-500 w-full h-full"
        src={projectImageUrl}
        alt={`Imagem do projeto ${projectName}`}
        priority
        width={1080}
        height={325}
        quality={100}
      />
      <div className="absolute h-full w-full translate-y-full z-10 bg-zinc-800/95 text-zinc-300 transition-all duration-500 space-y-4 group-hover:translate-y-0 flex flex-col items-center justify-center">
        <h3 className="font-bold uppercase">
          {projectName}
        </h3>
        <p className="max-w-xs">{projectDescription}</p>
        <a
          href={projectLink}
          target="_blank"
          rel="noopener"
          className="mx-auto inline-block w-fit rounded-md bg-zinc-950 px-6 py-2 text-center text-xs uppercase text-zinc-100 shadow-lg transition-transform hover:scale-110 md:px-4 lg:px-6 font-semibold"
        >
          Ver projeto
        </a>
      </div>
    </div>
  );
};

export default Project;
