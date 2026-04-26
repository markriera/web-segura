"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionKicker } from "@/components/ui/section-kicker";
import { Reveal } from "@/components/ui/reveal";
import { easeOutExpo } from "@/lib/animations";
import type { Activitat, Epoca } from "@/types/content";
import { cn } from "@/lib/utils";

type Filter = Epoca | "totes";
const FILTERS: Filter[] = ["totes", "primavera", "estiu", "tardor", "hivern"];

export function ActivitatsSection({ activitats }: { activitats: Activitat[] }) {
  const FILTER_LABELS: Record<Filter, string> = {
    totes: "Totes",
    primavera: "Primavera",
    estiu: "Estiu",
    tardor: "Tardor",
    hivern: "Hivern",
  };
  const [filter, setFilter] = useState<Filter>("totes");

  const filtered =
    filter === "totes"
      ? activitats
      : activitats.filter((a) => a.epoca === filter);

  return (
    <section
      id="activitats"
      className="bg-bone py-24 sm:py-32 lg:py-40"
      aria-labelledby="activitats-heading"
    >
      <Container size="xl">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal>
              <SectionKicker>Calendari</SectionKicker>
            </Reveal>
            <h2
              id="activitats-heading"
              className="mt-4 max-w-xl font-display text-[clamp(2rem,1.5rem+2vw,3rem)] leading-[1] tracking-tight text-ink"
            >
              <Reveal>El que passa a Segura</Reveal>
            </h2>
          </div>

          <div className="flex flex-wrap gap-2" role="tablist">
            {FILTERS.map((f) => (
              <button
                key={f}
                role="tab"
                aria-selected={filter === f}
                onClick={() => setFilter(f)}
                className={cn(
                  "rounded-full border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] transition-colors",
                  filter === f
                    ? "border-ink bg-ink text-bone"
                    : "border-ink/15 text-stone hover:border-ink/40 hover:text-ink",
                )}
              >
                {FILTER_LABELS[f]}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          layout
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((act, i) => (
              <motion.article
                layout
                key={act.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.05,
                  ease: easeOutExpo,
                }}
              >
                <Link
                  href={act.linkOverride ?? `/activitats/${act.slug}`}
                  target={
                    act.linkOverride && /^https?:\/\//.test(act.linkOverride)
                      ? "_blank"
                      : undefined
                  }
                  rel={
                    act.linkOverride && /^https?:\/\//.test(act.linkOverride)
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="group block overflow-hidden rounded-sm bg-paper transition-transform duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-paper">
                    {act.imatge && (
                      <Image
                        src={act.imatge}
                        alt=""
                        aria-hidden
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover blur-xl scale-110 opacity-60"
                      />
                    )}
                    <Image
                      src={act.imatge || "/images/placeholders/landscape.svg"}
                      alt={act.nom}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-contain transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <span className="block font-display text-2xl sm:text-[1.75rem] leading-none tracking-tight text-rust">
                      {act.data}
                    </span>
                    <h3 className="mt-4 font-display text-xl text-ink leading-tight">
                      {act.nom}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm text-stone">
                      {act.descripcio}
                    </p>
                  </div>
                </Link>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </Container>
    </section>
  );
}
