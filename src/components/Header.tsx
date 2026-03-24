import Socials from "./Socials";
import Navbar from "./Navbar";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 px-4 pb-3 pt-5 md:px-6 xl:px-10">
      <div className="mx-auto flex max-w-[1180px] items-center justify-between gap-4 border border-white/10 bg-[rgba(13,15,20,0.9)] px-4 py-3 backdrop-blur md:px-5">
        <div className="flex min-w-0 flex-col">
          <span className="text-[0.6rem] uppercase tracking-[0.28em] text-[var(--foreground-soft)]">
            Architect.dev
          </span>
          <span className="truncate text-sm font-medium text-white md:text-[0.92rem]">
            César Augusto
          </span>
        </div>

        <div className="hidden xl:block">
          <Navbar />
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <Socials componentType="header" />
          </div>
          <div className="xl:hidden">
            <Navbar />
          </div>
        </div>
      </div>
    </header>
  );
}
