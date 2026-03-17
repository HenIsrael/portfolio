import { useState } from "react";
import { motion } from "framer-motion";
import type { IconType } from "react-icons";
/* ──────────────────────────────────────────────────────────────
   Pixel-art scenes (80 × 52 SVG grid, image-rendering: pixelated)
────────────────────────────────────────────────────────────── */
const PIX: React.CSSProperties = { imageRendering: "pixelated" };

/* ── Castle ── gothic night, moonlit fortress ── */
function CastleScene() {
  const stars: [number, number][] = [
    [5, 3], [12, 7], [20, 2], [30, 5], [45, 4], [55, 2], [65, 6],
    [72, 3], [38, 9], [50, 11], [15, 13], [68, 11], [25, 16], [58, 15],
  ];
  return (
    <svg width="100%" height="100%" viewBox="0 0 80 52" style={PIX} preserveAspectRatio="xMidYMid slice">
      <rect width="80" height="52" fill="#12082a" />
      {stars.map(([x, y], i) => (
        <rect key={i} x={x} y={y} width={i % 4 === 0 ? 2 : 1} height={i % 4 === 0 ? 2 : 1}
          fill="white" opacity={0.35 + (i % 6) * 0.1} />
      ))}
      <circle cx="66" cy="10" r="8"  fill="#f0e840" />
      <circle cx="68" cy="8"  r="3"  fill="#d8d020" opacity="0.45" />
      <circle cx="66" cy="10" r="12" fill="#f0e840" opacity="0.08" />
      {/* Left tower */}
      <rect x="3"  y="20" width="16" height="28" fill="#585868" />
      <rect x="3"  y="16" width="4"  height="5"  fill="#585868" />
      <rect x="9"  y="16" width="4"  height="5"  fill="#585868" />
      <rect x="15" y="16" width="4"  height="5"  fill="#585868" />
      <rect x="3"  y="20" width="2"  height="28" fill="#6a6a7c" opacity="0.5" />
      <rect x="8"  y="24" width="5"  height="6"  fill="#f0c030" />
      <rect x="8"  y="24" width="2"  height="6"  fill="#ffe050" opacity="0.5" />
      {/* Right tower */}
      <rect x="61" y="20" width="16" height="28" fill="#585868" />
      <rect x="61" y="16" width="4"  height="5"  fill="#585868" />
      <rect x="67" y="16" width="4"  height="5"  fill="#585868" />
      <rect x="73" y="16" width="4"  height="5"  fill="#585868" />
      <rect x="61" y="20" width="2"  height="28" fill="#6a6a7c" opacity="0.5" />
      <rect x="67" y="24" width="5"  height="6"  fill="#f0c030" />
      <rect x="67" y="24" width="2"  height="6"  fill="#ffe050" opacity="0.4" />
      {/* Main wall */}
      <rect x="19" y="28" width="42" height="20" fill="#686878" />
      {([19, 25, 31, 37, 43, 49, 55] as const).map((x, i) => (
        <rect key={i} x={x} y="23" width="4" height="6" fill="#686878" />
      ))}
      {([20, 30, 40, 50] as const).map((x, i) => (
        <rect key={i} x={x} y="30" width="8" height="4" fill="#606070" opacity="0.6" />
      ))}
      {/* Gate */}
      <rect x="32" y="34" width="16" height="14" fill="#12082a" />
      <rect x="33" y="32" width="14" height="3"  fill="#12082a" />
      <rect x="35" y="30" width="10" height="3"  fill="#12082a" />
      {/* Drawbridge */}
      <rect x="32" y="46" width="16" height="4"  fill="#8b5a2b" />
      <rect x="34" y="46" width="2"  height="4"  fill="#5c3a18" opacity="0.9" />
      <rect x="42" y="46" width="2"  height="4"  fill="#5c3a18" opacity="0.9" />
      <line x1="32" y1="34" x2="32" y2="46" stroke="#c8a830" strokeWidth="0.6" />
      <line x1="48" y1="34" x2="48" y2="46" stroke="#c8a830" strokeWidth="0.6" />
      <rect x="0" y="48" width="80" height="4" fill="#2a1800" />
      <rect x="0" y="48" width="80" height="1" fill="#3c2400" />
    </svg>
  );
}

