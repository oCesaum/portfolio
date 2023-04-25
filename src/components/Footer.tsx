import Socials from "./Socials";

export default function Footer() {
  return (
    <footer className="py-5 px-6 2xl:px-28 text-sm 2xl:text-base flex flex-col sm:flex-row items-center justify-between gap-5">
      <Socials componentType="footer" />
      <div>&copy; 2023 César Augusto</div>
    </footer>
  )
}