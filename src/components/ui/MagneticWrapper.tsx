"use client";

import { useRef, useEffect, type ReactNode } from "react";

interface MagneticWrapperProps {
  children: ReactNode;
  radius?: number;
  damping?: number;
  className?: string;
}

export default function MagneticWrapper({
  children,
  radius = 80,
  damping = 0.14,
  className,
}: MagneticWrapperProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let raf = 0;
    let target = { x: 0, y: 0 };
    let current = { x: 0, y: 0 };

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      if (dist < radius) {
        target = { x: dx * 0.18, y: dy * 0.18 };
      } else {
        target = { x: 0, y: 0 };
      }
    };

    const tick = () => {
      current.x += (target.x - current.x) * damping;
      current.y += (target.y - current.y) * damping;
      el.style.transform = `translate3d(${current.x.toFixed(2)}px, ${current.y.toFixed(2)}px, 0)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      el.style.transform = "";
    };
  }, [radius, damping]);

  return (
    <div ref={ref} className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}
