import Navbar from "./Navbar";
import ScrollToTopButton from "./ScrollToTopButton";

export default function Header() {
  
  return (
    <>
      <header className="py-5 px-32 2xl:px-28 text-2xl md:text-lg 2xl:text-2xl flex items-center justify-between uppercase font-medium">
        <a
          href="#"
          className="flex items-center gap-3 group relative before:w-0 before:hover:w-full 2xl:before:hover:w-24 before:transition-all before:duration-200 before:h-0.5 before:bg-zinc-950 before:absolute before:bottom-0"
        >
          Portfólio
        </a>
        <Navbar />
      </header>

      <ScrollToTopButton />
    </>
  );
}
