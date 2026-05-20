"use client";

import { useEffect, useRef, useState } from "react";

// === Pixel-art sprites (rows of strings, each char = one pixel) ===
// Palette indexed:
const COLORS: Record<string, string> = {
  ".": "transparent",
  "1": "#B9531C", // rust (guineu cos)
  "2": "#7A2E0E", // rust fosc (potes / ombra)
  "3": "#F4E9D6", // bone (panxa / cua punta)
  "4": "#111111", // ink (ull / línies)
  "5": "#86936B", // moss (molí cos)
  "6": "#3F4A30", // moss fosc
  "7": "#2A2118", // pedra fosca
  "8": "#574635", // pedra
  "9": "#E8B73A", // groc truita
  "a": "#C97A1F", // taronja rom
  "b": "#5A2F0F", // fusta
};

// Guineu corrent — 2 frames
const GUINEU_A = [
  ".........11...........",
  "........1111..........",
  ".......111111.........",
  "......11111111........",
  "......11414111........",
  "....11111111111.......",
  "...1111111111111......",
  "..111133331111133.....",
  "..11133333311133......",
  "..1133333333113.......",
  "...22.....22..........",
  "...22.....22..........",
];
const GUINEU_B = [
  ".........11...........",
  "........1111..........",
  ".......111111.........",
  "......11111111........",
  "......11414111........",
  "....11111111111.......",
  "...1111111111111......",
  "..111133331111133.....",
  "..11133333311133......",
  "..1133333333113.......",
  "...22.......2.........",
  "....22.....22.........",
];

const PEDRA = [
  "..7888..",
  ".788888.",
  "78888887",
  "78878887",
  "78888887",
  "77777777",
];

const MOLI = [
  "....5....",
  "...5b5...",
  "..5bbb5..",
  ".5bb6bb5.",
  "5bbbbbbb5",
  "..bbbbb..",
  "..b888b..",
  "..b888b..",
  "..b888b..",
  "..b888b..",
];

const TRUITA = [
  ".99999.",
  "9999999",
  "99a9a99",
  "9999999",
  ".99999.",
];

const ROM = [
  ".aaa.",
  "abbba",
  "aabaa",
  ".aaa.",
];

function drawSprite(
  ctx: CanvasRenderingContext2D,
  sprite: string[],
  x: number,
  y: number,
  px: number,
) {
  for (let r = 0; r < sprite.length; r++) {
    const row = sprite[r];
    if (!row) continue;
    for (let c = 0; c < row.length; c++) {
      const ch = row[c]!;
      const color = COLORS[ch];
      if (!color || color === "transparent") continue;
      ctx.fillStyle = color;
      ctx.fillRect(x + c * px, y + r * px, px, px);
    }
  }
}

type Obstacle = {
  kind: "pedra" | "moli";
  x: number;
  sprite: string[];
  w: number;
  h: number;
};
type Pickup = {
  kind: "truita" | "rom";
  x: number;
  y: number;
  sprite: string[];
  w: number;
  h: number;
  value: number;
  taken: boolean;
};

const PX = 4; // pixel size
const GROUND_Y = 200; // in canvas units (px before scaling)
const CANVAS_W = 480;
const CANVAS_H = 240;

const GUINEU_W = GUINEU_A[0]!.length * PX;
const GUINEU_H = GUINEU_A.length * PX;

