# Segura · Web del llogaret

Web institucional i comunitària del llogaret de **Segura** (Savallà del Comtat, Conca de Barberà). Construïda amb Next.js 15 (App Router), React 19, TypeScript estricte, Tailwind v4, Framer Motion, GSAP/ScrollTrigger, Lenis i next-intl.

---

## Posada en marxa

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de producció
npm run start    # serveix la build
npm run lint
npm run typecheck
```

Recomanat: Node ≥ 20.

---

## Estructura

```
app/[locale]/        # Pàgines (App Router, RSC per defecte)
components/
  sections/          # Una carpeta per secció del home
  ui/                # Components base (Button, Card, Container, Reveal…)
  layout/            # Header, Footer, LanguageSwitcher
  animations/        # Providers i utils d'animació
content/{ca,es,en}/  # FONT DE LA VERITAT — JSONs editables
i18n/                # Routing i config de next-intl
lib/                 # Loaders, schemes Zod, utils, animacions
messages/            # Strings d'interfície per locale
public/images/       # Fotos i SVGs placeholder
styles/tokens.css    # Design tokens (colors, escala tipogràfica, easings)
types/               # TypeScript shared
```

---

## Editar contingut sense tocar codi

Tot el contingut viu a `content/ca/`. Els JSONs estan validats amb Zod (`lib/schemas.ts`), si el format no quadra el build falla amb un error clar.

### `content/ca/poble.json`
Dades del poble: nom, habitants, altitud, coordenades, blocs d'història i fites cronològiques.

### `content/ca/estacions.json`
Llista d'estacions de la **visita virtual**. Cada estació necessita:
- `slug` — URL friendly, únic. Genera la ruta `/visita/[slug]`.
- `nom`, `subtitol`, `descripcio`
- `imatge` — ruta a `/public/images/estacions/...`
- `ordre` — número per ordenar el recorregut
- `coordenades`, `altitud` — opcionals

### `content/ca/activitats.json`
Cada activitat té `epoca` (`primavera | estiu | tardor | hivern`) que alimenta el filtre. Els elements amb slug que comença per `PLACEHOLDER-` han de ser revisats abans de publicar.

### `content/ca/negocis.json`
`categoria` ha de ser `allotjament | restauracio | serveis`.

### `content/ca/anuncis.json`
Avisos del poble. Es mostren a la secció "Punt de trobada digital", ordenats com els tens al fitxer.

> **Tip**: per trobar tot el contingut pendent, fes `grep -r "PLACEHOLDER" content/ messages/`.

---

## Imatges

- Tots els `next/image` apunten als SVGs de `public/images/placeholders/` mentre no hi hagi fotos finals.
- Quan tinguis fotos, posa-les a `public/images/{hero,estacions,activitats,negocis,poble}/` i actualitza la ruta dins el JSON corresponent (`imatge`).
- Format recomanat: JPG/AVIF, ample mínim 1920px per heros i 1280px per cards.
- Convenció: `slug-de-l-element.jpg` (sense majúscules ni accents).

---

## Afegir un nou idioma

1. Afegeix el codi a `i18n/routing.ts` (`locales: [...]`).
2. Crea `messages/{xx}.json` (copia `ca.json` com a base i tradueix).
3. Crea `content/{xx}/` amb els 5 JSONs traduïts. Mentre falti un fitxer, els loaders fan fallback a `ca`.
4. Activa l'idioma al language switcher: `components/layout/language-switcher.tsx` → posa `enabled: true`.
5. A `app/[locale]/layout.tsx`, afegeix el codi al `generateStaticParams` perquè es prerendi.

---

## Animacions

- `Lenis` (smooth scroll) només en desktop sense `prefers-reduced-motion`.
- `Framer Motion` per reveals i text reveals.
- `GSAP + ScrollTrigger` per al scroll horitzontal de la **Visita Virtual** (només desktop).
- En mobile, la visita virtual cau a `scroll-snap-type: x mandatory` natiu.
- Tot respecta `prefers-reduced-motion: reduce` (animations clamped a 0.01ms via `globals.css`).

Tokens d'animació centralitzats a `lib/animations.ts` (easings i durations).

---

## Performance

- Fonts auto-hostades amb `next/font` (`display: swap`).
- `next/image` amb formats AVIF/WebP i sizes responsives.
- GSAP i Lenis es carreguen amb `dynamic import` només quan calen.
- Bundle splitting per ruta (App Router).

---

## Deploy a Vercel

```bash
npm i -g vercel
vercel
```

O directament des del dashboard de Vercel: importa el repo, dependències detectades automàticament. Sense variables d'entorn obligatòries.

---

## Pendents conegudes (`PLACEHOLDER`)

- Verificar habitants (dada del 2005 al fitxer).
- Confirmar Cinema a la fresca i Festa Major (`activitats.json`).
- Omplir cases rurals i altres negocis (`negocis.json`).
- Posar primer anunci real (`anuncis.json`).
- Afegir fotos reals a `public/images/`.
