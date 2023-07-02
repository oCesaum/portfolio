import Navbar from "./Navbar";
import ScrollToTopButton from "./ScrollToTopButton";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-5 text-2xl font-medium uppercase md:px-28 md:text-lg lg:px-32 2xl:px-28 2xl:text-2xl">
      <a
        href="#"
        className="group relative flex items-center gap-3 before:absolute before:bottom-0 before:h-0.5 before:w-0 before:bg-zinc-950 before:transition-all before:duration-200 before:hover:w-full 2xl:before:hover:w-24"
      >
        Portfólio
      </a>
      <Navbar />
      <ScrollToTopButton />
    </header>
  );
}