export function GuineuRunner() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [state, setState] = useState<"idle" | "playing" | "over">("idle");
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);

  useEffect(() => {
    const saved = Number(localStorage.getItem("guineu-best") ?? "0");
    if (!Number.isNaN(saved)) setBest(saved);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.imageSmoothingEnabled = false;

    // Game state in refs (mutable, doesn't re-render)
    let raf = 0;
    let lastTs = 0;
    let speed = 4;
    let dist = 0;
    let scoreInner = 0;
    let guineuY = GROUND_Y - GUINEU_H;
    let vy = 0;
    const gravity = 0.55;
    const jumpV = -11;
    let frame = 0;
    let obstacles: Obstacle[] = [];
    let pickups: Pickup[] = [];
    let nextObstacleIn = 90;
    let nextPickupIn = 140;
    let running = false;
    let gameOver = false;

    const jump = () => {
      if (!running) return;
      if (guineuY >= GROUND_Y - GUINEU_H - 1) {
        vy = jumpV;
      }
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowUp" || e.key === "ArrowUp") {
        e.preventDefault();
        if (!running && !gameOver) startGame();
        else if (gameOver) startGame();
        else jump();
      }
    };
    const onPointer = (e: Event) => {
      e.preventDefault();
      if (!running && !gameOver) startGame();
      else if (gameOver) startGame();
      else jump();
    };

    const spawnObstacle = () => {
      const kind: Obstacle["kind"] = Math.random() < 0.55 ? "pedra" : "moli";
      const sprite = kind === "pedra" ? PEDRA : MOLI;
      const w = sprite[0]!.length * PX;
      const h = sprite.length * PX;
      obstacles.push({ kind, x: CANVAS_W + 10, sprite, w, h });
    };
    const spawnPickup = () => {
      const kind: Pickup["kind"] = Math.random() < 0.7 ? "truita" : "rom";
      const sprite = kind === "truita" ? TRUITA : ROM;
      const w = sprite[0]!.length * PX;
      const h = sprite.length * PX;
      const y = GROUND_Y - 60 - Math.random() * 40;
      pickups.push({
        kind,
        x: CANVAS_W + 20,
        y,
        sprite,
        w,
        h,
        value: kind === "truita" ? 5 : 15,
        taken: false,
      });
    };

    const reset = () => {
      speed = 4;
      dist = 0;
      scoreInner = 0;
      guineuY = GROUND_Y - GUINEU_H;
      vy = 0;
      frame = 0;
      obstacles = [];
      pickups = [];
      nextObstacleIn = 90;
      nextPickupIn = 140;
      gameOver = false;
      setScore(0);
    };

    const startGame = () => {
      reset();
      running = true;
      setState("playing");
      lastTs = performance.now();
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(loop);
    };

    const endGame = () => {
      running = false;
      gameOver = true;
      setState("over");
      setBest((prev) => {
        const next = Math.max(prev, Math.floor(scoreInner));
        localStorage.setItem("guineu-best", String(next));
        return next;
      });
    };

    const rectsCollide = (
      ax: number,
      ay: number,
      aw: number,
      ah: number,
      bx: number,
      by: number,
      bw: number,
      bh: number,
    ) => ax < bx + bw && ax + aw > bx && ay < by + bh && ay + ah > by;

    const draw = () => {
      // Cel
      ctx.fillStyle = "#F4E9D6"; // bone
      ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

      // Lluna / sol pixelat (cantonada)
      ctx.fillStyle = "#E8B73A";
      ctx.fillRect(CANVAS_W - 50, 24, 16, 16);

      // Núvols simples (parallax amb dist)
      ctx.fillStyle = "#ffffff";
      for (let i = 0; i < 3; i++) {
        const cx = ((i * 180 - (dist * 0.3) % 180) + CANVAS_W) % (CANVAS_W + 80) - 40;
        const cy = 40 + i * 20;
        ctx.fillRect(cx, cy, 30, 6);
        ctx.fillRect(cx + 6, cy - 6, 18, 6);
      }

      // Muntanyes llunyanes (parallax més lent)
      ctx.fillStyle = "#86936B";
      const mtnOffset = (dist * 0.5) % 80;
      for (let i = -1; i < 8; i++) {
        const mx = i * 80 - mtnOffset;
        ctx.beginPath();
        ctx.moveTo(mx, GROUND_Y - 10);
        ctx.lineTo(mx + 40, GROUND_Y - 50);
        ctx.lineTo(mx + 80, GROUND_Y - 10);
        ctx.closePath();
        ctx.fill();
      }

      // Terra
      ctx.fillStyle = "#574635";
      ctx.fillRect(0, GROUND_Y, CANVAS_W, CANVAS_H - GROUND_Y);
      ctx.fillStyle = "#3F4A30";
      ctx.fillRect(0, GROUND_Y, CANVAS_W, 4);

      // Pickups
      for (const p of pickups) {
        if (p.taken) continue;
        drawSprite(ctx, p.sprite, p.x, p.y, PX);
      }

      // Obstacles
      for (const o of obstacles) {
        const y = GROUND_Y - o.h;
        drawSprite(ctx, o.sprite, o.x, y, PX);
      }

      // Guineu
      const spr = frame % 16 < 8 ? GUINEU_A : GUINEU_B;
      drawSprite(ctx, spr, 60, guineuY, PX);

      // HUD
      ctx.fillStyle = "#111111";
      ctx.font = "bold 14px ui-monospace, Menlo, monospace";
      ctx.fillText(`PUNTS ${Math.floor(scoreInner)}`, 14, 22);
      ctx.fillText(`MILLOR ${Math.max(best, Math.floor(scoreInner))}`, CANVAS_W - 130, 22);
    };

    const loop = (ts: number) => {
      const dt = Math.min(33, ts - lastTs);
      lastTs = ts;
      frame++;

      // Physics
      vy += gravity;
      guineuY += vy;
      if (guineuY > GROUND_Y - GUINEU_H) {
        guineuY = GROUND_Y - GUINEU_H;
        vy = 0;
      }

      dist += speed;
      scoreInner += speed * 0.05;
      speed = Math.min(11, 4 + dist / 1500);

      // Spawn
      nextObstacleIn -= speed * (dt / 16);
      if (nextObstacleIn <= 0) {
        spawnObstacle();
        nextObstacleIn = 70 + Math.random() * 80;
      }
      nextPickupIn -= speed * (dt / 16);
      if (nextPickupIn <= 0) {
        spawnPickup();
        nextPickupIn = 100 + Math.random() * 140;
      }

      // Move + cull
      obstacles = obstacles.filter((o) => {
        o.x -= speed;
        return o.x + o.w > -10;
      });
      pickups = pickups.filter((p) => {
        p.x -= speed;
        return p.x + p.w > -10;
      });

      // Guineu hitbox (una mica més petit que el sprite)
      const gx = 60 + 8;
      const gy = guineuY + 8;
      const gw = GUINEU_W - 16;
      const gh = GUINEU_H - 12;

      // Col·lisions obstacles
      for (const o of obstacles) {
        const oy = GROUND_Y - o.h;
        if (rectsCollide(gx, gy, gw, gh, o.x + 4, oy + 4, o.w - 8, o.h - 6)) {
          endGame();
          draw();
          return;
        }
      }
      // Pickups
      for (const p of pickups) {
        if (p.taken) continue;
        if (rectsCollide(gx, gy, gw, gh, p.x, p.y, p.w, p.h)) {
          p.taken = true;
          scoreInner += p.value;
        }
      }

      setScore(Math.floor(scoreInner));
      draw();
      if (running) raf = requestAnimationFrame(loop);
    };

    // Idle screen
    const drawIdle = () => {
      ctx.fillStyle = "#F4E9D6";
      ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
      ctx.fillStyle = "#574635";
      ctx.fillRect(0, GROUND_Y, CANVAS_W, CANVAS_H - GROUND_Y);
      ctx.fillStyle = "#3F4A30";
      ctx.fillRect(0, GROUND_Y, CANVAS_W, 4);
      drawSprite(ctx, GUINEU_A, 60, GROUND_Y - GUINEU_H, PX);
      ctx.fillStyle = "#111111";
      ctx.font = "bold 18px ui-monospace, Menlo, monospace";
      const t = "PRESSIONA ESPAI O TOCA PER SALTAR";
      ctx.fillText(t, CANVAS_W / 2 - ctx.measureText(t).width / 2, 110);
      ctx.font = "12px ui-monospace, Menlo, monospace";
      const s = "Esquiva pedres i molins · Recull truites i rom";
      ctx.fillText(s, CANVAS_W / 2 - ctx.measureText(s).width / 2, 132);
    };

    drawIdle();

    window.addEventListener("keydown", onKey);
    const wrap = wrapRef.current;
    const target: HTMLElement = wrap ?? canvas;
    target.addEventListener("pointerdown", onPointer);
    target.addEventListener("touchstart", onPointer, { passive: false });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", onKey);
      target.removeEventListener("pointerdown", onPointer);
      target.removeEventListener("touchstart", onPointer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main
      ref={wrapRef}
      className="fixed inset-0 bg-bone flex flex-col items-stretch justify-between select-none touch-none overflow-hidden"
      style={{ overscrollBehavior: "none" }}
    >
      <header className="text-center px-4 pt-3 pb-2 sm:pt-6">
        <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-rust">
          Segura · joc
        </p>
        <h1
          className="mt-1 sm:mt-3 uppercase text-ink leading-[0.9]"
          style={{
            fontFamily: "var(--font-poster, ui-sans-serif)",
            fontSize: "clamp(1.5rem, 1rem + 4vw, 4rem)",
          }}
        >
          La Guineu de Segura
        </h1>
      </header>

      <div className="relative flex-1 min-h-0 w-full flex items-center justify-center px-2 sm:px-4">
        <canvas
          ref={canvasRef}
          width={CANVAS_W}
          height={CANVAS_H}
          className="max-w-full max-h-full rounded-sm border-2 border-ink/15 bg-bone touch-none"
          style={{
            imageRendering: "pixelated",
            aspectRatio: `${CANVAS_W} / ${CANVAS_H}`,
            width: "100%",
            height: "auto",
            maxHeight: "100%",
          }}
        />
        {state === "over" && (
          <div className="pointer-events-none absolute inset-2 sm:inset-4 flex flex-col items-center justify-center bg-ink/75 text-bone rounded-sm">
            <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.3em] text-rust/90">
              Game over
            </p>
            <p
              className="mt-2 uppercase"
              style={{
                fontFamily: "var(--font-poster, ui-sans-serif)",
                fontSize: "clamp(1.75rem, 1.5rem + 3vw, 3.5rem)",
                lineHeight: 0.9,
              }}
            >
              {score} punts
            </p>
            <p className="mt-3 font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] text-bone/70">
              Millor: {best}
            </p>
            <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.22em] text-bone/80">
              Toca per tornar a jugar
            </p>
          </div>
        )}
      </div>

      <footer className="px-3 pb-3 sm:pb-5">
        <div className="grid grid-cols-4 gap-2 text-center font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.18em] text-stone">
          <Legend color="#B9531C" label="Guineu" />
          <Legend color="#574635" label="Pedra" />
          <Legend color="#86936B" label="Molí" />
          <Legend color="#E8B73A" label="Truita" />
        </div>
        <p className="mt-2 text-center font-mono text-[9px] uppercase tracking-[0.22em] text-stone/70">
          Toca o espai · per saltar
        </p>
      </footer>
    </main>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center justify-center gap-1.5">
      <span
        aria-hidden
        className="block h-2.5 w-2.5 rounded-[2px]"
        style={{ background: color }}
      />
      <span>{label}</span>
    </div>
  );
}
