"use client";

import { useState } from "react";
import { Link } from "react-scroll";
import DarkModeButton from "./DarkModeButton";

const Navbar = () => {
  const [handleActivateMobileMenu, setHandleActivateMobileMenu] =
    useState(false);

  return (
    <div className="flex items-center justify-center gap-5">
      <nav>
        <ul className="hidden items-center gap-16 lg:flex">
          <li>
            <Link
              to="projects"
              smooth="true"
              duration={500}
              className="relative cursor-pointer before:absolute before:bottom-0 before:h-0.5 before:w-0 before:bg-slate-950 dark:before:bg-slate-200 before:transition-all before:duration-200 before:hover:w-full inline-block pt-[1px]"
            >
              Projetos
            </Link>
          </li>
          <li>
            <Link
              to="technologies"
              smooth="true"
              duration="400"
              className="relative cursor-pointer before:absolute before:bottom-0 before:h-0.5 before:w-0 before:bg-slate-950 dark:before:bg-slate-200 before:transition-all before:duration-200 before:hover:w-full inline-block pt-[1px]"
            >
              Tecnologias
            </Link>
          </li>
          <li>
            <Link
              to="about"
              smooth="true"
              duration="400"
              className="relative cursor-pointer before:absolute before:bottom-0 before:h-0.5 before:w-0 before:bg-slate-950 dark:before:bg-slate-200 before:transition-all before:duration-200 before:hover:w-full inline-block pt-[1px]"
            >
              Sobre mim
            </Link>
          </li>
        </ul>
      </nav>
      <button
        aria-label="Ativar e desativar menu mobile"
        onClick={() => setHandleActivateMobileMenu(!handleActivateMobileMenu)}
        className="relative border-t-2 border-t-slate-950 dark:border-t-slate-200 after:-translate-y-full lg:hidden h-4 w-6 after:w-6 after:h-0.5 after:bg-slate-950 dark:after:bg-slate-200 after:block after:absolute after:top-1/2 before:w-6 before:h-0.5 before:bg-slate-950 dark:before:bg-slate-200 before:block before:absolute before:bottom-0 transition-transform duration-500"
      ></button>
      <div
        className={`fixed right-0 top-0 z-30 h-screen w-fit shadow-lg cursor-default bg-slate-100 dark:bg-slate-900 px-10 py-5 transition-all duration-300 ease-in lg:hidden ${
          handleActivateMobileMenu ? "" : "translate-x-[110%]"
        }`}
      >
        <nav>
          <button
            aria-label="Ativar e desativar menu mobile"
            onClick={() =>
              setHandleActivateMobileMenu(!handleActivateMobileMenu)
            }
            className="fixed right-6 top-6 before:rotate-[135deg] after:-rotate-[135deg] before:top-[0.35rem] after:-translate-y-full z-40 lg:hidden h-4 w-6 after:w-6 after:h-0.5 after:bg-slate-950 dark:after:bg-slate-200 after:block after:absolute after:top-1/2 before:w-6 before:h-0.5 before:bg-slate-950 dark:before:bg-slate-200 before:block before:absolute before:bottom-0 transition-transform duration-500"
          ></button>
          <ul className="flex flex-col items-center gap-16">
            <li>
              <Link
                to="projects"
                smooth="true"
                duration="400"
                className="relative cursor-pointer before:absolute before:bottom-0 before:h-0.5 before:w-0 before:bg-slate-950 dark:before:bg-slate-200 before:transition-all before:duration-200 before:hover:w-full inline-block pt-[1px]"
              >
                Projetos
              </Link>
            </li>
            <li>
              <Link
                to="technologies"
                smooth="true"
                duration="400"
                className="relative cursor-pointer before:absolute before:bottom-0 before:h-0.5 before:w-0 before:bg-slate-950 dark:before:bg-slate-200 before:transition-all before:duration-200 before:hover:w-full inline-block pt-[1px]"
              >
                Tecnologias
              </Link>
            </li>
            <li>
              <Link
                to="about"
                smooth="true"
                duration="400"
                className="relative cursor-pointer before:absolute before:bottom-0 before:h-0.5 before:w-0 before:bg-slate-950 dark:before:bg-slate-200 before:transition-all before:duration-200 before:hover:w-full inline-block pt-[1px]"
              >
                Sobre mim
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <DarkModeButton />
    </div>
  );
};

export default Navbar;
