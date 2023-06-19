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
    <div className="p-6 space-y-4 max-w-full md:p-4 md:space-y-2 md:min-w-[250px] lg:w-[360px] xl:w-[416px] xl:space-y-3 2xl:w-[624px] 2xl:p-6 2xl:space-y-4 rounded-lg shadow-2xl text-center flex flex-col">
        <Image
          className="rounded-md w-full"
          src={projectImageUrl}
          alt={`Imagem do projeto ${projectName}`}
          priority
          width={1080}
          height={325}
          quality={100}
        />
      <h3 className="mx-auto text-xl md:text-sm lg:text-base xl:text-lg 2xl:text-2xl w-fit font-semibold uppercase ull">
        {projectName}
      </h3>
      <p className="text-sm grow">{projectDescription}</p>
      <a
        href={projectLink}
        target="_blank"
        rel="noopener"
        className="inline-block px-6 md:px-4 lg:px-6 py-2 rounded-md shadow-lg bg-zinc-950 text-base text-zinc-100 md:text-sm 2xl:text-base text-center transition-transform hover:scale-110 uppercase w-fit mx-auto"
      >
        Ver projeto
      </a>
    </div>
  );
};

export default Project;
