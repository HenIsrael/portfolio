import { useEffect, useRef, useState } from "react";
import type { RefObject } from "react";
import { LEVELS } from "./levels";
import type { LevelData } from "./levels";
import { drawForest   } from "./backgrounds/ForestBackground";
import { drawMountain } from "./backgrounds/MountainBackground";
import { drawCastle   } from "./backgrounds/CastleBackground";
import { drawTemple   } from "./backgrounds/TempleBackground";

const BG_DRAWERS: Record<string, (ctx: CanvasRenderingContext2D) => void> = {
  "WORLD 1-1": drawMountain,
  "WORLD 2-1": drawForest,
  "WORLD 3-4": drawCastle,
  "WORLD 4-1": drawTemple,
};

/* ── Canvas / physics constants ───────────────────────────────── */
export const CANVAS_W = 800;
export const CANVAS_H = 450;
const SW        = 32;   // sprite draw width
const SH        = 32;   // sprite draw height
const GRAVITY   = 0.55;
const MAX_FALL  = 14;
const JUMP_VY   = -12;
const WALK_SPD  = 4;
const COIN_R    = 9;

export type GameState = "playing" | "dead" | "won";

/* ── Mario 16×16 pixel data ───────────────────────────────────── */
const PAL: Record<string, string> = {
  R: "#e52213", S: "#ffc78e", B: "#7b3f00",
  W: "#ffffff", U: "#3b82f6", O: "#ffd700",
};
const PIX: string[][] = [
  ["_","_","_","_","R","R","R","R","R","_","_","_","_","_","_","_"],
  ["_","_","_","R","R","R","R","R","R","R","R","R","_","_","_","_"],
  ["_","_","_","B","B","B","S","S","B","S","_","_","_","_","_","_"],
  ["_","_","B","S","B","S","S","S","B","S","S","S","_","_","_","_"],
  ["_","_","B","S","B","B","S","S","S","B","S","S","S","_","_","_"],
  ["_","_","B","B","S","S","S","S","B","B","B","B","_","_","_","_"],
  ["_","_","_","_","S","S","S","S","S","S","S","_","_","_","_","_"],
  ["_","_","_","B","B","R","B","B","R","B","B","_","_","_","_","_"],
  ["_","_","_","S","R","R","R","R","R","S","_","_","_","_","_","_"],
  ["_","_","U","U","R","R","R","R","R","U","U","_","_","_","_","_"],
  ["_","U","U","U","U","R","O","R","U","U","U","U","_","_","_","_"],
  ["U","U","U","U","U","U","U","U","U","U","U","U","_","_","_","_"],
  ["U","U","U","_","U","U","U","U","U","_","U","U","_","_","_","_"],
  ["U","U","_","_","U","U","U","U","U","_","_","U","_","_","_","_"],
  ["B","B","_","_","B","B","B","B","B","_","_","B","_","_","_","_"],
  ["B","B","B","_","B","B","B","B","B","_","B","B","_","_","_","_"],
];

function buildSprite(): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = 16;
  c.height = 16;
  const ctx = c.getContext("2d")!;
  PIX.forEach((row, y) =>
    row.forEach((code, x) => {
      if (code === "_") return;
      ctx.fillStyle = PAL[code];
      ctx.fillRect(x, y, 1, 1);
    })
  );
  return c;
}

