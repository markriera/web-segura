import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionKicker } from "@/components/ui/section-kicker";

export function FestaMajorBanner() {
  return (
    <section
      id="festa-major"
      className="bg-paper py-16 sm:py-20"
      aria-labelledby="festa-major-heading"
    >
      <Container size="lg">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="lg:max-w-2xl">
            <SectionKicker className="text-rust before:bg-rust/60">
              FM·26 · Pròximament
            </SectionKicker>
            <h2
              id="festa-major-heading"
              className="mt-5 leading-[0.88] tracking-tight uppercase text-ink"
              style={{
                fontFamily: "var(--font-poster)",
                fontSize: "clamp(2.25rem, 1.6rem + 3vw, 4rem)",
              }}
            >
              Festa Major{" "}
              <em
                className="not-italic"
                style={{
                  fontFamily: "var(--font-display)",
                  fontStyle: "italic",
                  fontWeight: 300,
                  color: "var(--color-rust)",
                }}
              >
                de
              </em>{" "}
              Segura{" "}
              <span style={{ color: "var(--color-rust)" }}>2026</span>
            </h2>
          </div>

          <div className="flex flex-col gap-5 lg:items-end">
            <dl className="flex flex-wrap items-baseline gap-x-6 gap-y-2 font-mono text-xs uppercase tracking-[0.2em] text-stone">
              <div className="flex items-baseline gap-2">
                <dt className="sr-only">Dates</dt>
                <dd className="font-display text-2xl normal-case tracking-normal text-ink leading-none">
                  22<span className="text-rust">·</span>23
                  <span className="text-rust">·</span>24
                </dd>
                <span>maig</span>
              </div>
              <div className="flex items-baseline gap-2">
                <dt className="sr-only">Edició</dt>
                <dd className="font-display text-2xl normal-case tracking-normal text-ink leading-none">
                  XXVI
                </dd>
                <span>edició</span>
              </div>
              <div className="flex items-baseline gap-2">
                <dt className="sr-only">Entrada</dt>
                <dd className="font-display italic text-xl normal-case tracking-normal text-rust leading-none">
                  Gratuït
                </dd>
              </div>
            </dl>

            <Link
              href="/festa-major"
              className="group inline-flex h-12 items-center gap-3 rounded-full bg-ink px-7 text-xs font-semibold uppercase tracking-[0.22em] text-bone shadow-sm hover:bg-rust transition-colors"
            >
              Veure el programa
              <span
                aria-hidden
                className="transition-transform group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