/* ── Mountain ── deep night, aurora, snowy peaks ── */
function MountainScene() {
  const stars: [number, number][] = [
    [3, 2], [8, 5], [15, 3], [22, 7], [28, 4], [35, 2], [42, 6],
    [48, 3], [55, 5], [62, 2], [70, 6], [75, 3], [10, 10], [33, 9],
    [58, 8], [72, 11], [20, 13], [45, 12], [5, 15], [67, 14],
  ];
  return (
    <svg width="100%" height="100%" viewBox="0 0 80 52" style={PIX} preserveAspectRatio="xMidYMid slice">
      <rect width="80" height="52" fill="#08101e" />
      {stars.map(([x, y], i) => (
        <rect key={i} x={x} y={y} width="1" height="1" fill="white" opacity={0.3 + (i % 7) * 0.1} />
      ))}
      <rect x="0" y="5"  width="80" height="6" fill="#00cc88" opacity="0.09" />
      <rect x="0" y="9"  width="80" height="5" fill="#0088cc" opacity="0.08" />
      <rect x="0" y="13" width="80" height="4" fill="#8800cc" opacity="0.05" />
      {/* Left big mountain */}
      <polygon points="4,50 34,7 58,50"  fill="#1e3050" />
      <polygon points="26,20 34,7 42,20" fill="#b8d0ec" />
      <polygon points="28,26 34,7 40,26" fill="#dceeff" />
      <rect x="28" y="24" width="12" height="2" fill="#eaf4ff" />
      {/* Right mountain */}
      <polygon points="30,50 60,13 80,50" fill="#152030" />
      <polygon points="53,24 60,13 67,24" fill="#a8c8e0" />
      <polygon points="55,30 60,13 65,30" fill="#cce0f8" />
      <rect x="55" y="28" width="10" height="2" fill="#dce8f8" />
      {/* Pine trees */}
      {([7, 14, 20, 64, 70] as const).map((x, i) => (
        <g key={i}>
          <polygon points={`${x + 4},${35 + (i % 2) * 2} ${x + 8},${43 + (i % 2) * 2} ${x},${43 + (i % 2) * 2}`} fill="#1a4a1a" />
          <polygon points={`${x + 4},${40 + (i % 2) * 2} ${x + 10},${50} ${x - 2},${50}`} fill="#204e20" />
          <rect x={x + 3} y="49" width="2" height="2" fill="#3a1800" />
        </g>
      ))}
      <rect x="0" y="48" width="80" height="4" fill="#c0d8ee" />
      <rect x="0" y="48" width="80" height="1" fill="#d8ecff" />
      <ellipse cx="14" cy="48" rx="9"  ry="2.5" fill="#d8ecff" />
      <ellipse cx="66" cy="48" rx="7"  ry="2.5" fill="#d8ecff" />
    </svg>
  );
}

