/* ──────────────────────────────────────────────────────────
   Animated Super Mario Bros (NES) pixel-art background.
   All sprites are inline SVGs rendered with image-rendering:
   pixelated so they keep that crisp 8-bit look.
────────────────────────────────────────────────────────── */

const PIX: React.CSSProperties = { imageRendering: "pixelated" };

/* ── Sprites ─────────────────────────────────────────────── */

function PixelCloud({ width = 96 }: { width?: number }) {
  const h = Math.round(width * 0.75);
  return (
    <svg width={width} height={h} viewBox="0 0 12 9" style={PIX}>
      {/* Top bump */}
      <rect x="4"  y="0" width="4" height="1" fill="#fff" />
      <rect x="3"  y="1" width="6" height="1" fill="#fff" />
      {/* Left bump */}
      <rect x="1"  y="2" width="3" height="2" fill="#fff" />
      {/* Right bump */}
      <rect x="8"  y="2" width="3" height="2" fill="#fff" />
      {/* Main body */}
      <rect x="0"  y="3" width="12" height="4" fill="#fff" />
      {/* Bottom shadow row */}
      <rect x="1"  y="7" width="10" height="1" fill="#9ea3d4" />
      <rect x="2"  y="8" width="8"  height="1" fill="#9ea3d4" />
      {/* Highlight */}
      <rect x="1"  y="3" width="2"  height="2" fill="#e8ecff" />
    </svg>
  );
}


function GreenPipe({ pipeHeight = 120 }: { pipeHeight?: number }) {
  const W = 56;
  const rows = Math.max(6, Math.round(pipeHeight / (W / 14)));
  return (
    <svg width={W} height={pipeHeight} viewBox={`0 0 14 ${rows}`} style={PIX}>
      {/* Cap (full width, 3 rows) */}
      <rect x="0" y="0" width="14" height="3" fill="#004c00" />
      <rect x="1" y="0" width="12" height="2" fill="#3da400" />
      <rect x="1" y="0" width="4"  height="2" fill="#62e000" opacity="0.45" />
      {/* Body */}
      <rect x="2" y="3" width="10" height={rows - 3} fill="#004c00" />
      <rect x="2" y="3" width="9"  height={rows - 3} fill="#3da400" />
      <rect x="3" y="3" width="3"  height={rows - 3} fill="#62e000" opacity="0.3" />
      <rect x="12" y="3" width="2" height={rows - 3} fill="#002800" />
    </svg>
  );
}

