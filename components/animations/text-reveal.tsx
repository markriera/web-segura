"use client";

import { motion } from "framer-motion";
import { easeOutExpo } from "@/lib/animations";

interface TextRevealProps {
  text: string;
  className?: string;
  wordClassName?: string;
  stagger?: number;
  delay?: number;
  duration?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

export function TextReveal({
  text,
  className,
  wordClassName,
  stagger = 0.08,
  delay = 0,
  duration = 1.2,
  as: Tag = "span",
}: TextRevealProps) {
  const words = text.split(" ");
  const Wrapper = motion[Tag];

  return (
    <Wrapper
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
      variants={{ hidden: {}, visible: {} }}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden align-bottom pr-[0.25em] last:pr-0"
          aria-hidden="true"
        >
          <motion.span
            className={`inline-block ${wordClassName ?? ""}`}
            variants={{
              hidden: { y: "110%" },
              visible: {
                y: "0%",
                transition: { duration, ease: easeOutExpo },
              },
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Wrapper>
  );
}
