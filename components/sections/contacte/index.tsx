"use client";

import { useState } from "react";
import { Container } from "@/components/ui/container";
import { SectionKicker } from "@/components/ui/section-kicker";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import type { Poble } from "@/types/content";

export function ContacteSection({ poble }: { poble: Poble }) {
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  return (
    <section
      id="contacte"
      className="bg-bone py-24 sm:py-32 lg:py-40"
      aria-labelledby="contacte-heading"
    >
      <Container size="xl">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <SectionKicker>Contacte</SectionKicker>
            </Reveal>
            <h2
              id="contacte-heading"
              className="mt-4 font-display text-[clamp(2rem,1.5rem+2vw,3rem)] leading-[1] tracking-tight text-ink"
            >
              <Reveal>Escriu-nos</Reveal>
            </h2>
            <div className="mt-10 space-y-2 text-stone">
              <p className="font-mono text-xs uppercase tracking-[0.18em]">
                Ajuntament de Savallà del Comtat
              </p>
              <p>
                Plaça de l&apos;Església, 1
                <br />
                43425 {poble.municipi}
                <br />
                {poble.comarca}
              </p>
            </div>

            <Map decimal={poble.coordenades.decimal} />
          </div>

          <div className="lg:col-span-7">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setStatus("sent");
              }}
              className="space-y-6"
              aria-label="Escriu-nos"
            >
              <Field label="Nom" name="nom" required />
              <Field label="Correu electrònic" name="email" type="email" required />
              <Field
                label="Missatge"
                name="missatge"
                as="textarea"
                required
              />

              <div className="flex items-center gap-4">
                <Button type="submit">Envia</Button>
                {status === "sent" && (
                  <span className="text-sm text-moss">Gràcies — ho hem rebut.</span>
                )}
              </div>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  as = "input",
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  as?: "input" | "textarea";
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-stone">
        {label}
        {required && <span className="ml-1 text-rust">*</span>}
      </span>
      {as === "textarea" ? (
        <textarea
          name={name}
          required={required}
          rows={5}
          className="mt-2 block w-full resize-none border-b border-ink/20 bg-transparent py-3 text-base text-ink placeholder:text-stone/50 focus:border-ink focus:outline-none"
        />
      ) : (
        <input
          name={name}
          type={type}
          required={required}
          className="mt-2 block w-full border-b border-ink/20 bg-transparent py-3 text-base text-ink placeholder:text-stone/50 focus:border-ink focus:outline-none"
        />
      )}
    </label>
  );
}

function Map({ decimal }: { decimal: { lat: number; lon: number } }) {
  const { lat, lon } = decimal;
  const embedSrc = `https://www.google.com/maps?q=${lat},${lon}&hl=ca&z=15&output=embed`;
  const linkHref = `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`;

  return (
    <figure className="mt-10 w-full max-w-sm">
      <div className="relative aspect-square w-full overflow-hidden rounded-sm border border-ink/15 bg-paper shadow-sm">
        <iframe
          src={embedSrc}
          title="Mapa de Segura"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 h-full w-full grayscale-[0.15] contrast-[0.92] saturate-[0.7]"
          style={{ border: 0 }}
        />
      </div>
      <figcaption className="mt-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-stone">
        <span>
          {lat.toFixed(4)}°N · {lon.toFixed(4)}°E
        </span>
        <a
          href={linkHref}
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-stone/40 hover:decoration-ink hover:text-ink transition-colors"
        >
          Obre al Maps ↗
        </a>
      </figcaption>
    </figure>
  );
}
