"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp } from "@/lib/animations";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  variants?: Variants;
  className?: string;
  once?: boolean;
  amount?: number;
}

export function Reveal({
  children,
  delay = 0,
  variants = fadeUp,
  className,
  once = true,
  amount = 0.3,
}: RevealProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      transition={{ delay }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}
