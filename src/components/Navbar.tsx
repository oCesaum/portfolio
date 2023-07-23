"use client";

import { useState } from "react";
import { Link } from "react-scroll";

const Navbar = () => {
  const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false);

  return (
    <>
      <nav>
        <ul className="hidden items-center gap-16 lg:flex">
          <li>
            <Link
              to="projects"
              smooth="true"
              duration={500}
              className="relative cursor-pointer before:absolute before:bottom-0 before:h-0.5 before:w-0 before:bg-slate-950 before:transition-all before:duration-200 before:hover:w-full"
            >
              Projetos
            </Link>
          </li>
          <li>
            <Link
              to="technologies"
              smooth="true"
              duration="400"
              className="relative cursor-pointer before:absolute before:bottom-0 before:h-0.5 before:w-0 before:bg-slate-950 before:transition-all before:duration-200 before:hover:w-full"
            >
              Tecnologias
            </Link>
          </li>
          <li>
            <Link
              to="about"
              smooth="true"
              duration="400"
              className="relative cursor-pointer before:absolute before:bottom-0 before:h-0.5 before:w-0 before:bg-slate-950 before:transition-all before:duration-200 before:hover:w-full"
            >
              Sobre mim
            </Link>
          </li>
        </ul>
      </nav>

      <div className="block lg:hidden">
        <button onClick={() => setMobileMenuIsOpen(true)}>
          <svg
            className="h-6 w-6 fill-slate-950"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
          </svg>
        </button>
      </div>
      <div
        className={`fixed right-0 top-0 z-50 h-screen w-fit shadow-lg cursor-default bg-slate-100 px-10 py-5 transition-all duration-300 ease-in lg:hidden ${
          mobileMenuIsOpen ? "" : "translate-x-[110%]"
        }`}
      >
        <button
          className="my-2 ml-auto flex -translate-y-2/4"
          onClick={() => setMobileMenuIsOpen(false)}
        >
          <svg
            className="h-12 w-12 fill-slate-950 p-3 transition-transform duration-300 hover:rotate-180"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384 512"
          >
            <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
          </svg>
        </button>
        <nav>
          <ul className="flex flex-col items-center gap-16">
            <li>
              <Link
                to="projects"
                smooth="true"
                duration="400"
                className="relative cursor-pointer before:absolute before:bottom-0 before:h-0.5 before:w-0 before:bg-slate-950 before:transition-all before:duration-200 before:hover:w-full"
              >
                Projetos
              </Link>
            </li>
            <li>
              <Link
                to="technologies"
                smooth="true"
                duration="400"
                className="relative cursor-pointer before:absolute before:bottom-0 before:h-0.5 before:w-0 before:bg-slate-950 before:transition-all before:duration-200 before:hover:w-full"
              >
                Tecnologias
              </Link>
            </li>
            <li>
              <Link
                to="about"
                smooth="true"
                duration="400"
                className="relative cursor-pointer before:absolute before:bottom-0 before:h-0.5 before:w-0 before:bg-slate-950 before:transition-all before:duration-200 before:hover:w-full"
              >
                Sobre mim
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
