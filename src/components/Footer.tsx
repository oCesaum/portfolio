import Socials from "./Socials";

export default function Footer() {
  return (
    <footer className="flex flex-col items-center justify-between gap-5 px-6 py-5 text-sm sm:flex-row 2xl:px-28 2xl:text-base">
      <Socials componentType="footer" />
      <div>&copy; 2023 César Augusto</div>
    </footer>
  );
}
