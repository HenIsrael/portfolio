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
const COIN_R    = 9;   // collection radius (kept for hit-test)

export type GameState = "playing" | "dead" | "won";

/* ── Mario 16×16 pixel data ───────────────────────────────────── */
const MARIO_PAL: Record<string, string> = {
  R: "#e52213", S: "#ffc78e", B: "#7b3f00",
  W: "#ffffff", U: "#3b82f6", O: "#ffd700",
};
const MARIO_PIX: string[][] = [
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

/* ── Cookie Monster 16×16 pixel data ─────────────────────────── */
const COOKIE_PAL: Record<string, string> = {
  C: "#1a72d4",  // vivid blue fur
  W: "#ffffff",  // white eye spheres
  K: "#0a0a0a",  // black pupils + mouth interior
  T: "#d4a56a",  // cookie tan
  H: "#7b4f21",  // chocolate chip
};
const COOKIE_PIX: string[][] = [
  ["_","_","_","W","W","W","_","_","W","W","W","_","_","_","_","_"],
  ["_","_","W","W","W","W","_","W","W","W","W","W","_","_","_","_"],
  ["_","_","W","K","W","W","_","W","W","K","W","W","_","_","_","_"],
  ["_","_","_","W","W","_","_","_","W","W","W","_","_","_","_","_"],

  ["_","_","C","C","C","C","C","C","C","C","C","_","_","_","_","_"],
  ["_","C","C","C","C","C","C","C","C","C","C","C","_","_","_","_"],
  ["C","C","C","C","C","C","C","C","C","C","C","C","C","_","_","_"],

  // mouth (more rounded / chaotic)
  ["C","C","C","C","K","K","K","K","K","K","C","C","C","_","_","_"],
  ["C","C","C","K","K","K","K","K","K","K","K","C","C","_","_","_"],
  ["C","C","K","K","K","K","K","K","K","K","K","K","C","_","_","_"],
  ["C","C","C","K","K","K","K","K","K","K","K","C","C","_","_","_"],

  ["C","C","C","C","C","C","C","C","C","C","C","C","C","_","_","_"],

  // cookie hand (cleaner + clearer)
  ["C","C","C","C","C","C","C","C","C","T","T","T","_","_","_","_"],
  ["C","C","_","C","C","C","C","C","T","T","H","T","_","_","_","_"],
  ["C","C","_","_","C","C","C","_","_","T","T","_","_","_","_","_"],
  ["C","_","_","_","C","C","C","_","_","_","_","_","_","_","_","_"],
];

function buildSprite(character: string): HTMLCanvasElement {
  const pal = character === "cookie-monster" ? COOKIE_PAL : MARIO_PAL;
  const pix = character === "cookie-monster" ? COOKIE_PIX : MARIO_PIX;
  const c = document.createElement("canvas");
  c.width = 16;
  c.height = 16;
  const ctx = c.getContext("2d")!;
  pix.forEach((row, y) =>
    row.forEach((code, x) => {
      if (code === "_") return;
      ctx.fillStyle = pal[code];
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
  character: string = "mario",
) {
  const [gameState,  setGameState]  = useState<GameState>("playing");
  const [coinsLeft,  setCoinsLeft]  = useState<number>(0);

  /* stable refs — no stale closures inside the RAF loop */
  const levelRef   = useRef<LevelData>(LEVELS[worldKey] ?? LEVELS.mountain);
  const statusRef  = useRef<GameState>("playing");
  const px         = useRef(0);
  const py         = useRef(0);
  const pvx        = useRef(0);
  const pvy        = useRef(0);
  const onGround   = useRef(false);
  const facingLeft = useRef(false);
  const coins      = useRef<{ x: number; y: number; collected: boolean; skill: string; icon: string }[]>([]);
  const imgCache   = useRef<Map<string, HTMLImageElement>>(new Map());
  const tooltip    = useRef<{ skill: string; x: number; y: number } | null>(null);
  const frameNum   = useRef(0);
  const rafId      = useRef(0);
  const onWinRef   = useRef(onWin);
  const resetRef   = useRef<() => void>(() => {});
  const keys       = useRef({ left: false, right: false, jump: false, held: false });

  useEffect(() => { onWinRef.current = onWin; }, [onWin]);

  /* floating skill icon centered at (cx, cy) */
  function drawSkillIcon(
    ctx: CanvasRenderingContext2D,
    cx: number,
    cy: number,
    icon: string,
    color: string,
    frame: number,
  ) {
    const img = imgCache.current.get(icon);
    if (!img?.complete || img.naturalWidth === 0) return;

    ctx.save();
    const RADIUS    = 18;
    const ICON_SIZE = 28;
    const bob = Math.sin(frame * 0.055 + cx * 0.01) * 3;
    const drawY = cy + bob;

    /* glow */
    ctx.shadowColor = color;
    ctx.shadowBlur  = 12;

    /* dark circular background */
    ctx.fillStyle = "rgba(0,0,0,0.72)";
    ctx.beginPath();
    ctx.arc(cx, drawY, RADIUS, 0, Math.PI * 2);
    ctx.fill();

    /* colored border */
    ctx.shadowBlur  = 0;
    ctx.strokeStyle = color;
    ctx.lineWidth   = 2;
    ctx.beginPath();
    ctx.arc(cx, drawY, RADIUS, 0, Math.PI * 2);
    ctx.stroke();

    /* clip icon to circle */
    ctx.beginPath();
    ctx.arc(cx, drawY, RADIUS - 2, 0, Math.PI * 2);
    ctx.clip();
    ctx.drawImage(img, cx - ICON_SIZE / 2, drawY - ICON_SIZE / 2, ICON_SIZE, ICON_SIZE);

    ctx.restore();
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

    /* skill icons */
    for (const coin of coins.current) {
      if (coin.collected) continue;
      drawSkillIcon(ctx, coin.x, coin.y, coin.icon, lv.skillColor, frame);
    }

    /* skill name tooltip (shown when player clicks an icon) */
    if (tooltip.current) {
      const t = tooltip.current;
      const stillActive = coins.current.some(c => c.skill === t.skill && !c.collected);
      if (!stillActive) {
        tooltip.current = null;
      } else {
        const RADIUS   = 18;
        const fontSize = t.skill.length > 10 ? 6 : 7;
        ctx.save();
        ctx.font = `${fontSize}px "Press Start 2P", monospace`;
        const textW = ctx.measureText(t.skill).width;
        const padX  = 8;
        const padY  = 5;
        const bw    = textW + padX * 2;
        const bh    = fontSize + padY * 2;
        const bob   = Math.sin(frame * 0.055 + t.x * 0.01) * 3;
        /* clamp so tooltip never clips off the canvas edges */
        const bx    = Math.max(4, Math.min(CANVAS_W - bw - 4, t.x - bw / 2));
        const by    = t.y - RADIUS - 8 - bh + bob;

        /* background */
        ctx.shadowColor = lv.skillColor;
        ctx.shadowBlur  = 8;
        ctx.fillStyle   = "rgba(0,0,0,0.88)";
        ctx.beginPath();
        ctx.roundRect(bx, by, bw, bh, 4);
        ctx.fill();

        /* border */
        ctx.shadowBlur  = 0;
        ctx.strokeStyle = lv.skillColor;
        ctx.lineWidth   = 1.5;
        ctx.beginPath();
        ctx.roundRect(bx, by, bw, bh, 4);
        ctx.stroke();

        /* small downward arrow from tooltip to icon */
        const arrowX = Math.max(bx + 6, Math.min(bx + bw - 6, t.x));
        ctx.fillStyle = lv.skillColor;
        ctx.beginPath();
        ctx.moveTo(arrowX - 5, by + bh);
        ctx.lineTo(arrowX + 5, by + bh);
        ctx.lineTo(arrowX,     by + bh + 5);
        ctx.closePath();
        ctx.fill();

        /* label */
        ctx.fillStyle    = "#ffffff";
        ctx.textBaseline = "middle";
        ctx.textAlign    = "center";
        ctx.fillText(t.skill, bx + bw / 2, by + bh / 2);
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
    const skillsLeft = coins.current.filter(c => !c.collected).length;

    ctx.imageSmoothingEnabled = true;
    ctx.font = '10px "Press Start 2P", monospace';
    ctx.shadowColor = "#000";
    ctx.shadowBlur = 5;
    ctx.fillStyle = lv.skillColor;
    ctx.fillText(`SKILLS x${skillsLeft}`, 16, 28);
    const tw = ctx.measureText(lv.worldId).width;
    ctx.fillStyle = "#fff";
    ctx.fillText(lv.worldId, CANVAS_W - tw - 16, 28);
    ctx.shadowBlur = 0;
  }

  useEffect(() => {
    levelRef.current = LEVELS[worldKey] ?? LEVELS.mountain;

    /* preload skill icons for this level */
    for (const c of levelRef.current.coins) {
      if (!imgCache.current.has(c.icon)) {
        const img = new Image();
        img.src = c.icon;
        imgCache.current.set(c.icon, img);
      }
    }

    const initGame = () => {
      const lv = levelRef.current;
      px.current  = lv.playerStart.x;
      py.current  = lv.playerStart.y;
      pvx.current = 0;
      pvy.current = 0;
      onGround.current   = false;
      facingLeft.current = false;
      coins.current   = lv.coins.map(c => ({ x: c.x, y: c.y, skill: c.skill, icon: c.icon, collected: false }));
      tooltip.current = null;
      statusRef.current  = "playing";
      setGameState("playing");
      setCoinsLeft(lv.coins.length);
    };

    resetRef.current = initGame;
    initGame();

    const sprite = buildSprite(character);

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

    /* canvas click → show/hide skill name tooltip */
    const onCanvasClick = (e: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect   = canvas.getBoundingClientRect();
      const scaleX = CANVAS_W / rect.width;
      const scaleY = CANVAS_H / rect.height;
      const mx = (e.clientX - rect.left) * scaleX;
      const my = (e.clientY - rect.top)  * scaleY;
      const HIT_R = 22; // slightly larger than visual radius for easier clicking
      for (const coin of coins.current) {
        if (coin.collected) continue;
        if (Math.hypot(mx - coin.x, my - coin.y) <= HIT_R) {
          tooltip.current = tooltip.current?.skill === coin.skill
            ? null
            : { skill: coin.skill, x: coin.x, y: coin.y };
          return;
        }
      }
      tooltip.current = null; // click on empty area → dismiss
    };

    const canvasEl = canvasRef.current;
    canvasEl?.addEventListener("click", onCanvasClick);

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

        /* skill collection */
        const cx = px.current + SW / 2;
        const cy = py.current + SH / 2;
        let newlyCollected = false;
        for (const coin of coins.current) {
          if (coin.collected) continue;
          if (Math.hypot(cx - coin.x, cy - coin.y) < COIN_R + SW * 0.38) {
            coin.collected = true;
            if (tooltip.current?.skill === coin.skill) tooltip.current = null;
            newlyCollected = true;
          }
        }
        if (newlyCollected) {
          setCoinsLeft(coins.current.filter(c => !c.collected).length);
        }

        /* death — fell off the bottom */
        if (py.current > CANVAS_H + 80) {
          statusRef.current = "dead";
          setGameState("dead");
          setTimeout(initGame, 1200);
        }

        /* win — all skills collected */
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
      canvasEl?.removeEventListener("click", onCanvasClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [worldKey, character]);

  return { gameState, coinsLeft, resetGame: () => resetRef.current(), keysRef: keys };
}
