import { useState } from "react";
import { motion } from "framer-motion";

/* ─────────────────────────────────────────────────────────────────
   NES pixel-art lake — wide horizontal organic blob that visually
   flows between the four worlds.  Same construction style as the
   LevelCard scenes: flat-color SVG rects, imageRendering:pixelated.
───────────────────────────────────────────────────────────────── */

const PIX: React.CSSProperties = { imageRendering: "pixelated" };

interface LakeCenterProps { onClick: () => void; }

/* ── Lake polygon — wide blob, all vertices on 4-px grid ──────
   Bumpy top edge (like irregular shore), rounded left/right,
   shallower bottom. Extends wide so it visually reaches toward
   GitHub (left) and Hugging Face (right).
──────────────────────────────────────────────────────────────── */
const LAKE: [number, number][] = [
  /* top shore — bumpy, left → right */
  [ 52,  80], [ 68,  58], [ 88,  72],
  [108,  48], [128,  60], [148,  44],
  [168,  56], [192,  64], [212,  50],
  [232,  68],
  /* right bulge */
  [252,  88], [256, 104], [248, 122],
  /* bottom shore — slightly smoother */
  [228, 138], [204, 148], [180, 134],
  [156, 150], [132, 138], [108, 148],
  [ 84, 136], [ 60, 146],
  /* left bulge */
  [ 32, 126], [ 20, 104], [ 28,  84],
];


/* ── Lake centroid (used to compute outward offsets) ──────── */
const CX = Math.round(LAKE.reduce((s,[x])=>s+x,0) / LAKE.length); // ≈ 141
const CY = Math.round(LAKE.reduce((s,[,y])=>s+y,0) / LAKE.length); // ≈ 99

/* ── Fence posts: walk the polygon perimeter at equal arc-length
   intervals, then nudge each point outward from the centroid.
   This makes the fence hug the irregular lake shore exactly.
──────────────────────────────────────────────────────────────── */
const FENCE_N  = 18;
const POST_OUT = 13; // pixels to push outside the polygon edge

function buildFencePosts(
  poly: [number, number][],
  n: number,
  cx: number,
  cy: number,
  outset: number,
): { x: number; y: number }[] {
  const len = poly.length;
  const segLens = poly.map(([x1,y1], i) => {
    const [x2,y2] = poly[(i+1) % len];
    return Math.hypot(x2-x1, y2-y1);
  });
  const total = segLens.reduce((a,b)=>a+b, 0);

  return Array.from({ length: n }, (_, i) => {
    let rem = (i / n) * total;
    let si  = 0;
    while (si < len - 1 && rem > segLens[si]) { rem -= segLens[si++]; }
    const t          = Math.min(1, rem / segLens[si]);
    const [x1,y1]    = poly[si];
    const [x2,y2]    = poly[(si+1) % len];
    const px         = x1 + t*(x2-x1);
    const py         = y1 + t*(y2-y1);
    const dx         = px - cx;
    const dy         = py - cy;
    const d          = Math.hypot(dx, dy) || 1;
    return {
      x: Math.round((px + (dx/d) * outset) / 2) * 2,
      y: Math.round((py + (dy/d) * outset) / 2) * 2,
    };
  });
}

const FENCE_POSTS = buildFencePosts(LAKE, FENCE_N, CX, CY, POST_OUT);

/* ── Water polygon = fence post ring (water fills exactly the
   same irregular shape the fence traces around the lake).    ── */
const WATER_PTS  = FENCE_POSTS.map(p => `${p.x},${p.y}`).join(" ");
const SHADOW_PTS = FENCE_POSTS.map(p => `${p.x+5},${p.y+5}`).join(" ");

/** Hit-target polygon: scaled around centroid. `1` = match shore outline.
 *  `< 1` = smaller click zone (must aim toward center).
 *  `> 1` = bigger / easier clicks (extends past the fence).
 */
const CLICK_HIT_SCALE = 1;

function scalePolygonAroundCentroid(
  pts: { x: number; y: number }[],
  cx: number,
  cy: number,
  scale: number,
): string {
  return pts
    .map(p => {
      const x = cx + (p.x - cx) * scale;
      const y = cy + (p.y - cy) * scale;
      return `${Math.round(x)},${Math.round(y)}`;
    })
    .join(" ");
}

const HIT_POLYGON_PTS = scalePolygonAroundCentroid(FENCE_POSTS, CX, CY, CLICK_HIT_SCALE);

/* ── NES water stripe palette ─────────────────────────────── */
const W = ["#0a3488","#1048b0","#1a60c8","#1048b0","#1a60c8","#2070d8"];
const STRIPES = Array.from({ length: 28 }, (_, i) => ({
  y: 44 + i * 5,
  fill: W[i % W.length],
}));

