"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionKicker } from "@/components/ui/section-kicker";
import { Reveal } from "@/components/ui/reveal";
import type { Estacio } from "@/types/content";
import { cn } from "@/lib/utils";

export function VisitaVirtual({ estacions }: { estacions: Estacio[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateState = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const max = track.scrollWidth - track.clientWidth;
    const left = track.scrollLeft;
    const p = max > 0 ? left / max : 0;
    setProgress(p);
    setCanPrev(left > 4);
    setCanNext(left < max - 4);

    const cards = Array.from(
      track.querySelectorAll<HTMLElement>("[data-card]"),
    );
    const center = left + track.clientWidth / 2;
    let nearest = 0;
    let nearestDist = Infinity;
    cards.forEach((c, i) => {
      const cardCenter = c.offsetLeft + c.offsetWidth / 2;
      const d = Math.abs(cardCenter - center);
      if (d < nearestDist) {
        nearestDist = d;
        nearest = i;
      }
    });
    setActive(nearest);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    updateState();
    track.addEventListener("scroll", updateState, { passive: true });
    window.addEventListener("resize", updateState);
    return () => {
      track.removeEventListener("scroll", updateState);
      window.removeEventListener("resize", updateState);
    };
  }, [updateState]);

  const scrollBy = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>("[data-card]");
    const step = card ? card.offsetWidth + 24 : track.clientWidth * 0.8;
    track.scrollBy({ left: step * direction, behavior: "smooth" });
  };

  return (
    <section
      id="visita"
      className="relative bg-paper py-24 sm:py-32 lg:py-40"
      aria-labelledby="visita-heading"
    >
      <Container size="xl">
        <div className="flex items-end justify-between gap-8">
          <div>
            <Reveal>
              <SectionKicker>Visita virtual</SectionKicker>
            </Reveal>
            <h2
              id="visita-heading"
              className="mt-4 max-w-2xl font-display text-[clamp(2rem,1.5rem+2vw,3rem)] leading-[1] tracking-tight text-ink"
            >
              <Reveal>Sis estacions per recórrer Segura</Reveal>
            </h2>
          </div>
          <div className="hidden lg:flex items-center gap-6">
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-stone">
              {String(active + 1).padStart(2, "0")} /{" "}
              {String(estacions.length).padStart(2, "0")}
            </span>
            <div className="flex gap-2">
              <ArrowButton
                direction="prev"
                disabled={!canPrev}
                onClick={() => scrollBy(-1)}
              />
              <ArrowButton
                direction="next"
                disabled={!canNext}
                onClick={() => scrollBy(1)}
              />
            </div>
          </div>
        </div>
      </Container>

      <div
        ref={trackRef}
        className={cn(
          "mt-12 flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2",
          "px-6 sm:px-8 lg:px-12",
          "[scrollbar-width:none] [-ms-overflow-style:none]",
          "[&::-webkit-scrollbar]:hidden",
        )}
      >
        {estacions.map((estacio, i) => (
          <EstacioCard
            key={estacio.slug}
            estacio={estacio}
            active={i === active}
            index={i}
          />
        ))}
      </div>

      <Container size="xl" className="mt-8">
        <div className="flex items-center gap-6 lg:hidden">
          <ArrowButton
            direction="prev"
            disabled={!canPrev}
            onClick={() => scrollBy(-1)}
          />
          <div className="relative h-px flex-1 bg-ink/15">
            <div
              className="absolute left-0 top-0 h-px bg-ink transition-[width] duration-200"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
          <ArrowButton
            direction="next"
            disabled={!canNext}
            onClick={() => scrollBy(1)}
          />
        </div>
        <div className="hidden lg:block relative h-px w-full bg-ink/15">
          <div
            className="absolute left-0 top-0 h-px bg-ink transition-[width] duration-200"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </Container>
    </section>
  );
}

function ArrowButton({
  direction,
  disabled,
  onClick,
}: {
  direction: "prev" | "next";
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "prev" ? "Estació anterior" : "Estació següent"}
      className={cn(
        "flex h-12 w-12 items-center justify-center rounded-full border border-ink/15 bg-bone text-ink transition-all duration-300 ease-[var(--ease-out-expo)]",
        "hover:border-ink hover:bg-ink hover:text-bone",
        "disabled:opacity-30 disabled:hover:border-ink/15 disabled:hover:bg-bone disabled:hover:text-ink disabled:cursor-not-allowed",
      )}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        aria-hidden="true"
        className={direction === "prev" ? "rotate-180" : ""}
      >
        <path
          d="M1 7H13M13 7L7 1M13 7L7 13"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

function EstacioCard({
  estacio,
  active,
  index,
}: {
  estacio: Estacio;
  active: boolean;
  index: number;
}) {
  return (
    <article
      data-card
      className={cn(
        "group relative flex-shrink-0 snap-center",
        "w-[85vw] sm:w-[60vw] md:w-[45vw] lg:w-[36vw] xl:w-[30vw]",
        "max-w-[560px] aspect-[4/5]",
      )}
    >
      <Link
        href={`/visita/${estacio.slug}`}
        className="relative block h-full w-full overflow-hidden rounded-sm bg-ink"
      >
        <Image
          src={estacio.imatge}
          alt={estacio.nom}
          fill
          sizes="(min-width: 1280px) 30vw, (min-width: 1024px) 36vw, (min-width: 768px) 45vw, 85vw"
          className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
          <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-bone/70">
            Estació {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-3 font-display text-2xl sm:text-3xl text-bone leading-tight">
            {estacio.nom}
          </h3>
          <p className="mt-2 font-display italic text-sm text-bone/80">
            {estacio.subtitol}
          </p>
        </div>

        <div
          className={cn(
            "absolute right-6 top-6 font-mono text-xs uppercase tracking-[0.18em] transition-opacity",
            active ? "text-bone opacity-100" : "text-bone/0 opacity-0",
          )}
        >
          Veure estació →
        </div>
      </Link>
    </article>
  );
}
