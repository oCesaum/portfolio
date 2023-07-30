import Navbar from "./Navbar";
import ScrollToTopButton from "./ScrollToTopButton";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-5 uppercase md:px-28 lg:px-32 2xl:px-28">
      <a
        href="#"
        className="group relative flex items-center gap-3 before:absolute before:bottom-0 before:h-0.5 before:w-0 before:bg-slate-950 dark:before:bg-slate-200 before:transition-all before:duration-200 before:hover:w-full 2xl:before:hover:w-24 text-lg font-medium"
      >
        Portfólio
      </a>
      <Navbar />
      <ScrollToTopButton />
    </header>
  );
}