export default function LakeCenter({ onClick }: LakeCenterProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      style={{
        userSelect:      "none",
        display:         "inline-block",
        transformOrigin: "center center",
      }}
      
      transition={{ duration: 0.55, ease: "easeOut" }}
      whileHover={{ y: -8, scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <div style={{
        filter: hovered
          ? "drop-shadow(0 0 20px #3898f0bb) drop-shadow(3px 4px 0 rgba(0,0,0,0.8))"
          : "drop-shadow(0 4px 14px #2880e055) drop-shadow(2px 3px 0 rgba(0,0,0,0.6))",
        transition: "filter 0.3s ease",
      }}>
        <svg
          width={435} height={279}
          viewBox="0 0 290 186"
          style={{ ...PIX, display: "block", overflow: "visible" }}
        >
          <defs>
            <clipPath id="lkClip">
              <polygon points={WATER_PTS} />
            </clipPath>
          </defs>
          {/* All visuals ignore pointer events — click goes to overlay polygon below */}
          <g style={{ pointerEvents: "none" }}>
          {/* ── drop shadow ── */}
          <polygon points={SHADOW_PTS} fill="rgba(0,0,0,0.3)" />

          {/* ── lake base ── */}
          <polygon points={WATER_PTS} fill="#0a3488" />

          {/* ── horizontal NES water stripes ── */}
          <g clipPath="url(#lkClip)">
            {STRIPES.map((s, i) => (
              <rect key={i} x={0} y={s.y} width={290} height={4} fill={s.fill} />
            ))}

            {/* animated shimmer glints */}
            <motion.rect x={64}  y={70} width={44} height={2} fill="#88deff" opacity={0.7}
              animate={{ x:[64,90,64], opacity:[0.7,0.2,0.7] }}
              transition={{ duration:3.2, repeat:Infinity, ease:"easeInOut" }} />
            <motion.rect x={130} y={98} width={32} height={2} fill="#88deff" opacity={0.55}
              animate={{ x:[130,106,130], opacity:[0.55,0.15,0.55] }}
              transition={{ duration:2.6, delay:0.9, repeat:Infinity, ease:"easeInOut" }} />
            <motion.rect x={86}  y={128} width={50} height={2} fill="#88deff" opacity={0.6}
              animate={{ x:[86,118,86], opacity:[0.6,0.18,0.6] }}
              transition={{ duration:3.8, delay:1.8, repeat:Infinity, ease:"easeInOut" }} />

            {/* depth wave lines */}
            {[64, 96, 130].map((y, i) => (
              <rect key={i} x={28} y={y} width={234} height={1} fill="#082870" opacity={0.4} />
            ))}
          </g>

          {/* ── lake outline ── */}
          <polygon points={WATER_PTS} fill="none" stroke="#082870" strokeWidth={2} />

          {/* ── fence rails (3 parallel lines between each post pair) ── */}
          {FENCE_POSTS.map((p, i) => {
            const n = FENCE_POSTS[(i + 1) % FENCE_N];
            return (
              <g key={`r${i}`}>
                {/* bottom rail — darkest */}
                <line x1={p.x} y1={p.y+6}  x2={n.x} y2={n.y+6}  stroke="#3c1a08" strokeWidth={3} strokeLinecap="square" />
                {/* mid rail */}
                <line x1={p.x} y1={p.y+1}  x2={n.x} y2={n.y+1}  stroke="#5c3010" strokeWidth={2} strokeLinecap="square" />
                {/* top rail — lightest */}
                <line x1={p.x} y1={p.y-5}  x2={n.x} y2={n.y-5}  stroke="#7a4018" strokeWidth={2} strokeLinecap="square" />
              </g>
            );
          })}

          {/* ── fence posts (pixel-art wood blocks) ── */}
          {FENCE_POSTS.map((p, i) => (
            <g key={`fp${i}`}>
              {/* pixel drop shadow */}
              <rect x={p.x}   y={p.y-10} width={5} height={24} fill="rgba(0,0,0,0.45)" />
              {/* dark side */}
              <rect x={p.x-3} y={p.y-12} width={5} height={24} fill="#5c2e00" />
              {/* main body */}
              <rect x={p.x-3} y={p.y-12} width={4} height={24} fill="#7a4018" />
              {/* highlight strip */}
              <rect x={p.x-2} y={p.y-11} width={2} height={22} fill="#a05820" />
              {/* cap — dark base */}
              <rect x={p.x-4} y={p.y-14} width={8} height={4}  fill="#5c2e00" />
              {/* cap — main */}
              <rect x={p.x-3} y={p.y-14} width={7} height={3}  fill="#8a4c1c" />
              {/* cap — highlight */}
              <rect x={p.x-3} y={p.y-14} width={5} height={2}  fill="#b06028" />
            </g>
          ))}

          {/* ── "ABOUT ME" scene label (same style as LevelCard level name) ── */}
          <rect x={CX-65} y={CY-6} width={130} height={16} fill="rgba(0,0,0,0.62)" clipPath="url(#lkClip)" />
          {/* text outline via shadow rect trick — white text on dark bg */}
          <text x={CX+1} y={CY+6} textAnchor="middle" fill="#000000"
            fontSize={6} fontFamily="'Press Start 2P', monospace" opacity={0.6}>The Lake Of Knowledge</text>
          <text x={CX}   y={CY+5} textAnchor="middle" fill="white"
            fontSize={6} fontFamily="'Press Start 2P', monospace">The Lake Of Knowledge</text>
          </g>

          {/* Click + hover target — adjust CLICK_HIT_SCALE above to resize */}
          <polygon
            points={HIT_POLYGON_PTS}
            fill="transparent"
            stroke="none"
            style={{ cursor: "pointer", pointerEvents: "auto" }}
            onClick={onClick}
          />
        </svg>
      </div>
    </motion.div>
  );
}
