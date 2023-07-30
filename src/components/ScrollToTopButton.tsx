"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed z-20 bottom-4 right-4 sm:mb-10 p-6 md:p-4 bg-slate-900 dark:bg-slate-200 hover:bg-slate-800 dark:hover:bg-slate-300 text-white rounded-full transition-colors"
          aria-label="Scroll to top"
        >
          <ArrowUp className="dark:text-slate-900" />
        </button>
      )}
    </>
  );
};

export default ScrollToTopButton;
