"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { SectionKicker } from "@/components/ui/section-kicker";
import { Reveal } from "@/components/ui/reveal";
import { CountUp } from "@/components/animations/count-up";
import { ParallaxImage } from "@/components/ui/parallax-image";
import { DayNightSequence } from "@/components/animations/day-night-sequence";
import { easeOutExpo } from "@/lib/animations";
import type { Poble } from "@/types/content";

export function PobleSection({ poble }: { poble: Poble }) {
  return (
    <section
      id="poble"
      className="relative bg-bone py-24 sm:py-32 lg:py-40"
      aria-labelledby="poble-heading"
    >
      <Container size="xl">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start">
            <Reveal>
              <SectionKicker>El poble</SectionKicker>
            </Reveal>
            <h2
              id="poble-heading"
              className="mt-6 font-display text-[clamp(2.5rem,2rem+2vw,3.75rem)] leading-[0.98] tracking-tight text-ink"
            >
              <Reveal>Pedra, vent i memòria</Reveal>
            </h2>

            <dl className="mt-16 grid grid-cols-2 gap-6 border-t border-ink/10 pt-8">
              <Stat label="Habitants" value={<CountUp to={poble.habitants} />} suffix="" />
              <Stat label="Altitud" value={<CountUp to={poble.altitud} />} suffix="m" />
            </dl>
          </div>

          <div className="lg:col-span-7">
            <Reveal>
              <DayNightSequence
                frames={[
                  "/images/poble/dia-nit/1.jpg",
                  "/images/poble/dia-nit/4.jpg",
                ]}
                alt={`Carrer del nucli antic de ${poble.nom}`}
                className="aspect-[4/5] w-full overflow-hidden rounded-sm bg-ink"
                sizes="(min-width: 1024px) 55vw, 100vw"
              />
            </Reveal>

            <div className="mt-12 space-y-10">
              {poble.historia.map((bloc, i) => (
                <motion.article
                  key={bloc.titol}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8, delay: i * 0.1, ease: easeOutExpo }}
                  className="max-w-xl"
                >
                  <h3 className="font-display text-2xl text-ink">{bloc.titol}</h3>
                  <p className="mt-3 text-base leading-relaxed text-stone">
                    {bloc.text}
                  </p>
                </motion.article>
              ))}
            </div>

            <Reveal className="mt-16">
              <ol className="grid gap-px overflow-hidden rounded-sm bg-ink/10 sm:grid-cols-2">
                {poble.fitesHistoriques.map((f) => (
                  <li
                    key={f.any}
                    className="flex items-baseline gap-4 bg-bone p-6"
                  >
                    <span className="font-mono text-xs uppercase tracking-[0.18em] text-rust">
                      {f.any}
                    </span>
                    <span className="text-sm text-ink">{f.fet}</span>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Stat({
  label,
  value,
  suffix,
}: {
  label: string;
  value: React.ReactNode;
  suffix: string;
}) {
  return (
    <div>
      <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-stone">
        {label}
      </dt>
      <dd className="mt-2 font-display text-3xl text-ink">
        {value}
        {suffix && <span className="ml-1 text-base text-stone">{suffix}</span>}
      </dd>
    </div>
  );
}