/* ── Forest ── warm sunrise, lush canopy, Mario mushroom ── */
function ForestScene() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 80 52" style={PIX} preserveAspectRatio="xMidYMid slice">
      <rect width="80" height="52" fill="#f8a828" />
      <rect x="0" y="22" width="80" height="30" fill="#f8d050" opacity="0.55" />
      <circle cx="10" cy="12" r="9"  fill="#ffe848" opacity="0.9" />
      <circle cx="10" cy="12" r="6"  fill="#ffd010" />
      <circle cx="10" cy="12" r="13" fill="#ffe040" opacity="0.12" />
      <rect x="25" y="6"  width="13" height="4" fill="white" opacity="0.85" />
      <rect x="27" y="4"  width="9"  height="4" fill="white" opacity="0.85" />
      <rect x="54" y="8"  width="15" height="4" fill="white" opacity="0.85" />
      <rect x="56" y="6"  width="11" height="4" fill="white" opacity="0.85" />
      {/* Back trees */}
      {([2, 18, 60, 72] as const).map((x, i) => (
        <g key={i} opacity="0.5">
          <polygon points={`${x + 6},22 ${x + 13},32 ${x - 1},32`} fill="#1a5000" />
          <polygon points={`${x + 6},28 ${x + 15},38 ${x - 3},38`} fill="#1e5800" />
        </g>
      ))}
      {/* Front trees */}
      {([8, 28, 50, 68] as const).map((x, i) => (
        <g key={i}>
          <rect x={x + 5} y="36" width="4"  height="12" fill="#6b3800" />
          <polygon points={`${x + 7},17 ${x + 15},29 ${x - 1},29`} fill="#1a5800" />
          <polygon points={`${x + 7},23 ${x + 17},35 ${x - 3},35`} fill="#228a00" />
        </g>
      ))}
      {/* Mario mushroom */}
      <rect x="36" y="34" width="8"  height="10" fill="#f0ecdc" />
      <rect x="35" y="32" width="10" height="3"  fill="#f0ecdc" />
      <rect x="34" y="26" width="12" height="8"  fill="#cc1010" />
      <rect x="35" y="24" width="10" height="4"  fill="#cc1010" />
      <rect x="37" y="23" width="6"  height="3"  fill="#cc1010" />
      <rect x="35" y="28" width="3"  height="3"  fill="white" />
      <rect x="42" y="27" width="3"  height="3"  fill="white" />
      <rect x="38" y="25" width="3"  height="2"  fill="white" />
      {/* Flowers */}
      {([20, 33, 55, 65] as const).map((x, i) => (
        <g key={i}>
          <rect x={x}     y="45" width="1" height="3" fill="#3a8c00" />
          <rect x={x}     y="44" width="1" height="1" fill="#ffcc00" />
          <rect x={x - 1} y="45" width="1" height="1" fill="#ff6688" />
          <rect x={x + 1} y="45" width="1" height="1" fill="#ff6688" />
          <rect x={x}     y="46" width="1" height="1" fill="#ff8844" />
        </g>
      ))}
      {([18, 42, 62] as const).map((x, i) => (
        <rect key={i} x={x} y={32 + i * 3} width="1" height="1" fill="#eeff80" opacity="0.9" />
      ))}
      <rect x="0" y="46" width="80" height="6" fill="#52a800" />
      <rect x="0" y="46" width="80" height="2" fill="#39780d" />
    </svg>
  );
}

/* ── Greek Temple ── golden dawn, marble columns, all-seeing eye ── */
function GreekTempleScene() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 80 52" style={PIX} preserveAspectRatio="xMidYMid slice">
      <rect width="80" height="52" fill="#7ab8f8" />
      <rect x="0" y="24" width="80" height="28" fill="#f4c048" opacity="0.42" />
      <rect x="0" y="34" width="80" height="18" fill="#f09030" opacity="0.28" />
      <circle cx="68" cy="38" r="14" fill="#ffd060" opacity="0.65" />
      <circle cx="68" cy="38" r="9"  fill="#ffe888" opacity="0.55" />
      {([8, 36, 56] as const).map((x, i) => (
        <g key={i}>
          <rect x={x}     y={5 + i * 2} width="12" height="3" fill="white" opacity="0.82" />
          <rect x={x + 2} y={3 + i * 2} width="8"  height="3" fill="white" opacity="0.82" />
        </g>
      ))}
      {/* Steps */}
      <rect x="6"  y="44" width="68" height="4" fill="#e4dcb8" />
      <rect x="9"  y="41" width="62" height="3" fill="#ece4c0" />
      <rect x="12" y="38" width="56" height="3" fill="#f4ecd0" />
      {/* Columns */}
      {([14, 21, 28, 35, 42, 49, 56] as const).map((x, i) => (
        <g key={i}>
          <rect x={x}     y="18" width="5" height="20" fill="#ede4c8" />
          <rect x={x + 1} y="18" width="1" height="20" fill="#d8d0b0" opacity="0.7" />
          <rect x={x + 3} y="18" width="1" height="20" fill="#d8d0b0" opacity="0.4" />
          <rect x={x - 1} y="16" width="7" height="2" fill="#f4ecd8" />
        </g>
      ))}
      <rect x="11" y="12" width="58" height="4" fill="#ece4c0" />
      <rect x="11" y="12" width="58" height="1" fill="#d4ccaa" />
      {([14, 21, 28, 35, 42, 49, 56, 63] as const).map((x, i) => (
        <rect key={i} x={x} y="13" width="4" height="2" fill="#c8c0a0" opacity="0.65" />
      ))}
      {/* Pediment */}
      <polygon points="40,4 11,12 69,12" fill="#f4ecd0" />
      <polygon points="40,5 12,12 68,12" fill="#e8e0c0" />
      {/* All-seeing eye */}
      <ellipse cx="40" cy="9"  rx="6"   ry="3.5" fill="#d4a030" />
      <ellipse cx="40" cy="9"  rx="3.5" ry="2"   fill="#2a1800" />
      <ellipse cx="40" cy="9"  rx="1.5" ry="1.2" fill="#4a2c08" />
      <circle  cx="40" cy="9"  r="0.7"  fill="white" />
      {([0, 40, 80, 120, 160, 200, 240, 280, 320] as const).map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        return (
          <line key={i}
            x1={40 + Math.cos(rad) * 7} y1={9 + Math.sin(rad) * 4}
            x2={40 + Math.cos(rad) * 10} y2={9 + Math.sin(rad) * 5.5}
            stroke="#d4a030" strokeWidth="0.5" opacity="0.7" />
        );
      })}
      <rect x="0" y="48" width="80" height="4" fill="#c0a840" />
      <rect x="0" y="48" width="80" height="1" fill="#a89030" />
    </svg>
  );
}

