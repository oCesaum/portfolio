import Socials from "./Socials";

export default function Footer() {
  return (
    <footer className="px-4 pb-8 pt-2 md:px-6 xl:px-10">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-5 border-t border-white/10 py-6 text-sm text-[var(--muted-foreground)] md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-medium text-[var(--foreground)]">César Augusto</p>
          <p className="mt-1">
            Portfólio refinado com Next.js, TypeScript e Tailwind CSS.
          </p>
        </div>
        <Socials componentType="footer" />
      </div>
    </footer>
  );
}
