import Image from "next/image";
import ProjectImage from "../../public/project-image.jpg"

export default function Project () {
return (
    <div className="p-6 space-y-4 max-w-full md:p-4 md:space-y-2 md:min-w-[250px] lg:w-[360px] xl:w-[416px] xl:space-y-3 2xl:w-[624px] 2xl:p-6 2xl:space-y-4 rounded-lg shadow-sm hover:shadow-md shadow-zinc-950 hover:shadow-zinc-950">
        <Image
          className="rounded-md w-full"
          src={ProjectImage}
          alt="Imagem aleatória 1"
          priority
          width={1080}
          quality={100}
        />
        <h3 className="mx-auto uppercase text-center text-xl md:text-sm lg:text-base xl:text-lg 2xl:text-2xl w-fit">Nome do projeto</h3>
        <p className="text-base md:text-sm 2xl:text-base">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Dignissimos, facilis quam molestias officiis error commodi possimus
          illo ab quo praesentium maiores adipisci est quisquam dolores vitae
          labore, suscipit deleniti nihil.
        </p>
        <a href="#" target="_blank" rel="noopener" className="inline-block px-6 md:px-4 lg:px-6 py-2 rounded-full shadow-lg bg-zinc-800 shadow-zinc-950 text-base md:text-sm 2xl:text-base text-center transition-transform hover:scale-110">Ver projeto</a>
    </div>
  );
};
