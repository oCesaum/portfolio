import Socials from "./Socials";

export default function Footer() {
  return (
    <footer className="py-5 px-20 2xl:px-28 text-sm 2xl:text-base flex items-center justify-between">
      <Socials componentType="footer" />
      <div>&copy; 2023 César Augusto</div>
    </footer>
  )
}