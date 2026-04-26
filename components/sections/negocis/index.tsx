"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionKicker } from "@/components/ui/section-kicker";
import { Reveal } from "@/components/ui/reveal";
import { easeOutExpo } from "@/lib/animations";
import type { Negoci } from "@/types/content";

export function NegocisSection({ negocis }: { negocis: Negoci[] }) {
  const CATEGORIES: Record<string, string> = {
    allotjament: "Allotjament",
    restauracio: "Restauració",
    serveis: "Serveis",
  };

  return (
    <section
      id="serveis"
      className="bg-paper py-24 sm:py-32 lg:py-40"
      aria-labelledby="negocis-heading"
    >
      <Container size="xl">
        <div className="max-w-2xl">
          <Reveal>
            <SectionKicker>Serveis</SectionKicker>
          </Reveal>
          <h2
            id="negocis-heading"
            className="mt-4 font-display text-[clamp(2rem,1.5rem+2vw,3rem)] leading-[1] tracking-tight text-ink"
          >
            <Reveal>Quedar-se a Segura</Reveal>
          </h2>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {negocis.map((negoci, i) => (
            <motion.article
              key={negoci.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.7,
                delay: (i % 3) * 0.08,
                ease: easeOutExpo,
              }}
              className={i % 5 === 0 ? "lg:row-span-2" : ""}
            >
              <Link
                href={`/negocis/${negoci.slug}`}
                className="group block h-full overflow-hidden rounded-sm bg-bone"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={negoci.imatges[0] ?? "/images/placeholders/portrait.svg"}
                    alt={negoci.nom}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-ink/85 to-transparent p-6 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-y-0">
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-bone/70">
                      {CATEGORIES[negoci.categoria] ?? negoci.categoria}
                    </span>
                    <h3 className="mt-2 font-display text-2xl text-bone leading-tight">
                      {negoci.nom}
                    </h3>
                  </div>
                </div>
                <div className="p-6">
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-rust">
                    {CATEGORIES[negoci.categoria] ?? negoci.categoria}
                  </span>
                  <h3 className="mt-3 font-display text-xl text-ink leading-tight">
                    {negoci.nom}
                  </h3>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}
