"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface Props {
  frames: [string, string] | string[];
  alt: string;
  className?: string;
  sizes?: string;
}

export function DayNightSequence({
  frames,
  alt,
  className = "",
  sizes = "(min-width: 1024px) 55vw, 100vw",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [day, night] = [frames[0], frames[frames.length - 1]];

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const nightOpacity = useTransform(scrollYProgress, [0.15, 0.85], [0, 1]);

  return (
    <div ref={ref} className={`relative ${className}`}>
      <div className="absolute inset-0">
        <Image
          src={day}
          alt={alt}
          fill
          sizes={sizes}
          priority
          className="object-cover"
        />
      </div>
      <motion.div
        className="absolute inset-0"
        style={{ opacity: nightOpacity, willChange: "opacity" }}
        aria-hidden
      >
        <Image
          src={night}
          alt=""
          fill
          sizes={sizes}
          className="object-cover"
        />
      </motion.div>
    </div>
  );
}
