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
    <div className="flex max-w-full flex-col space-y-4 rounded-lg bg-zinc-200 pb-6 text-center shadow-2xl md:min-w-[250px] md:space-y-2 lg:w-[360px] xl:w-[416px] xl:space-y-3 2xl:w-[624px] 2xl:space-y-4 overflow-hidden">
      <Image
        src={projectImageUrl}
        alt={`Imagem do projeto ${projectName}`}
        priority
        width={1080}
        height={325}
        quality={100}
      />
      <h3 className="mx-auto w-fit text-xl font-semibold uppercase md:text-sm lg:text-base xl:text-lg 2xl:text-2xl">
        {projectName}
      </h3>
      <p className="px-6 grow text-sm">{projectDescription}</p>
      <a
        href={projectLink}
        target="_blank"
        rel="noopener"
        className="mx-auto inline-block w-fit rounded-md bg-zinc-950 px-6 py-2 text-center text-base uppercase text-zinc-100 shadow-lg transition-transform hover:scale-110 md:px-4 md:text-sm lg:px-6 2xl:text-base"
      >
        Ver projeto
      </a>
    </div>
  );
};

export default Project;
