export default function Navbar() {
  return (
    <>
      <nav className="hidden md:flex items-center gap-16">
      <a
        className="relative before:w-0 before:hover:w-full before:transition-all before:duration-200 before:h-0.5 before:bg-zinc-100 before:absolute before:bottom-0"
        href="#projects"
      >
        Projetos
      </a>
      <a
        className="relative before:w-0 before:hover:w-full before:transition-all before:duration-200 before:h-0.5 before:bg-zinc-100 before:absolute before:bottom-0"
        href="#technologies"
      >
        Tecnologias
      </a>
      <a
        className="relative before:w-0 before:hover:w-full before:transition-all before:duration-200 before:h-0.5 before:bg-zinc-100 before:absolute before:bottom-0"
        href="#about"
      >
        Sobre mim
      </a>
    </nav>
    <div className="block md:hidden">
      <button>
        <svg
          className="fill-zinc-300 w-6 h-6"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
        </svg>
      </button>
    </div>
    </>
  )
}