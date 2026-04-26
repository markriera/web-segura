"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";

export function NightShift({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const brightness = useTransform(scrollYProgress, [0, 0.4, 1], [1, 0.78, 0.32]);
  const saturate = useTransform(scrollYProgress, [0, 0.4, 1], [1, 0.95, 0.55]);
  const hue = useTransform(scrollYProgress, [0, 1], [0, -18]);
  const overlayOpacity = useTransform(
    scrollYProgress,
    [0, 0.35, 1],
    [0, 0.18, 0.7],
  );

  const filter = useMotionTemplate`brightness(${brightness}) saturate(${saturate}) hue-rotate(${hue}deg)`;

  return (
    <div ref={ref} className={`relative ${className}`}>
      <motion.div style={{ filter, willChange: "filter" }}>
        {children}
      </motion.div>
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-sm"
        style={{
          opacity: overlayOpacity,
          background:
            "linear-gradient(180deg, rgba(8,24,43,0.95) 0%, rgba(20,37,55,0.7) 60%, rgba(40,30,55,0.4) 100%)",
          mixBlendMode: "multiply",
        }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-sm"
        style={{
          opacity: overlayOpacity,
          background:
            "radial-gradient(circle at 80% 12%, rgba(244,233,214,0.18), transparent 28%)",
          mixBlendMode: "screen",
        }}
      />
    </div>
  );
}
