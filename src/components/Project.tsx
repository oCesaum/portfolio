import Image, { StaticImageData } from "next/image";

interface ProjectProps {
  projectName: string;
  projectDescription: string;
  projectLink: string;
  projectImageUrl: StaticImageData;
  projectRepositoryUrl?: string;
}

const Project = ({
  projectName,
  projectDescription,
  projectLink,
  projectImageUrl,
  projectRepositoryUrl,
}: ProjectProps) => {
  return (
    <div className="flex w-full flex-col rounded-lg bg-slate-200 text-center shadow-2xl overflow-hidden group relative">
      <Image
        className="group-hover:scale-125 transition-all duration-500 w-full h-full"
        src={projectImageUrl}
        alt={`Imagem do projeto ${projectName}`}
        placeholder="blur"
        aria-label={projectName}
        loading="eager"
      />
      <div className="absolute h-full w-full translate-y-full z-10 bg-slate-800/95 text-slate-300 transition-all duration-500 space-y-4 group-hover:translate-y-0 flex flex-col items-center justify-center">
        <h3 className="font-bold uppercase">{projectName}</h3>
        <p className="max-w-xs text-sm md:text-base">{projectDescription}</p>
        <div className="flex gap-2 md:gap-4">
          <a
            href={projectLink}
            target="_blank"
            rel="noopener"
            className="mx-auto inline-block w-fit rounded-md bg-zinc-950 px-2 md:px-4 py-1.5 md:py-2 text-center text-xs uppercase text-slate-100 shadow-lg transition-transform hover:scale-110"
          >
            Ver projeto
          </a>

          {projectRepositoryUrl && (
            <a
              href={projectRepositoryUrl}
              target="_blank"
              rel="noopener"
              className="mx-auto inline-block w-fit rounded-md bg-purple-800 px-2 md:px-4 py-1.5 md:py-2 text-center text-xs uppercase text-slate-100 shadow-lg transition-transform hover:scale-110"
            >
              Ver repositório
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Project;
