import type { Variants, Transition } from "framer-motion";

export const easeOutExpo: Transition["ease"] = [0.16, 1, 0.3, 1];
export const easeInOutQuart: Transition["ease"] = [0.76, 0, 0.24, 1];
export const easeOutSoft: Transition["ease"] = [0.25, 0.46, 0.45, 0.94];

export const durations = {
  fast: 0.2,
  base: 0.4,
  slow: 0.8,
  reveal: 1.2,
} as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: durations.slow, ease: easeOutExpo },
  },
};

export const fade: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: durations.base, ease: easeOutSoft },
  },
};

export const stagger = (delayChildren = 0, staggerChildren = 0.08): Variants => ({
  hidden: {},
  visible: {
    transition: { delayChildren, staggerChildren },
  },
});

export const wordReveal: Variants = {
  hidden: { y: "110%" },
  visible: {
    y: "0%",
    transition: { duration: durations.reveal, ease: easeOutExpo },
  },
};