function Hill({ width = 160, height = 80, lite = false }: { width?: number; height?: number; lite?: boolean }) {
  const fill = lite ? "#5ab800" : "#3a9200";
  const dot  = lite ? "#3a9200" : "#2a7000";
  const dots = [
    { cx: "28%", cy: "52%" },
    { cx: "50%", cy: "34%" },
    { cx: "72%", cy: "52%" },
    { cx: "38%", cy: "68%" },
    { cx: "62%", cy: "68%" },
  ];
  return (
    <div style={{ position: "relative", width, height }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: fill,
          borderRadius: "50% 50% 0 0",
        }}
      />
      {dots.map((d, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width:  Math.round(width * 0.09),
            height: Math.round(width * 0.09),
            borderRadius: "50%",
            background: dot,
            left: d.cx,
            top:  d.cy,
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}
    </div>
  );
}

/* ── Scene layout data ───────────────────────────────────── */

const CLOUDS = [
  { id: 1, topPct: 5,  scale: 1.5, dur: 52, delay:   0, w: 96  },
  { id: 2, topPct: 14, scale: 1.0, dur: 68, delay: -22, w: 80  },
  { id: 3, topPct: 4,  scale: 1.9, dur: 58, delay: -40, w: 96  },
  { id: 4, topPct: 20, scale: 0.8, dur: 78, delay: -60, w: 72  },
  { id: 5, topPct: 10, scale: 1.2, dur: 46, delay: -14, w: 96  },
  { id: 6, topPct: 3,  scale: 0.9, dur: 85, delay: -72, w: 80  },
  { id: 7, topPct: 17, scale: 1.4, dur: 63, delay: -35, w: 96  },
];



/* ── Ground constants (px from viewport bottom) ─────────── */
const GROUND_H      = 88; // total ground strip height
const GRASS_H       = 20; // green grass cap
const DIRT_H        = GROUND_H - GRASS_H;

/* ── Component ───────────────────────────────────────────── */

export default function MarioBackground() {
  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden"
      style={{ background: "#5c94fc" }}
    >
      {/* ── Stars (subtle, behind clouds) ────────── */}
      {[...Array(22)].map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top:  `${4 + ((i * 37) % 42)}%`,
            left: `${(i * 47) % 100}%`,
            width:  i % 3 === 0 ? 4 : 2,
            height: i % 3 === 0 ? 4 : 2,
            background: "#fff",
            opacity: 0.25 + (i % 5) * 0.07,
            animation: `marioSparkle ${2 + (i % 4)}s ease-in-out infinite`,
            animationDelay: `${(i * 0.3) % 3}s`,
          }}
        />
      ))}

      {/* ── Animated clouds ──────────────────────── */}
      {CLOUDS.map(c => (
        <div
          key={c.id}
          style={{
            position: "absolute",
            top: `${c.topPct}%`,
            animation: `marioFloatLeft ${c.dur}s linear infinite`,
            animationDelay: `${c.delay}s`,
            willChange: "transform",
          }}
        >
          <div style={{ transform: `scale(${c.scale})`, transformOrigin: "left center" }}>
            <PixelCloud width={c.w} />
          </div>
        </div>
      ))}

      {/* ── Hills (far, behind pipes) ─────────────── */}
      <div style={{ position: "absolute", bottom: GROUND_H, left: "3%",  zIndex: 1 }}>
        <Hill width={220} height={110} lite />
      </div>
      <div style={{ position: "absolute", bottom: GROUND_H, left: "30%", zIndex: 1 }}>
        <Hill width={140} height={70} />
      </div>
      <div style={{ position: "absolute", bottom: GROUND_H, right: "5%", zIndex: 1 }}>
        <Hill width={260} height={130} lite />
      </div>
      <div style={{ position: "absolute", bottom: GROUND_H, right: "33%", zIndex: 1 }}>
        <Hill width={110} height={55} />
      </div>

      {/* ── Pipes ────────────────────────────────── */}
      <div style={{ position: "absolute", bottom: GROUND_H, left: "7%", zIndex: 3 }}>
        <GreenPipe pipeHeight={130} />
      </div>
      <div style={{ position: "absolute", bottom: GROUND_H, left: "22%", zIndex: 3 }}>
        <GreenPipe pipeHeight={80} />
      </div>
      <div style={{ position: "absolute", bottom: GROUND_H, right: "10%", zIndex: 3 }}>
        <GreenPipe pipeHeight={110} />
      </div>
      <div style={{ position: "absolute", bottom: GROUND_H, right: "24%", zIndex: 3 }}>
        <GreenPipe pipeHeight={70} />
      </div>

      {/* ── Ground – grass cap ───────────────────── */}
      <div
        style={{
          position: "absolute",
          bottom:  DIRT_H,
          left: 0, right: 0,
          height:  GRASS_H,
          background: "#52a800",
          borderTop:    "3px solid #39780d",
          borderBottom: "3px solid #3a8c00",
          zIndex: 4,
        }}
      />

      {/* ── Ground – dirt blocks ─────────────────── */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0, right: 0,
          height: DIRT_H,
          background: "#a85400",
          borderTop: "3px solid #7a3c00",
          backgroundImage: [
            "linear-gradient(rgba(90,40,0,0.55) 3px, transparent 3px)",
            "linear-gradient(90deg, rgba(90,40,0,0.55) 3px, transparent 3px)",
          ].join(", "),
          backgroundSize: "40px 40px",
          zIndex: 4,
        }}
      />
    </div>
  );
}
