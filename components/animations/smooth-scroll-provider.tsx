"use client";

import { useEffect, type ReactNode } from "react";

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(max-width: 768px)").matches) return;

    let lenis: { destroy: () => void; raf: (t: number) => void } | null = null;
    let frame: number | undefined;
    let cancelled = false;

    (async () => {
      const { default: Lenis } = await import("lenis");
      if (cancelled) return;

      const instance = new Lenis({
        lerp: 0.1,
        wheelMultiplier: 1,
        smoothWheel: true,
      });
      lenis = instance;
      (window as unknown as { __lenis?: unknown }).__lenis = instance;

      const raf = (time: number) => {
        instance.raf(time);
        frame = requestAnimationFrame(raf);
      };
      frame = requestAnimationFrame(raf);
    })();

    return () => {
      cancelled = true;
      if (frame !== undefined) cancelAnimationFrame(frame);
      lenis?.destroy();
      delete (window as unknown as { __lenis?: unknown }).__lenis;
    };
  }, []);

  return <>{children}</>;
}
