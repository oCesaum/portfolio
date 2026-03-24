import Socials from "./Socials";

export default function Footer() {
  return (
    <footer className="px-6 pb-10 pt-4 md:px-10 xl:px-16">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 border-t border-black/10 py-6 text-sm text-[var(--muted-foreground)] md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-medium text-[var(--foreground-strong)]">César Augusto</p>
          <p className="mt-1">Portfólio em nova fase, construído com Next.js, TypeScript e Tailwind CSS.</p>
        </div>
        <Socials componentType="footer" />
      </div>
    </footer>
  );
}
