import Image from "next/image";
import ProjectImage from "../../public/project-image.jpg"

export default function Project () {
return (
    <div className="w-[540px] p-6 mt-8 space-y-4 max-w-full md:p-4 md:space-y-2 md:min-w-[250px] md:mt-4 lg:w-[360px] lg:mt-4 xl:w-[416px] xl:mt-5 xl:space-y-3 2xl:w-[624px] 2xl:p-6 2xl:mt-8 2xl:space-y-4 rounded-lg shadow-lg shadow-zinc-950">
        <Image
          className="rounded-md w-full"
          src={ProjectImage}
          alt="Imagem aleatória 1"
          width={1080}
          quality={100}
        />
        <h3 className="mx-auto uppercase text-center text-xl md:text-sm lg:text-base xl:text-lg 2xl:text-2xl w-fit relative before:w-full before:h-0.5 before:bg-zinc-300 before:absolute before:bottom-0 before:rounded-full">Nome do projeto</h3>
        <p className="text-base md:text-sm 2xl:text-base">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Dignissimos, facilis quam molestias officiis error commodi possimus
          illo ab quo praesentium maiores adipisci est quisquam dolores vitae
          labore, suscipit deleniti nihil.
        </p>
        <button className="px-6 md:px-4 lg:px-6 py-2 rounded-full shadow-lg bg-zinc-800 shadow-zinc-950 text-base md:text-sm 2xl:text-base text-center transition-transform hover:scale-110">Ver projeto</button>
    </div>
  );
};
