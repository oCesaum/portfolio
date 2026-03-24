import Socials from "./Socials";
import Navbar from "./Navbar";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 px-6 pb-2 pt-6 md:px-10 xl:px-16">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-full border border-white/10 bg-[rgba(7,10,18,0.72)] px-4 py-3 shadow-[0_20px_80px_rgba(0,0,0,0.18)] backdrop-blur md:px-6">
        <div className="flex min-w-0 flex-col">
          <span className="text-xs uppercase tracking-[0.32em] text-[var(--muted-foreground)]">
            Portfólio
          </span>
          <span className="truncate text-sm font-medium text-white md:text-base">
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
