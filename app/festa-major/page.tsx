import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Festa Major 2026 · 22-23-24 de maig",
  description:
    "Tres dies de festa, truita, rom cremat i ball fins que surti el sol. El programa complet de la Festa Major de Segura 2026.",
  openGraph: {
    title: "Festa Major de Segura · 22-23-24 maig 2026",
    description:
      "Tres dies de festa, truita, rom cremat i ball fins que surti el sol.",
    type: "article",
  },
};

type Acte = {
  hora: string;
  titol: string;
  descripcio?: string;
  lloc?: string;
  destacat?: boolean;
};

const DIVENDRES: Acte[] = [
  {
    hora: "20:00",
    titol: "Joan Uroz",
    descripcio:
      "Presentació de «La Cuina Xarnega · Dos pobles en 146 plats», conversa amb l'autor i tast de plats del llibre.",
    lloc: "Al cafè",
  },
  {
    hora: "21:00",
    titol: "Concurs de truites",
    descripcio:
      "Els participants porten la truita feta de casa. Jurat popular: si vols mossegar, vine d'hora.",
    lloc: "Al cafè · entrega de premis diumenge",
    destacat: true,
  },
  {
    hora: "22:00",
    titol: "Havaneres + rom cremat",
    descripcio:
      "Veus de mar a la plaça. La crema blava il·lumina les façanes. Porta tassa o se't dóna.",
    lloc: "Plaça major",
  },
];

const DISSABTE: Acte[] = [
  {
    hora: "10:00",
    titol: "SeguraRoom · Inflables",
    descripcio:
      "Joc de pistes per grans i petits. L'objectiu: trobar la clau del cafè per poder dinar. Inflables tot el dia.",
    lloc: "Pels carrers",
  },
  {
    hora: "14:00",
    titol: "Dinar popular",
    descripcio:
      "A la plaça del Pi. Taules llargues, ombra, vi del país, sobretaula sense pressa.",
    lloc: "Plaça del Pi",
    destacat: true,
  },
  {
    hora: "16:00",
    titol: "Bingo musical",
    descripcio: "Canta, balla, marca cartró. Premis del poble.",
    lloc: "Cafè",
  },
  {
    hora: "18:00",
    titol: "Berreta · Arquetes · Gitanes",
    descripcio:
      "Cultura popular catalana en directe. Cintes de colors, cançons que sabem de sempre.",
    lloc: "Plaça major",
  },
  {
    hora: "19:00",
    titol: "Cocs a peu dret",
    descripcio: "Ball amb cocs de recapte: una mossegada, un gir.",
    lloc: "Plaça",
  },
  {
    hora: "22:00",
    titol: "Karaoke / Discoteca",
    descripcio: "Fins que el cafè aguanti. No prometem res; ho vivim.",
    lloc: "Cafè",
    destacat: true,
  },
];

const DIUMENGE: Acte[] = [
  { hora: "10:00", titol: "Missa", lloc: "Església" },
  {
    hora: "12:00",
    titol: "Olimpíades rurals",
    descripcio:
      "Cursa d'obstacles per equips, pinyata final. Es premia la imaginació i la resistència.",
    lloc: "Plaça major",
    destacat: true,
  },
  {
    hora: "13:00",
    titol: "Record Xavi Casanelles",
    descripcio:
      "Inauguració de la placa. Vermut al cafè. Presentació del nou escut del poble dissenyat per en Salvador. Entrega de premis del concurs de truites i de fotografia.",
    lloc: "Cafè · plaça",
  },
  {
    hora: "14:00",
    titol: "Fi de la Festa Major 2026",
    descripcio: "Ens veiem l'any que ve. Si pot ser, més forts.",
  },
];

const HEADLINERS = [
  {
    titol: "Havaneres",
    quan: "Dv 22:00",
    img: "/images/festa-major/havaneres.jpg",
    accent: "vermell" as const,
  },
  {
    titol: "Rom cremat",
    quan: "Dv 22:00",
    img: "/images/festa-major/rom-cremat.jpg",
    accent: "terracotta" as const,
  },
  {
    titol: "Truites",
    quan: "Dv 21:00",
    img: "/images/festa-major/truites.png",
    accent: "blau" as const,
  },
  {
    titol: "Gitanes",
    quan: "Ds 18:00",
    img: "/images/festa-major/gitanes.jpg",
    accent: "terracotta" as const,
  },
  {
    titol: "Cocs a peu dret",
    quan: "Ds 19:00",
    img: "/images/festa-major/cocs.jpg",
    accent: "blau" as const,
  },
  {
    titol: "SeguraRoom",
    quan: "Ds 10:00",
    img: "/images/festa-major/seguraroom-poster.png",
    accent: "vermell" as const,
  },
  {
    titol: "Berreta",
    quan: "Ds 18:00",
    img: "/images/festa-major/berreta.jpg",
    accent: "blau" as const,
  },
];