/* ──────────────────────────────────────────────────────────────
   Scene registry + clip-path silhouettes
   Each clip-path traces the scene's iconic landscape shape.
────────────────────────────────────────────────────────────── */

const SCENES = {
  castle:   CastleScene,
  mountain: MountainScene,
  forest:   ForestScene,
  temple:   GreekTempleScene,
} as const;

const LEVEL_IDS: Record<keyof typeof SCENES, string> = {
  mountain: "GitHub Repos",
  forest:   "Hugging Face",
  castle:   "Resume",
  temple:   "SafrSight",
};

/* ── Mountain: peak silhouette ── */
/* ── Forest: wavy tree-line ── */
/* ── Castle: battlement notches ── */
/* ── Temple: triangular pediment / pentagon ── */
const CLIP_PATHS: Record<keyof typeof SCENES, string> = {
  mountain: [
    "polygon(",
    "50% 0%,",           // mountain peak, center top
    "100% 74%,",         // right base of mountain
    "100% 100%,",        // bottom-right
    "0% 100%,",          // bottom-left
    "0% 74%",            // left base
    ")",
  ].join(""),

  forest: [
    "polygon(",
    "0% 100%, 0% 55%,",
    "7% 40%, 15% 52%,",   // left shoulder
    "24% 18%, 30% 32%,",  // first tree peak
    "40% 5%, 50% 22%,",   // tallest center tree
    "60% 5%, 70% 32%,",   // right tall tree
    "76% 18%, 85% 52%,",  // right shoulder
    "93% 40%, 100% 55%,", // right edge
    "100% 100%",
    ")",
  ].join(""),

  castle: [
    "polygon(",
    "0% 100%, 0% 42%,",
    "7% 42%, 7% 27%,",    // merlon 1
    "18% 27%, 18% 42%,",
    "30% 42%, 30% 27%,",  // merlon 2
    "41% 27%, 41% 42%,",
    "52% 42%, 52% 27%,",  // merlon 3 (center gate area)
    "63% 27%, 63% 42%,",
    "74% 42%, 74% 27%,",  // merlon 4
    "85% 27%, 85% 42%,",
    "93% 42%, 93% 27%,",  // merlon 5
    "100% 27%, 100% 100%",
    ")",
  ].join(""),

  temple: [
    "polygon(",
    // ground — full width
    "0% 100%, 0% 93%,",
    // step 3 (widest)
    "8% 93%, 8% 85%,",
    // step 2
    "11% 85%, 11% 79%,",
    // step 1 → straight up the column walls
    "14% 79%, 14% 23%,",
    // pediment triangle
    "50% 7%,",
    // mirror right side
    "86% 23%, 86% 79%,",
    "89% 79%, 89% 85%,",
    "92% 85%, 92% 93%,",
    "100% 93%, 100% 100%",
    ")",
  ].join(""),
};

/*
  SVG polygon points matching each clip-path shape (viewBox 0 0 100 100).
  SVG pointer events ARE restricted to the polygon geometry, so only
  clicks inside the visible shape area will trigger navigation.
*/
const SVG_POLYGONS: Record<keyof typeof SCENES, string> = {
  mountain: "50,0 100,74 100,100 0,100 0,74",
  forest:   "0,100 0,55 7,40 15,52 24,18 30,32 40,5 50,22 60,5 70,32 76,18 85,52 93,40 100,55 100,100",
  castle:   "0,100 0,42 7,42 7,27 18,27 18,42 30,42 30,27 41,27 41,42 52,42 52,27 63,27 63,42 74,42 74,27 85,27 85,42 93,42 93,27 100,27 100,100",
  temple:   "0,100 0,93 8,93 8,85 11,85 11,79 14,79 14,23 50,7 86,23 86,79 89,79 89,85 92,85 92,93 100,93 100,100",
};