/* ── Hook ─────────────────────────────────────────────────────── */
export function useGameEngine(
  canvasRef: RefObject<HTMLCanvasElement | null>,
  worldKey: string,
  onWin: () => void,
) {
  const [gameState, setGameState] = useState<GameState>("playing");

  /* stable refs — no stale closures inside the RAF loop */
  const levelRef   = useRef<LevelData>(LEVELS[worldKey] ?? LEVELS.mountain);
  const statusRef  = useRef<GameState>("playing");
  const px         = useRef(0);
  const py         = useRef(0);
  const pvx        = useRef(0);
  const pvy        = useRef(0);
  const onGround   = useRef(false);
  const facingLeft = useRef(false);
  const coins      = useRef<{ x: number; y: number; collected: boolean; type?: "coin" | "mushroom" }[]>([]);
  const frameNum   = useRef(0);
  const rafId      = useRef(0);
  const onWinRef   = useRef(onWin);
  const resetRef   = useRef<() => void>(() => {});
  const keys       = useRef({ left: false, right: false, jump: false, held: false });

  useEffect(() => { onWinRef.current = onWin; }, [onWin]);

  /* pixel-art Mario mushroom centered at (cx, cy) */
  function drawMushroom(ctx: CanvasRenderingContext2D, cx: number, cy: number) {
    /* stem */
    ctx.fillStyle = "#f0ecdc";
    ctx.fillRect(cx - 4, cy + 2,  8, 9);
    ctx.fillStyle = "#d8d0b8";           // left shadow strip
    ctx.fillRect(cx - 4, cy + 2,  2, 9);

    /* cap underside fringe */
    ctx.fillStyle = "#f0ecdc";
    ctx.fillRect(cx - 10, cy + 2, 20, 3);

    /* cap — 3 rows, widening toward bottom */
    ctx.fillStyle = "#cc1010";
    ctx.fillRect(cx - 5,  cy - 12, 10, 6);   // top (narrow)
    ctx.fillRect(cx - 8,  cy - 7,  16, 6);   // middle
    ctx.fillRect(cx - 10, cy - 2,  20, 6);   // widest (base)

    /* cap highlight — thin bright strip along top edge */
    ctx.fillStyle = "#e83030";
    ctx.fillRect(cx - 4, cy - 12, 8, 2);

    /* white dots */
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(cx - 7, cy - 5,  3, 3);   // left dot
    ctx.fillRect(cx + 4, cy - 5,  3, 3);   // right dot
    ctx.fillRect(cx - 1, cy - 10, 3, 3);   // top centre dot
  }

  /* render — reads live ref values, defined at hook scope so all refs are in closure */
  function render(ctx: CanvasRenderingContext2D, sprite: HTMLCanvasElement, frame: number, lv: LevelData) {
    /* background */
    ctx.fillStyle = lv.bgColor;
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

    if (lv.bgColor2) {
      const grad = ctx.createLinearGradient(0, CANVAS_H * 0.4, 0, CANVAS_H);
      grad.addColorStop(0, "rgba(0,0,0,0)");
      grad.addColorStop(1, lv.bgColor2 + "aa");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
    }

    /* world-specific background decorations */
    BG_DRAWERS[lv.worldId]?.(ctx);

    /* platforms */
    for (const p of lv.platforms) {
      ctx.fillStyle = p.color ?? lv.platformColor;
      ctx.fillRect(p.x, p.y, p.w, p.h);
      /* top highlight */
      ctx.fillStyle = "rgba(255,255,255,0.22)";
      ctx.fillRect(p.x, p.y, p.w, 3);
      /* bottom shadow */
      ctx.fillStyle = lv.platformBorderColor;
      ctx.fillRect(p.x, p.y + p.h - 3, p.w, 3);
    }

    /* coins + mushrooms */
    for (const coin of coins.current) {
      if (coin.collected) continue;
      if (coin.type === "mushroom") {
        /* gentle bob */
        const bob = Math.sin(frame * 0.055 + coin.x * 0.01) * 2;
        drawMushroom(ctx, coin.x, coin.y + bob);
      } else {
        /* spinning coin — horizontal scale oscillation */
        const sx = Math.max(0.12, Math.abs(Math.sin(frame * 0.07 + coin.x * 0.008)));
        ctx.save();
        ctx.translate(coin.x, coin.y);
        ctx.scale(sx, 1);
        ctx.beginPath();
        ctx.arc(0, 0, COIN_R, 0, Math.PI * 2);
        ctx.fillStyle = lv.coinColor;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(-2, -2, COIN_R * 0.42, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.55)";
        ctx.fill();
        ctx.restore();
      }
    }

    /* mario sprite */
    ctx.save();
    ctx.imageSmoothingEnabled = false;
    if (facingLeft.current) {
      ctx.translate(px.current + SW, py.current);
      ctx.scale(-1, 1);
      ctx.drawImage(sprite, 0, 0, SW, SH);
    } else {
      ctx.drawImage(sprite, px.current, py.current, SW, SH);
    }
    ctx.restore();

    /* HUD */
    const coinsLeft     = coins.current.filter(c => !c.collected && c.type !== "mushroom").length;
    const mushroomsLeft = coins.current.filter(c => !c.collected &&  c.type === "mushroom").length;
    const hasAnyMushrooms = coins.current.some(c => c.type === "mushroom");

    ctx.imageSmoothingEnabled = true;
    ctx.font = '10px "Press Start 2P", monospace';
    ctx.shadowColor = "#000";
    ctx.shadowBlur = 5;
    ctx.fillStyle = "#ffd700";
    ctx.fillText(`COINS x${coinsLeft}`, 16, 28);
    if (hasAnyMushrooms) {
      const coinsTextW = ctx.measureText(`COINS x${coinsLeft}`).width;
      ctx.fillStyle = "#E02000";
      ctx.fillText(`  MUSHROOMS x${mushroomsLeft}`, 16 + coinsTextW, 28);
    }
    const tw = ctx.measureText(lv.worldId).width;
    ctx.fillStyle = "#fff";
    ctx.fillText(lv.worldId, CANVAS_W - tw - 16, 28);
    ctx.shadowBlur = 0;
  }

  useEffect(() => {
    levelRef.current = LEVELS[worldKey] ?? LEVELS.mountain;

    const initGame = () => {
      const lv = levelRef.current;
      px.current  = lv.playerStart.x;
      py.current  = lv.playerStart.y;
      pvx.current = 0;
      pvy.current = 0;
      onGround.current   = false;
      facingLeft.current = false;
      coins.current = lv.coins.map(c => ({ ...c, collected: false }));
      statusRef.current  = "playing";
      setGameState("playing");
    };

    resetRef.current = initGame;
    initGame();

    const sprite = buildSprite();

    /* keyboard listeners */
    const onKeyDown = (e: KeyboardEvent) => {
      if (["ArrowLeft",  "KeyA"].includes(e.code)) keys.current.left  = true;
      if (["ArrowRight", "KeyD"].includes(e.code)) keys.current.right = true;
      if (["Space", "ArrowUp", "KeyW"].includes(e.code)) {
        if (!keys.current.held) {
          keys.current.jump = true;
          keys.current.held = true;
        }
        e.preventDefault(); // stop page scroll
      }
    };
    const onKeyUp = (e: KeyboardEvent) => {
      if (["ArrowLeft",  "KeyA"].includes(e.code)) keys.current.left  = false;
      if (["ArrowRight", "KeyD"].includes(e.code)) keys.current.right = false;
      if (["Space", "ArrowUp", "KeyW"].includes(e.code)) {
        keys.current.jump = false;
        keys.current.held = false;
      }
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup",   onKeyUp);

    /* main game loop */
    const loop = () => {
      const canvas = canvasRef.current;
      if (!canvas) { rafId.current = requestAnimationFrame(loop); return; }
      const ctx = canvas.getContext("2d");
      if (!ctx)    { rafId.current = requestAnimationFrame(loop); return; }

      if (statusRef.current === "playing") {
        const k  = keys.current;
        const lv = levelRef.current;

        /* input → velocity */
        pvx.current = k.left ? -WALK_SPD : k.right ? WALK_SPD : 0;
        if (k.left)  facingLeft.current = true;
        if (k.right) facingLeft.current = false;

        if (k.jump && onGround.current) {
          pvy.current      = JUMP_VY;
          onGround.current = false;
          k.jump           = false; // consume the press
        }

        /* gravity */
        pvy.current = Math.min(pvy.current + GRAVITY, MAX_FALL);

        /* horizontal movement + bounds */
        px.current = Math.max(0, Math.min(CANVAS_W - SW, px.current + pvx.current));

        /* vertical movement + one-way platform collision */
        const prevPy = py.current;
        py.current  += pvy.current;
        onGround.current = false;

        for (const plat of lv.platforms) {
          const pL   = px.current;
          const pR   = px.current + SW;
          const pBot = py.current + SH;
          const pPrevBot = prevPy + SH;

          if (
            pvy.current >= 0 &&          // moving down (or static)
            pR   > plat.x + 4 &&         // horizontal overlap (with edge tolerance)
            pL   < plat.x + plat.w - 4 &&
            pPrevBot <= plat.y + 2 &&    // was above (or flush) last frame
            pBot     >= plat.y           // now intersecting
          ) {
            py.current   = plat.y - SH;
            pvy.current  = 0;
            onGround.current = true;
            break;
          }
        }

        /* coin collection */
        const cx = px.current + SW / 2;
        const cy = py.current + SH / 2;
        for (const coin of coins.current) {
          if (coin.collected) continue;
          if (Math.hypot(cx - coin.x, cy - coin.y) < COIN_R + SW * 0.38) {
            coin.collected = true;
          }
        }

        /* death — fell off the bottom */
        if (py.current > CANVAS_H + 80) {
          statusRef.current = "dead";
          setGameState("dead");
          setTimeout(initGame, 1200);
        }

        /* win — all coins collected */
        if (statusRef.current === "playing" && coins.current.every(c => c.collected)) {
          statusRef.current = "won";
          setGameState("won");
          setTimeout(() => onWinRef.current(), 1600);
        }
      }

      /* draw every frame regardless of state */
      frameNum.current++;
      render(ctx, sprite, frameNum.current, levelRef.current);

      rafId.current = requestAnimationFrame(loop);
    };

    rafId.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId.current);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup",   onKeyUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [worldKey]);

  return { gameState, resetGame: () => resetRef.current() };
}