const ACCENT_BG: Record<"vermell" | "terracotta" | "blau", string> = {
  vermell: "var(--color-fm-vermell)",
  terracotta: "var(--color-fm-terracotta)",
  blau: "var(--color-fm-blau-deep)",
};

const INGREDIENTS: [string, string][] = [
  ["Rom blanc", "1 l"],
  ["Sucre moreno", "250 g"],
  ["Pell de llimona", "1"],
  ["Pell de taronja", "1"],
  ["Canyella en branca", "2"],
  ["Cafè acabat de fer", "1 tassa"],
  ["Gra de cafè", "una mà"],
];

const METODE = [
  "Posa el rom, el sucre, les pells i la canyella en una cassola de fang.",
  "Encén una llumeta i acosta-la a la superfície. Que pugi una flama blava.",
  "Remou amb un cullerot, alçant el líquid en cascada. Mira el foc, no parlis gaire.",
  "Afegeix els grans de cafè un a un. Continua remenant.",
  "Quan la flama s'apagui, aboca la tassa de cafè calent. Serveix.",
];

function Moli({
  variant = "terra",
  className = "",
}: {
  variant?: "terra" | "ocre" | "vermell" | "cream";
  className?: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/images/festa-major/moli-${variant}.svg`}
      alt=""
      aria-hidden
      className={`inline-block h-[1.1em] w-[0.8em] align-[-0.28em] ${className}`}
    />
  );
}

function Ribbon({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.22em]"
      style={{ color: "var(--color-fm-ocre)" }}
    >
      {children}
    </span>
  );
}

function DiaBlock({
  numero,
  data,
  diaCurta,
  diaLlarga,
  llema,
  acts,
  bg,
}: {
  numero: string;
  data: string;
  diaCurta: string;
  diaLlarga: string;
  llema: string;
  acts: Acte[];
  bg: "blau" | "terra" | "vermell";
}) {
  const heroBg =
    bg === "blau"
      ? "var(--color-fm-blau-deep)"
      : bg === "terra"
        ? "var(--color-fm-terracotta)"
        : "var(--color-fm-vermell)";

  return (
    <article
      className="overflow-hidden rounded-sm"
      style={{ backgroundColor: "var(--color-fm-crema)" }}
    >
      <header
        className="px-6 sm:px-10 pt-8 pb-5"
        style={{ backgroundColor: heroBg, color: "var(--color-fm-crema)" }}
      >
        <div className="flex justify-between items-baseline gap-4 mb-3">
          <span
            className="font-mono text-[10px] uppercase tracking-[0.22em]"
            style={{ color: "var(--color-fm-ocre)" }}
          >
            <Moli variant="ocre" /> Dia {numero} / 03 · {data}
          </span>
          <span
            className="font-mono text-[10px] uppercase tracking-[0.22em] hidden sm:inline"
            style={{ color: "var(--color-fm-ocre)" }}
          >
            {diaCurta}
          </span>
        </div>
        <h3
          className="uppercase leading-[0.86] tracking-tight"
          style={{
            fontFamily: "var(--font-poster)",
            fontSize: "clamp(3rem, 2rem + 6vw, 7rem)",
            color: bg === "blau" ? "var(--color-fm-ocre)" : "var(--color-fm-crema)",
          }}
        >
          {diaLlarga}
        </h3>
        <p
          className="mt-3 text-base sm:text-lg italic"
          style={{
            fontFamily: "var(--font-display)",
            color: "rgba(244,233,214,0.85)",
          }}
        >
          «{llema}»
        </p>
      </header>

      <ol
        className="px-6 sm:px-10 py-8 sm:py-10 space-y-px"
        style={{ color: "var(--color-fm-blau-deep)" }}
      >
        {acts.map((a) => (
          <li
            key={`${numero}-${a.hora}-${a.titol}`}
            className="grid grid-cols-[60px_1fr] sm:grid-cols-[80px_1fr] gap-4 sm:gap-6 py-5 border-t"
            style={{
              borderColor: "rgba(8,24,43,0.12)",
              backgroundColor: a.destacat
                ? "rgba(194,73,20,0.07)"
                : "transparent",
              marginInline: a.destacat ? "-1rem" : "0",
              paddingInline: a.destacat ? "1rem" : "0",
              borderRadius: a.destacat ? "2px" : "0",
            }}
          >
            <span
              className="font-mono text-xs sm:text-sm font-bold tracking-tight pt-1"
              style={{ color: "var(--color-fm-terracotta)" }}
            >
              {a.hora}
            </span>
            <div className="min-w-0">
              <h4
                className="uppercase tracking-tight leading-[0.95]"
                style={{
                  fontFamily: "var(--font-poster)",
                  fontSize: "clamp(1.5rem, 1.2rem + 1vw, 2.25rem)",
                  color: a.destacat
                    ? "var(--color-fm-vermell)"
                    : "var(--color-fm-blau-deep)",
                }}
              >
                {a.titol}
              </h4>
              {a.descripcio && (
                <p
                  className="mt-2 text-sm sm:text-base italic leading-relaxed"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "rgba(8,24,43,0.85)",
                  }}
                >
                  {a.descripcio}
                </p>
              )}
              {a.lloc && (
                <span
                  className="mt-3 inline-block font-mono text-[10px] uppercase tracking-[0.22em]"
                  style={{ color: "var(--color-fm-terracotta)" }}
                >
                  — {a.lloc}
                </span>
              )}
            </div>
          </li>
        ))}
      </ol>
    </article>
  );
}

export default function FestaMajorPage() {
  return (
    <article
      style={{ backgroundColor: "var(--color-fm-blau-deep)" }}
      className="pt-28 pb-24"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-10">
        {/* Back link */}
        <Link
          href="/"
          className="font-mono text-xs uppercase tracking-[0.22em]"
          style={{ color: "var(--color-fm-ocre)" }}
        >
          ← Inici
        </Link>

        {/* HERO — cartell-style */}
        <header
          className="mt-8 overflow-hidden rounded-sm relative"
          style={{ backgroundColor: "var(--color-fm-crema)" }}
        >
          {/* topbar */}
          <div
            className="flex items-center justify-between px-5 sm:px-8 py-3 border-b-2"
            style={{
              backgroundColor: "var(--color-fm-blau-deep)",
              borderColor: "var(--color-fm-blau-deep)",
              color: "var(--color-fm-crema)",
            }}
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] flex items-center gap-2">
              <span
                className="inline-block h-2 w-2 rounded-full animate-pulse"
                style={{ backgroundColor: "var(--color-fm-vermell)" }}
              />
              Ajuntament de Segura · Comissió de Festes
            </span>
            <span
              className="font-mono text-[10px] uppercase tracking-[0.22em]"
              style={{ color: "var(--color-fm-ocre)" }}
            >
              Vol. XXVI · Llibret
            </span>
          </div>

          {/* title block */}
          <div className="px-6 sm:px-10 lg:px-14 pt-10 sm:pt-14 pb-8">
            <h1
              className="uppercase leading-[0.84] tracking-[-0.015em]"
              style={{
                fontFamily: "var(--font-poster)",
                fontSize: "clamp(3.5rem, 2.5rem + 8vw, 10rem)",
              }}
            >
              <span style={{ color: "var(--color-fm-terracotta)" }}>Festa</span>
              <br />
              <span style={{ color: "var(--color-fm-blau)" }}>
                Major{" "}
                <em
                  className="not-italic"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontStyle: "italic",
                    fontWeight: 300,
                    color: "var(--color-fm-blau-deep)",
                    fontSize: "0.9em",
                  }}
                >
                  de
                </em>
              </span>
              <br />
              <span style={{ color: "var(--color-fm-terracotta)" }}>
                Segura
              </span>{" "}
              <span style={{ color: "var(--color-fm-vermell)" }}>2026</span>
            </h1>

            {/* meta strip */}
            <div
              className="mt-8 sm:mt-10 grid gap-6 sm:grid-cols-[auto_1fr_auto] items-end border-t-2 border-b-2 py-4 sm:py-5"
              style={{ borderColor: "var(--color-fm-blau-deep)" }}
            >
              <div
                className="uppercase leading-[0.86]"
                style={{
                  fontFamily: "var(--font-poster)",
                  fontSize: "clamp(2.5rem, 2rem + 3vw, 4.5rem)",
                  color: "var(--color-fm-blau-deep)",
                }}
              >
                22<span style={{ color: "var(--color-fm-vermell)" }}>·</span>23
                <span style={{ color: "var(--color-fm-vermell)" }}>·</span>24
              </div>
              <div
                className="italic text-base sm:text-lg pb-1"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--color-fm-terracotta)",
                }}
              >
                — maig —
              </div>
              <div className="text-right font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.22em] leading-relaxed">
                <span
                  className="block"
                  style={{
                    fontFamily: "var(--font-poster)",
                    fontSize: "16px",
                    letterSpacing: "0.04em",
                    color: "var(--color-fm-blau-deep)",
                  }}
                >
                  Segura
                </span>
                <span style={{ color: "var(--color-fm-blau-deep)" }}>
                  Conca de Barberà
                  <br />
                  Catalunya
                </span>
              </div>
            </div>

            {/* tagline */}
            <p
              className="mt-8 italic leading-[1.05]"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 300,
                fontSize: "clamp(1.4rem, 1rem + 1.6vw, 2.4rem)",
                color: "var(--color-fm-blau-deep)",
                letterSpacing: "-0.015em",
              }}
            >
              Tres dies de{" "}
              <strong
                className="not-italic uppercase"
                style={{
                  fontFamily: "var(--font-poster)",
                  fontWeight: 400,
                  color: "var(--color-fm-vermell)",
                }}
              >
                festa
              </strong>
              , truita, rom cremat
              <br />i ball fins que{" "}
              <strong
                className="not-italic uppercase"
                style={{
                  fontFamily: "var(--font-poster)",
                  fontWeight: 400,
                  color: "var(--color-fm-vermell)",
                }}
              >
                surti el sol
              </strong>
              .
            </p>

            {/* photos rotated */}
            <div className="mt-10 grid grid-cols-3 gap-3 sm:gap-5">
              {[
                {
                  src: "/images/festa-major/seguraroom-poster.png",
                  rot: "-2deg",
                },
                {
                  src: "/images/festa-major/gitanes.jpg",
                  rot: "0deg",
                },
                {
                  src: "/images/festa-major/rom-cremat.jpg",
                  rot: "2deg",
                },
              ].map(({ src, rot }) => (
                <div
                  key={src}
                  className="relative aspect-[3/4] overflow-hidden border-2"
                  style={{
                    borderColor: "var(--color-fm-blau-deep)",
                    boxShadow: "5px 5px 0 var(--color-fm-blau-deep)",
                    transform: `rotate(${rot})`,
                  }}
                >
                  <Image
                    src={src}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 25vw, 33vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* foot strip */}
          <div
            className="px-5 sm:px-8 py-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em]"
            style={{
              backgroundColor: "var(--color-fm-terracotta)",
              color: "var(--color-fm-crema)",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-poster)",
                letterSpacing: "0.06em",
                fontSize: "14px",
                color: "var(--color-fm-blau-deep)",
              }}
            >
              FM·26
            </span>
            <span className="hidden sm:inline">#fmsegura2026</span>
            <span>Edició XXVI · Gratuït</span>
          </div>
        </header>

        {/* TRES DIES SUMMARY */}
        <section className="mt-10">
          <div
            className="rounded-sm p-8 sm:p-12"
            style={{ backgroundColor: "var(--color-fm-blau)" }}
          >
            <Ribbon>
              <Moli variant="ocre" /> En tres dies
            </Ribbon>
            <h2
              className="mt-4 uppercase leading-[0.86]"
              style={{
                fontFamily: "var(--font-poster)",
                fontSize: "clamp(3rem, 2.5rem + 4vw, 6rem)",
                color: "var(--color-fm-ocre)",
              }}
            >
              3
              <em
                className="not-italic"
                style={{
                  fontFamily: "var(--font-display)",
                  fontStyle: "italic",
                  fontWeight: 300,
                  color: "var(--color-fm-crema)",
                  fontSize: "0.55em",
                }}
              >
                {" "}
                dies per{" "}
              </em>
              recordar
            </h2>
            <div
              className="mt-8 grid gap-6 md:grid-cols-3 text-base leading-relaxed"
              style={{
                fontFamily: "var(--font-display)",
                color: "rgba(244,233,214,0.92)",
              }}
            >
              <p>
                <strong
                  className="uppercase"
                  style={{
                    fontFamily: "var(--font-poster)",
                    fontWeight: 400,
                    color: "var(--color-fm-ocre)",
                  }}
                >
                  Divendres 22
                </strong>{" "}
                obrim amb Joan Uroz presentant el seu llibre, seguim amb el
                concurs de truites al cafè i tanquem amb havaneres i rom cremat
                a la plaça. Foc blau, veus rondes, primer dia.
              </p>
              <p>
                <strong
                  className="uppercase"
                  style={{
                    fontFamily: "var(--font-poster)",
                    fontWeight: 400,
                    color: "var(--color-fm-ocre)",
                  }}
                >
                  Dissabte 23
                </strong>{" "}
                és el dia gran. SeguraRoom al matí, dinar popular a la plaça
                del Pi, bingo musical, els grups de cultura popular —berreta,
                arquetes, gitanes—, cocs a peu dret i karaoke fins on arribi.
              </p>
              <p>
                <strong
                  className="uppercase"
                  style={{
                    fontFamily: "var(--font-poster)",
                    fontWeight: 400,
                    color: "var(--color-fm-ocre)",
                  }}
                >
                  Diumenge 24
                </strong>{" "}
                tanquem amb missa, olimpíades rurals, vermut i la inauguració
                de la placa Xavi Casanelles. També presentem el nou escut del
                poble dissenyat per en Salvador.
              </p>
            </div>
            <p
              className="mt-8 uppercase leading-[1.1]"
              style={{
                fontFamily: "var(--font-poster)",
                fontSize: "clamp(1.6rem, 1.2rem + 1.5vw, 2.4rem)",
                color: "var(--color-fm-vermell)",
              }}
            >
              <Moli variant="vermell" /> Tot gratuït.{" "}
              <Moli variant="vermell" /> Tot al carrer.{" "}
              <Moli variant="vermell" /> Tot per tothom.
            </p>
          </div>
        </section>

        {/* DAYS */}
        <section className="mt-10 grid gap-6">
          <DiaBlock
            numero="01"
            data="22 maig"
            diaCurta="Vespre · Nit"
            diaLlarga="Divendres"
            llema="El primer foc encén tota la festa."
            acts={DIVENDRES}
            bg="blau"
          />
          <DiaBlock
            numero="02"
            data="23 maig"
            diaCurta="Matí → Matinada"
            diaLlarga="Dissabte"
            llema="El dia gran. No te'n vagis a casa."
            acts={DISSABTE}
            bg="terra"
          />
          <DiaBlock
            numero="03"
            data="24 maig"
            diaCurta="Fins que el cos aguanti"
            diaLlarga="Diumenge"
            llema="Acabem com vam començar: tots a la plaça."
            acts={DIUMENGE}
            bg="vermell"
          />
        </section>

        {/* HEADLINERS GRID — like the cartell page */}
        <section
          className="mt-10 rounded-sm p-8 sm:p-12"
          style={{ backgroundColor: "var(--color-fm-crema)" }}
        >
          <Ribbon>
            <span style={{ color: "var(--color-fm-terracotta)" }}>
              — Headliners 2026 —
            </span>
          </Ribbon>
          <h2
            className="mt-4 uppercase leading-[0.86]"
            style={{
              fontFamily: "var(--font-poster)",
              fontSize: "clamp(2.5rem, 2rem + 3vw, 5rem)",
              color: "var(--color-fm-blau)",
            }}
          >
            El{" "}
            <em
              className="not-italic"
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontWeight: 300,
                color: "var(--color-fm-terracotta)",
              }}
            >
              cartell
            </em>{" "}
            sencer
          </h2>
          <div
            className="mt-8 grid gap-3 sm:gap-4"
            style={{
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            }}
          >
            {HEADLINERS.map((h, i) => (
              <article
                key={h.titol}
                className={`group overflow-hidden flex flex-col border-2 ${
                  i === 0 ? "row-span-2 sm:col-span-1" : ""
                }`}
                style={{
                  borderColor: "var(--color-fm-blau-deep)",
                  backgroundColor: "rgba(232,178,59,0.5)",
                  height: i === 0 ? "418px" : "200px",
                }}
              >
                <div
                  className="flex-1 overflow-hidden"
                  style={{ backgroundColor: "var(--color-fm-blau)" }}
                >
                  <Image
                    src={h.img}
                    alt={h.titol}
                    width={400}
                    height={400}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{ filter: "contrast(1.05) saturate(0.9)" }}
                  />
                </div>
                <div
                  className="px-3 py-2 flex items-baseline justify-between gap-2 leading-none uppercase"
                  style={{
                    backgroundColor: ACCENT_BG[h.accent],
                    color: "var(--color-fm-crema)",
                    fontFamily: "var(--font-poster)",
                    fontSize: "16px",
                    letterSpacing: "0.02em",
                  }}
                >
                  <span className="truncate">{h.titol}</span>
                  <span
                    className="font-mono text-[10px] tracking-[0.22em] shrink-0"
                    style={{ color: "var(--color-fm-ocre)" }}
                  >
                    {h.quan}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* JOAN UROZ */}
        <section
          className="mt-10 rounded-sm overflow-hidden"
          style={{ backgroundColor: "var(--color-fm-ocre)" }}
        >
          <div className="grid lg:grid-cols-[1fr_320px] gap-10 p-8 sm:p-12">
            <div>
              <Ribbon>
                <span style={{ color: "var(--color-fm-vermell)" }}>
                  — Divendres 20:00 · al cafè —
                </span>
              </Ribbon>
              <h2
                className="mt-4 uppercase leading-[0.86]"
                style={{
                  fontFamily: "var(--font-poster)",
                  fontSize: "clamp(3rem, 2.5rem + 4vw, 6rem)",
                  color: "var(--color-fm-blau-deep)",
                }}
              >
                Joan
                <br />
                Uroz{" "}
                <em
                  className="block not-italic mt-2"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontStyle: "italic",
                    fontWeight: 300,
                    color: "var(--color-fm-vermell)",
                    fontSize: "0.42em",
                  }}
                >
                  presenta
                </em>
              </h2>
              <p
                className="mt-4 italic leading-[1.05]"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.3rem, 1rem + 1vw, 2rem)",
                  color: "var(--color-fm-blau-deep)",
                }}
              >
                «La Cuina Xarnega.{" "}
                <strong
                  className="not-italic uppercase block"
                  style={{
                    fontFamily: "var(--font-poster)",
                    fontWeight: 400,
                    color: "var(--color-fm-vermell)",
                  }}
                >
                  Dos pobles en 146 plats.
                </strong>
                »
              </p>
              <p
                className="mt-5 text-base leading-relaxed max-w-prose"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--color-fm-blau-deep)",
                }}
              >
                Una vida cuinant entre dos llocs, entre dues llengües, entre
                dues maneres de seure a taula. Joan Uroz i Roser Marimon ens
                donen 146 receptes que són memòria, identitat i, sobretot,
                gana.
              </p>
              <ul
                className="mt-6 space-y-1 font-mono text-[11px] uppercase tracking-[0.18em]"
                style={{ color: "var(--color-fm-blau-deep)" }}
              >
                <li>· Conversa amb l&apos;autor</li>
                <li>· Tast de receptes del llibre</li>
                <li>· Signatura d&apos;exemplars</li>
              </ul>
            </div>
            <div className="flex flex-col gap-4 justify-end">
              <div
                className="relative aspect-[3/4] overflow-hidden border-[3px]"
                style={{
                  borderColor: "var(--color-fm-blau-deep)",
                  boxShadow: "6px 6px 0 var(--color-fm-blau-deep)",
                }}
              >
                <Image
                  src="/images/festa-major/llibre.jpg"
                  alt="La Cuina Xarnega"
                  fill
                  sizes="320px"
                  className="object-contain bg-white"
                />
              </div>
              <div
                className="relative aspect-[3/4] overflow-hidden border-[3px]"
                style={{
                  borderColor: "var(--color-fm-blau-deep)",
                  boxShadow: "6px 6px 0 var(--color-fm-blau-deep)",
                  backgroundColor: "var(--color-fm-blau-deep)",
                }}
              >
                <Image
                  src="/images/festa-major/joan-uroz.jpg"
                  alt="Joan Uroz"
                  fill
                  sizes="320px"
                  className="object-cover object-top"
                />
              </div>
            </div>
          </div>
        </section>

        {/* SEGURAROOM */}
        <section
          className="mt-10 rounded-sm overflow-hidden"
          style={{ backgroundColor: "var(--color-fm-vermell)" }}
        >
          <div className="grid lg:grid-cols-[360px_1fr] gap-10 p-8 sm:p-12">
            <div className="flex justify-center lg:justify-start order-2 lg:order-1">
              <div
                className="relative w-full max-w-[360px] aspect-[3/4] overflow-hidden border-[3px]"
                style={{
                  borderColor: "var(--color-fm-blau-deep)",
                  boxShadow: "8px 8px 0 var(--color-fm-blau-deep)",
                }}
              >
                <Image
                  src="/images/festa-major/seguraroom-poster.png"
                  alt="Pòster del SeguraRoom"
                  fill
                  sizes="360px"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <Ribbon>
                <span style={{ color: "var(--color-fm-ocre)" }}>
                  — Dissabte 10:00 · pels carrers —
                </span>
              </Ribbon>
              <h2
                className="mt-4 uppercase leading-[0.86]"
                style={{
                  fontFamily: "var(--font-poster)",
                  fontSize: "clamp(3rem, 2.5rem + 4vw, 6rem)",
                  color: "var(--color-fm-ocre)",
                }}
              >
                Segura
                <br />
                Room
              </h2>
              <p
                className="mt-4 italic leading-[1.05]"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.3rem, 1rem + 1vw, 2rem)",
                  color: "var(--color-fm-crema)",
                }}
              >
                «El poble és ple de pistes.{" "}
                <strong
                  className="not-italic uppercase block"
                  style={{
                    fontFamily: "var(--font-poster)",
                    fontWeight: 400,
                    color: "var(--color-fm-ocre)",
                  }}
                >
                  Trobaràs la clau?
                </strong>
                »
              </p>
              <p
                className="mt-5 text-base leading-relaxed max-w-prose"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--color-fm-crema)",
                }}
              >
                Joc de pistes per grans i petits que es desplega per tot el
                poble. L&apos;objectiu final: trobar la{" "}
                <strong
                  className="uppercase"
                  style={{
                    fontFamily: "var(--font-poster)",
                    fontWeight: 400,
                    color: "var(--color-fm-ocre)",
                  }}
                >
                  clau del cafè
                </strong>{" "}
                per poder dinar tots junts a la plaça del Pi.
              </p>
              <ul
                className="mt-6 space-y-1 font-mono text-[11px] uppercase tracking-[0.18em]"
                style={{ color: "var(--color-fm-crema)" }}
              >
                <li>
                  ·{" "}
                  <span style={{ color: "var(--color-fm-ocre)" }}>
                    Inflables infantils
                  </span>{" "}
                  tot el dia
                </li>
                <li>· Joc per equips · gran i petits hi juguen junts</li>
                <li>· Final 13:30 · dinar popular</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ROM CREMAT */}
        <section
          className="mt-10 rounded-sm p-8 sm:p-12"
          style={{ backgroundColor: "var(--color-fm-crema)" }}
        >
          <Ribbon>
            <span style={{ color: "var(--color-fm-terracotta)" }}>
              <Moli variant="terra" /> — Recepta per fer-ne entre amics —
            </span>
          </Ribbon>
          <h2
            className="mt-4 uppercase leading-[0.84]"
            style={{
              fontFamily: "var(--font-poster)",
              fontSize: "clamp(3.5rem, 2.5rem + 5vw, 7rem)",
              color: "var(--color-fm-vermell)",
            }}
          >
            Rom
            <br />
            cremat
          </h2>
          <p
            className="mt-4 italic max-w-2xl text-lg sm:text-xl leading-snug"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--color-fm-blau-deep)",
            }}
          >
            No és només una beguda. És la flama blava que es fa esperar mentre
            s&apos;apaguen les converses i tothom mira la cassola.
          </p>

          <div className="mt-8 grid gap-10 md:grid-cols-2">
            <div>
              <h3
                className="uppercase pb-2 mb-3 border-b-2"
                style={{
                  fontFamily: "var(--font-poster)",
                  fontSize: "20px",
                  letterSpacing: "0.04em",
                  color: "var(--color-fm-blau)",
                  borderColor: "var(--color-fm-blau-deep)",
                }}
              >
                Ingredients · per 6
              </h3>
              <ul style={{ fontFamily: "var(--font-display)" }}>
                {INGREDIENTS.map(([nom, qty]) => (
                  <li
                    key={nom}
                    className="flex justify-between items-baseline py-2 border-b border-dashed"
                    style={{
                      color: "var(--color-fm-blau-deep)",
                      borderColor: "rgba(8,24,43,0.18)",
                      fontSize: "15px",
                    }}
                  >
                    <span>{nom}</span>
                    <span
                      className="font-mono text-[11px] font-bold tracking-wide"
                      style={{ color: "var(--color-fm-terracotta)" }}
                    >
                      {qty}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3
                className="uppercase pb-2 mb-3 border-b-2"
                style={{
                  fontFamily: "var(--font-poster)",
                  fontSize: "20px",
                  letterSpacing: "0.04em",
                  color: "var(--color-fm-blau)",
                  borderColor: "var(--color-fm-blau-deep)",
                }}
              >
                Mètode
              </h3>
              <ol
                className="space-y-3 list-decimal pl-5"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--color-fm-blau-deep)",
                  fontSize: "15px",
                }}
              >
                {METODE.map((step, i) => (
                  <li key={i} className="leading-snug pl-1">
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <p
            className="mt-8 pt-4 border-t-2 uppercase leading-[1.1]"
            style={{
              fontFamily: "var(--font-poster)",
              fontSize: "20px",
              letterSpacing: "0.04em",
              color: "var(--color-fm-terracotta)",
              borderColor: "var(--color-fm-blau-deep)",
            }}
          >
            <Moli variant="terra" /> Mai sol. Sempre amb cançons.{" "}
            <Moli variant="terra" />
          </p>
        </section>

        {/* RECORD */}
        <section
          className="mt-10 rounded-sm p-8 sm:p-12"
          style={{ backgroundColor: "var(--color-fm-blau-deep)" }}
        >
          <Ribbon>
            <Moli variant="ocre" /> — Diumenge 13:00 · inauguració —
          </Ribbon>
          <h2
            className="mt-4 uppercase leading-[0.86]"
            style={{
              fontFamily: "var(--font-poster)",
              fontSize: "clamp(4rem, 3rem + 6vw, 9rem)",
              color: "var(--color-fm-ocre)",
            }}
          >
            Record
          </h2>
          <p
            className="mt-2 italic"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 300,
              fontSize: "clamp(2rem, 1.5rem + 2vw, 3.5rem)",
              color: "var(--color-fm-crema)",
              letterSpacing: "-0.02em",
            }}
          >
            Xavi{" "}
            <strong
              className="not-italic uppercase"
              style={{
                fontFamily: "var(--font-poster)",
                fontWeight: 400,
                color: "var(--color-fm-terracotta)",
              }}
            >
              Casanelles
            </strong>
          </p>
          <div
            className="mt-8 grid gap-8 md:grid-cols-2 leading-relaxed"
            style={{
              fontFamily: "var(--font-display)",
              color: "rgba(244,233,214,0.85)",
              fontSize: "16px",
            }}
          >
            <p>
              Hi ha persones que són un poble. Persones que, quan ja no hi són,
              es noten en cada cantonada, en cada festa, en cada cançó que
              abans cantaven amb tu.
            </p>
            <p>
              Aquesta Festa Major dediquem una placa al{" "}
              <strong
                className="uppercase"
                style={{
                  fontFamily: "var(--font-poster)",
                  fontWeight: 400,
                  color: "var(--color-fm-ocre)",
                }}
              >
                Xavi Casanelles
              </strong>
              . Un nom que estarà a la pedra perquè continuï estant a la plaça,
              a les converses, a la memòria del poble.
            </p>
          </div>
          <p
            className="mt-10 pt-6 border-t-2 uppercase leading-[1]"
            style={{
              fontFamily: "var(--font-poster)",
              fontSize: "clamp(1.5rem, 1.2rem + 1vw, 2.2rem)",
              color: "var(--color-fm-vermell)",
              borderColor: "var(--color-fm-ocre)",
            }}
          >
            <Moli variant="vermell" /> Sempre seràs de Segura.{" "}
            <Moli variant="vermell" />
          </p>
        </section>

        {/* CLOSING */}
        <section
          className="mt-10 rounded-sm p-8 sm:p-12"
          style={{ backgroundColor: "var(--color-fm-terracotta)" }}
        >
          <Ribbon>
            <Moli variant="cream" /> — Fins l&apos;any que ve —
          </Ribbon>
          <h2
            className="mt-4 uppercase leading-[0.86]"
            style={{
              fontFamily: "var(--font-poster)",
              fontSize: "clamp(3rem, 2.5rem + 5vw, 7rem)",
              color: "var(--color-fm-blau-deep)",
            }}
          >
            Fins l&apos;any
            <br />
            <em
              className="not-italic"
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontWeight: 300,
                color: "var(--color-fm-crema)",
                fontSize: "0.6em",
              }}
            >
              que ve, Segura.
            </em>
          </h2>
          <dl
            className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 font-mono text-[11px] uppercase leading-[1.7] tracking-[0.05em]"
            style={{ color: "var(--color-fm-crema)" }}
          >
            <div>
              <dt
                className="block mb-2"
                style={{
                  fontFamily: "var(--font-poster)",
                  fontSize: "18px",
                  letterSpacing: "0.04em",
                  color: "var(--color-fm-blau-deep)",
                }}
              >
                Organització
              </dt>
              <dd>
                Comissió de Festes
                <br />
                Ajuntament de Segura
                <br />— i tot el poble que hi posa cos
              </dd>
            </div>
            <div>
              <dt
                className="block mb-2"
                style={{
                  fontFamily: "var(--font-poster)",
                  fontSize: "18px",
                  letterSpacing: "0.04em",
                  color: "var(--color-fm-blau-deep)",
                }}
              >
                On & quan
              </dt>
              <dd>
                Plaça del Pi · Cafè · Plaça Major
                <br />
                22 · 23 · 24 maig 2026
                <br />
                Tots els actes són gratuïts
              </dd>
            </div>
            <div>
              <dt
                className="block mb-2"
                style={{
                  fontFamily: "var(--font-poster)",
                  fontSize: "18px",
                  letterSpacing: "0.04em",
                  color: "var(--color-fm-blau-deep)",
                }}
              >
                Crèdits
              </dt>
              <dd>
                Disseny escut: Salvador
                <br />
                Llibre: Joan Uroz Soria · Roser Marimon Solé
              </dd>
            </div>
            <div>
              <dt
                className="block mb-2"
                style={{
                  fontFamily: "var(--font-poster)",
                  fontSize: "18px",
                  letterSpacing: "0.04em",
                  color: "var(--color-fm-blau-deep)",
                }}
              >
                Contacte
              </dt>
              <dd>
                segura.cat
                <br />
                @festamajorsegura
                <br />
                comissio@segura.cat
              </dd>
            </div>
          </dl>
          <p
            className="mt-10 pt-6 border-t-[3px] uppercase tracking-wide"
            style={{
              fontFamily: "var(--font-poster)",
              fontSize: "clamp(1.6rem, 1.2rem + 1.5vw, 2.6rem)",
              color: "var(--color-fm-blau-deep)",
              borderColor: "var(--color-fm-crema)",
            }}
          >
            <Moli variant="terra" /> #fmsegura2026 &nbsp;
            <Moli variant="terra" /> FM·26 <Moli variant="terra" />
          </p>
        </section>
      </div>
    </article>
  );
}