/* ──────────────────────────────────────────────────────────────
   LevelCard
────────────────────────────────────────────────────────────── */

export interface LevelCardProps {
  title: string;
  description: string;
  icon: IconType;
  accentColor: string;
  href?: string;
  isResume?: boolean;
  index: number;
  scene: keyof typeof SCENES;
  onGameStart: (scene: string, href?: string, isResume?: boolean) => void;
}

export default function LevelCard({
  title,
  description,
  icon: Icon,
  accentColor,
  href,
  isResume,
  index,
  scene,
  onGameStart,
}: LevelCardProps) {
  const SceneComp = SCENES[scene];
  const levelId   = LEVEL_IDS[scene];
  const [hovered,  setHovered]  = useState(false);
  const [descOpen, setDescOpen] = useState(false);

  /* Route through onGameStart — App decides play vs. view behaviour */
  const handleCardClick = () => {
    onGameStart(scene, href, isResume);
  };

  const sceneEl = (
    /* clip-path gives the landscape silhouette.
       The transparent SVG polygon overlay restricts clicks to
       exactly that shape — SVG pointer-events are geometry-aware. */
    <div
      style={{
        position:   "relative",
        width:      200,
        height:     130,
        margin:     "0 auto",
        clipPath:   CLIP_PATHS[scene],
        filter:     hovered
          ? `drop-shadow(0 0 18px ${accentColor}99) drop-shadow(3px 4px 0 rgba(0,0,0,0.8))`
          : `drop-shadow(0 4px 14px ${accentColor}55) drop-shadow(2px 3px 0 rgba(0,0,0,0.6))`,
        transition: "filter 0.3s ease",
      }}
    >
      <SceneComp />

      {/* Level ID — inside clip region, no pointer events */}
      <div
        style={{
          position:      "absolute",
          bottom:        8,
          left:          "50%",
          transform:     "translateX(-50%)",
          fontFamily:    '"Press Start 2P", monospace',
          fontSize:      10,
          color:         "white",
          whiteSpace:    "nowrap",
          textShadow:    "1px 1px 0 #000, -1px 0 0 #000, 0 -1px 0 #000",
          background:    "rgba(0,0,0,0.55)",
          padding:       "2px 6px",
          letterSpacing: "0.04em",
          pointerEvents: "none",
        }}
      >
        {levelId}
      </div>

      {/* Shape-accurate invisible click target.
          The <polygon> only fires events within its geometric area,
          so transparent corners outside the scene silhouette are dead zones. */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{
          position: "absolute",
          inset:    0,
          width:    "100%",
          height:   "100%",
          zIndex:   10,
          outline:  "none",
        }}
        aria-label={title}
        role="img"
      >
        <polygon
          points={SVG_POLYGONS[scene]}
          fill="rgba(0,0,0,0)"
          style={{ pointerEvents: "all", cursor: "pointer" }}
          onClick={handleCardClick}
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleCardClick(); }}
          tabIndex={0}
          role="button"
          aria-label={`Open ${title}`}
        />
      </svg>
    </div>
  );

  const inner = (
    <motion.div
      initial={{ opacity: 0, y: 44 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.14 * index, ease: "easeOut" }}
      whileHover={{ y: -8, scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{ position: "relative", cursor: "default" }}
    >
      {/* ── Shared 200px container: icon badge, scene, footer all aligned ── */}
      <div style={{ position: "relative", width: 200, margin: "0 auto" }}>

        {/* Icon badge — floats above the scene */}
        <div
          style={{
            position:       "absolute",
            top:            0,
            left:           "50%",
            transform:      "translateX(-50%)",
            width:          46,
            height:         46,
            background:     accentColor,
            border:         "3px solid #000",
            boxShadow:      [
              "3px 3px 0 rgba(0,0,0,0.55)",
              "inset 3px 3px 0 rgba(255,255,255,0.28)",
              "inset -3px -3px 0 rgba(0,0,0,0.22)",
            ].join(", "),
            display:        "flex",
            alignItems:     "center",
            justifyContent: "center",
            zIndex:         10,
            transition:     "box-shadow 0.3s ease",
          }}
        >
          <Icon size={22} color="#000" />
        </div>

        {/* Scene pushed down so icon badge has visual space above it */}
        <div style={{ marginTop: 20 }}>
          {sceneEl}
        </div>

        {/* ── Footer: ? block left-aligned, title centred ── */}
        <div style={{ padding: "14px 0 8px" }}>
        {/* Three-slot row: [? block] [title centred] [spacer] */}
        <div
          style={{
            display:     "flex",
            alignItems:  "center",
          }}
        >
          {/* Clickable ? block — shows description tooltip */}
          <div style={{ position: "relative", flexShrink: 0 }}>
            <div
              role="button"
              tabIndex={0}
              aria-label="Show description"
              onClick={(e) => { e.stopPropagation(); setDescOpen(v => !v); }}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.stopPropagation(); setDescOpen(v => !v); } }}
              style={{ cursor: "pointer", lineHeight: 0 }}
            >
              <svg
                width="20" height="20" viewBox="0 0 8 8"
                style={{
                  imageRendering: "pixelated" as const,
                  display:        "block",
                  /* always bobbing, just like the background question blocks */
                  animation:      "marioBob 1.4s ease-in-out infinite",
                  filter:         descOpen
                    ? `drop-shadow(0 0 8px ${accentColor}) drop-shadow(0 0 3px #fff)`
                    : `drop-shadow(2px 3px 0 rgba(0,0,0,0.55))`,
                  transition:     "filter 0.2s",
                }}
              >
                {/* Outer border */}
                <rect width="8" height="8" fill="#5c2e00" />
                {/* Body — brighter when open */}
                <rect x="1" y="1" width="6" height="6" fill={descOpen ? "#f0b800" : "#c88000"} />
                {/* Highlight edges */}
                <rect x="1" y="1" width="5" height="1" fill="#f0b800" />
                <rect x="1" y="1" width="1" height="5" fill="#f0b800" />
                {/* Shadow edges */}
                <rect x="2" y="7" width="6" height="1" fill="#7a4000" />
                <rect x="7" y="2" width="1" height="6" fill="#7a4000" />
                {/* ? symbol */}
                <rect x="3" y="2" width="2" height="1" fill="#fff" />
                <rect x="4" y="3" width="1" height="1" fill="#fff" />
                <rect x="3" y="4" width="2" height="1" fill="#fff" />
                <rect x="3" y="6" width="2" height="1" fill="#fff" />
              </svg>
            </div>

            {/* Tooltip — pops up above the ? block */}
            {descOpen && (
              <motion.div
                initial={{ opacity: 0, y: 6, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.92 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                style={{
                  position:   "absolute",
                  bottom:     "calc(100% + 10px)",
                  left:       "50%",
                  transform:  "translateX(-50%)",
                  width:      210,
                  background: "rgba(0,0,0,0.95)",
                  border:     `3px solid ${accentColor}`,
                  boxShadow:  `4px 4px 0 rgba(0,0,0,0.6), 0 0 14px ${accentColor}44`,
                  padding:    "10px 12px",
                  zIndex:     50,
                  pointerEvents: "none",
                }}
              >
                {/* Tooltip text */}
                <p style={{
                  fontFamily:    '"Inter", sans-serif',
                  fontSize:      12,
                  color:         "#d0dce8",
                  margin:        0,
                  lineHeight:    1.65,
                }}>
                  {description}
                </p>
                {/* Downward arrow pointing at the ? block */}
                <div style={{
                  position:    "absolute",
                  bottom:      -9,
                  left:        "50%",
                  transform:   "translateX(-50%)",
                  width:       0,
                  height:      0,
                  borderLeft:  "8px solid transparent",
                  borderRight: "8px solid transparent",
                  borderTop:   `8px solid ${accentColor}`,
                }} />
              </motion.div>
            )}
          </div>

          {/* Centre slot — empty, keeps ? block left-aligned */}
          <div style={{ flex: 1 }} />
        </div>
      </div>

      </div>{/* end shared 200px container */}
    </motion.div>
  );

  return <div style={{ paddingTop: 24 }}>{inner}</div>;
}
