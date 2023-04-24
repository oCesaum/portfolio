"use client"

import { useState } from "react";

const Navbar = () => {
  const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false)

  const closeMobileMenu = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target instanceof HTMLElement && event.target.classList.contains("bg-zinc-950/70")) {
      setMobileMenuIsOpen(false);
    }
  };

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
      <button onClick={() => setMobileMenuIsOpen(true)}>
        <svg
          className="fill-zinc-300 w-6 h-6"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
        </svg>
      </button>
    </div>

    {mobileMenuIsOpen &&
      <div className="md:hidden fixed top-0 right-0 bg-zinc-950/70 w-screen h-screen z-10 transition-all cursor-pointer" onClick={(event) => closeMobileMenu(event)}>
        <div className="bg-zinc-950 w-fit h-full px-10 py-5 ml-auto cursor-default">
          <button className="flex items-center justify-center ml-auto my-3 mr-3" onClick={() => setMobileMenuIsOpen(false)}>
          <svg className="fill-zinc-300 w-12 h-12 p-3 transition-transform duration-300 hover:rotate-180" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
        </button>
          <nav className="flex flex-col items-center gap-16">
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
        </div>
    </div>
    }
    </>
  )
}

export default Navbar;