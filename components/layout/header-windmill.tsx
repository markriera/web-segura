"use client";

import { useEffect, useRef, useState } from "react";

export function HeaderWindmill({ dark = false }: { dark?: boolean }) {
  const [angle, setAngle] = useState(0);
  const lastY = useRef<number>(0);
  const target = useRef<number>(0);
  const raf = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (typeof window === "undefined") return;
    lastY.current = window.scrollY;

    const tick = () => {
      setAngle((current) => {
        const diff = target.current - current;
        if (Math.abs(diff) < 0.05) return target.current;
        return current + diff * 0.08;
      });
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY.current;
      lastY.current = y;
      target.current += delta * 0.6;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <span
      aria-hidden
      className="inline-block align-middle"
      style={{ width: "26px", height: "44px" }}
    >
      <svg
        viewBox="0 -20 100 160"
        overflow="visible"
        className="h-full w-full"
        style={{
          filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.25))",
        }}
      >
        <g fill={dark ? "#f4efe6" : "#1a1814"}>
          <path d="M48.6 36 L51.4 36 L53.5 138 L46.5 138 Z" />
          <ellipse cx="50" cy="36" rx="3.8" ry="2.2" />
          <g transform={`translate(50 36) rotate(${angle.toFixed(2)})`}>
            <path d="M0 -50 C3.1 -36 2.6 -16 1.5 0 L-1.5 0 C-2.2 -16 -2.6 -36 0 -50 Z" />
            <g transform="rotate(120)">
              <path d="M0 -50 C3.1 -36 2.6 -16 1.5 0 L-1.5 0 C-2.2 -16 -2.6 -36 0 -50 Z" />
            </g>
            <g transform="rotate(-120)">
              <path d="M0 -50 C3.1 -36 2.6 -16 1.5 0 L-1.5 0 C-2.2 -16 -2.6 -36 0 -50 Z" />
            </g>
            <circle cx="0" cy="0" r="3" />
          </g>
        </g>
      </svg>
    </span>
  );
}
