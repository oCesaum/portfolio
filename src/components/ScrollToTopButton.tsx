"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed z-50 bottom-24 right-6 p-3 bg-slate-900 dark:bg-slate-200 hover:bg-slate-800 dark:hover:bg-slate-300 text-white rounded-full transition-all duration-300 hover:scale-110 shadow-lg"
          aria-label="Scroll to top"
        >
          <ArrowUp className="dark:text-slate-900" />
        </button>
      )}
    </>
  );
};

export default ScrollToTopButton;
