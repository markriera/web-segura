"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { TextReveal } from "@/components/animations/text-reveal";
import { easeOutExpo } from "@/lib/animations";
import type { Poble } from "@/types/content";

export function Hero({ poble }: { poble: Poble }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-ink"
    >
      <motion.div style={{ y }} className="absolute inset-[-10%]">
        <Image
          src="/images/hero/segura-portada.png"
          alt={`Vista panoràmica de ${poble.nom}`}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-ink/10 to-ink/60" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 flex h-full flex-col justify-end pb-20 sm:pb-28 lg:pb-32"
      >
        <div className="mx-auto w-full max-w-[1440px] px-6 sm:px-8 lg:px-12">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: easeOutExpo }}
            className="font-mono text-xs uppercase tracking-[0.24em] text-bone/80"
          >
            Conca de Barberà · Tarragona
          </motion.p>

          <h1 className="mt-6 font-display text-[clamp(4rem,3rem+8vw,12rem)] leading-[0.92] tracking-tight text-bone">
            <TextReveal text={poble.nom} as="span" />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1, ease: easeOutExpo }}
            className="mt-6 max-w-xl font-display text-lg italic text-bone/85 sm:text-xl"
          >
            {poble.subtitol}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.4, ease: easeOutExpo }}
            className="mt-10 flex items-end justify-between gap-8"
          >
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-bone/70">
              {poble.coordenades.lat}
              <br />
              {poble.coordenades.lon}
            </p>
            <p className="hidden sm:block font-mono text-xs uppercase tracking-[0.18em] text-bone/70 text-right">
              {poble.altitud} m
              <br />
              {poble.habitants} hab.
            </p>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.6 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        aria-hidden="true"
      >
        <motion.span
          animate={{ scaleY: [1, 0.4, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="block h-12 w-px origin-bottom bg-bone/60"
        />
      </motion.div>
    </section>
  );
}
