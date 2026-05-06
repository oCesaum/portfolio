"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

interface ProjectThumbnailProps {
  src: string;
  alt: string;
  priority?: boolean;
  aspect?: "16/10" | "4/3";
  sizes?: string;
}

export default function ProjectThumbnail({
  src,
  alt,
  priority = false,
  aspect = "16/10",
  sizes = "(min-width: 1024px) 320px, 100vw",
}: ProjectThumbnailProps) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const img = imgRef.current;
    if (!wrap || !img) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let active = false;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) active = e.isIntersecting;
      },
      { rootMargin: "200px 0px" },
    );
    io.observe(wrap);

    let raf = 0;
    const tick = () => {
      if (active) {
        const rect = wrap.getBoundingClientRect();
        const vh = window.innerHeight;
        const progress = (rect.top + rect.height / 2 - vh / 2) / vh;
        const py = Math.max(-12, Math.min(12, -progress * 12));
        img.style.transform = `translate3d(0, ${py.toFixed(2)}px, 0) scale(1.06)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      img.style.transform = "";
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="relative overflow-hidden bg-[var(--color-background-sunken)]"
      style={{ aspectRatio: aspect }}
    >
      <div ref={imgRef} className="absolute inset-0" style={{ willChange: "transform" }}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover"
        />
      </div>
    </div>
  );
}
