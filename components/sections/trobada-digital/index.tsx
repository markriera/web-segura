"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { SectionKicker } from "@/components/ui/section-kicker";
import { Reveal } from "@/components/ui/reveal";
import { easeOutExpo } from "@/lib/animations";
import type { Anunci } from "@/types/content";

export function TrobadaDigital({ anuncis }: { anuncis: Anunci[] }) {
  return (
    <section
      id="trobada"
      className="bg-moss py-24 sm:py-32 lg:py-40 text-bone"
      aria-labelledby="trobada-heading"
    >
      <Container size="xl">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <Reveal>
              <SectionKicker className="text-bone/70 before:bg-bone/40">
                Per als veïns
              </SectionKicker>
            </Reveal>
            <h2
              id="trobada-heading"
              className="mt-4 font-display text-[clamp(2rem,1.5rem+2vw,3rem)] leading-[1] tracking-tight text-bone"
            >
              <Reveal>Punt de trobada digital</Reveal>
            </h2>
          </div>

          <div className="lg:col-span-7">
            <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-bone/60">
              Anuncis i avisos
            </h3>
            <ul className="mt-6 divide-y divide-bone/15 border-y border-bone/15">
              {anuncis.map((anunci, i) => (
                <motion.li
                  key={anunci.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: i * 0.05, ease: easeOutExpo }}
                  className="grid gap-2 py-6 sm:grid-cols-[140px_1fr] sm:gap-8"
                >
                  <time className="font-mono text-xs uppercase tracking-[0.18em] text-bone/60">
                    {anunci.data}
                  </time>
                  <div>
                    <h4 className="font-display text-xl text-bone">
                      {anunci.titol}
                    </h4>
                    <p className="mt-2 text-sm text-bone/80">{anunci.text}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
