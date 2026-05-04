import { useRef, useState, useEffect, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { useGameEngine, CANVAS_W, CANVAS_H } from "../game/useGameEngine";
import MarioSprite from "./characters/MarioSprite";
import CookieMonsterSprite from "./characters/CookieMonsterSprite";

const CANVAS_BORDER_PX = 4;
/** Canvas Y for top of hearts row (below `SKILLS x…` drawn at baseline 28 with 10px font). */
const HEARTS_HUD_TOP_Y = 40;
/** First filled pixel in Heart viewBox is x=3 — shift left so artwork lines up with HUD text at x=16. */
const HEART_VIEWBOX_LEFT_GUTTER = 3 / 16;

function useIsTouchDevice(): boolean {
  const check = () =>
    typeof window !== "undefined" &&
    ("ontouchstart" in window || navigator.maxTouchPoints > 0);

  const [isTouch, setIsTouch] = useState(check);

  useEffect(() => {
    const update = () => setIsTouch(check());
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return isTouch;
}

interface GameModalProps {
  worldKey: string;
  worldTitle: string;
  selectedCharacter: string;
  onSelectCharacter: (character: string) => void;
  onWin: () => void;
  onClose: () => void;
}

const FONT = '"Press Start 2P", monospace';

const CHARACTERS: { id: string; label: string; locked: boolean }[] = [
  { id: "mario",          label: "MARIO",   locked: false },
  { id: "cookie-monster", label: "COOKIE MONSTER",  locked: false },
  { id: "???2",           label: "???",     locked: true  },
];

function Heart({ size = 32 }: { size?: number }) {
  const color = "#e52213";

  const pixels = [
    [4,1],[5,1],[6,1],[9,1],[10,1],[11,1],
    [3,2],[4,2],[5,2],[6,2],[7,2],[8,2],[9,2],[10,2],[11,2],[12,2],
    [3,3],[4,3],[5,3],[6,3],[7,3],[8,3],[9,3],[10,3],[11,3],[12,3],
    [4,4],[5,4],[6,4],[7,4],[8,4],[9,4],[10,4],[11,4],
    [5,5],[6,5],[7,5],[8,5],[9,5],[10,5],
    [6,6],[7,6],[8,6],[9,6],
    [7,7],[8,7],
  ];

  return (
    <svg
      viewBox="0 0 16 16"
      width={size}
      height={size}
      style={{ imageRendering: "pixelated" }}
    >
      {pixels.map(([x, y], i) => (
        <rect key={i} x={x} y={y} width={1} height={1} fill={color} />
      ))}
    </svg>
  );
}

function DpadBtn({
  label,
  wide,
  onActivate,
  onDeactivate,
}: {
  label: string;
  wide?: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
}) {
  return (
    <button
      aria-label={label}
      style={{
        width:           wide ? 80 : 60,
        height:          60,
        background:      "rgba(255,215,0,0.08)",
        border:          "3px solid #c88000",
        boxShadow:       "0 0 0 3px #5c2e00, 3px 3px 0 rgba(0,0,0,0.55)",
        color:           "#ffd700",
        fontSize:        26,
        fontFamily:      FONT,
        cursor:          "pointer",
        display:         "flex",
        alignItems:      "center",
        justifyContent:  "center",
        touchAction:     "none",
        userSelect:      "none",
        WebkitUserSelect: "none",
        outline:         "none",
        padding:         0,
        flexShrink:      0,
        transition:      "background 0.1s",
      }}
      onPointerDown={(e) => { e.preventDefault(); (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,215,0,0.25)"; onActivate(); }}
      onPointerUp={(e)   => { e.preventDefault(); (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,215,0,0.08)"; onDeactivate(); }}
      onPointerLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,215,0,0.08)"; onDeactivate(); }}
      onPointerCancel={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,215,0,0.08)"; onDeactivate(); }}
    >
      {label}
    </button>
  );
}

export default function GameModal({
  worldKey,
  selectedCharacter, onSelectCharacter,
  onWin, onClose,
}: GameModalProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { gameState, keysRef } = useGameEngine(canvasRef, worldKey, onWin, selectedCharacter);
  const isTouchDevice = useIsTouchDevice();

  /** Match on-canvas HUD scale so hearts track `SKILLS x…` (10px in 800px-wide bitmap). */
  const [hudPxPerCanvasPx, setHudPxPerCanvasPx] = useState(1);
  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const update = () => setHudPxPerCanvasPx(canvas.clientWidth / CANVAS_W);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(canvas);
    return () => ro.disconnect();
  }, []);
  const heartSize = Math.max(12, Math.round(22 * hudPxPerCanvasPx));
  const heartsOpticalShiftX = -HEART_VIEWBOX_LEFT_GUTTER * heartSize;

  // Pure-CSS canvas constraint — no JS viewport measurement needed.
  // The third term limits the canvas width so its height never exceeds
  // (100svh − 142px), where 142px covers: outer padding (32) + top strip
  // (30) + canvas borders (8) + d-pad buttons (60) + d-pad padding (8) +
  // d-pad border (4). Hint bar removed on touch; d-pad padding tightened.
  // svh = SMALL viewport height — never changes on scroll, so the canvas
  // stays a stable size while the URL bar appears/disappears.
  const canvasMaxWidth =
    `min(${CANVAS_W}px, calc(100vw - 32px), calc((100svh - 142px) * ${CANVAS_W} / ${CANVAS_H}))`;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Game container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 24 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        style={{ position: "relative", zIndex: 10 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top strip — hint + close */}
        <div
          style={{
            fontFamily:   FONT,
            background:   "rgba(0,0,0,0.85)",
            border:       "4px solid #c88000",
            borderBottom: "none",
            boxShadow:    "0 0 0 4px #5c2e00",
            padding:      "8px 16px",
            display:      "flex",
            alignItems:   "center",
            justifyContent: "space-between",
            gap: 12,
          }}
        >
          <span style={{ fontSize: 8, color: "#52ff52", letterSpacing: "0.06em" }}>
            COLLECT ALL SKILLS TO WIN
          </span>
          <button
            onClick={onClose}
            style={{
              background: "rgba(255,255,255,0.1)",
              border:     "2px solid #555",
              color:      "#aaa",
              cursor:     "pointer",
              width:      28,
              height:     28,
              display:    "flex",
              alignItems: "center",
              justifyContent: "center",
              padding:    0,
              flexShrink: 0,
              transition: "background 0.15s, color 0.15s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.2)";
              (e.currentTarget as HTMLButtonElement).style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.1)";
              (e.currentTarget as HTMLButtonElement).style.color = "#aaa";
            }}
            aria-label="Close game"
          >
            <IoClose size={16} />
          </button>
        </div>

        {/* Canvas wrapper — character selector floats on top of the level */}
        <div style={{ position: "relative" }}>
          <canvas
            ref={canvasRef}
            width={CANVAS_W}
            height={CANVAS_H}
            style={{
              display:        "block",
              maxWidth:       canvasMaxWidth,
              width:          "100%",
              height:         "auto",
              imageRendering: "pixelated",
              border:         "4px solid #c88000",
              boxShadow:      "0 0 0 4px #5c2e00",
              outline:        "none",
            }}
          />

          {/* Character selector — floating overlay centred at top of canvas.
              CSS variables --game-overlay-top / --game-overlay-scale are set
              via a @media rule in index.css so the overlay shrinks
              automatically in landscape phone mode (no JS timing race). */}
          <div
            style={{
              position:        "absolute",
              top:             "var(--game-overlay-top, 12px)",
              left:            "50%",
              transform:       "translateX(-50%) scale(var(--game-overlay-scale, 1))",
              transformOrigin: "top center",
              zIndex:          20,
              display:         "flex",
              flexDirection:   "column",
              alignItems:      "center",
              gap:             6,
            }}
          >
            {/* Character buttons row */}
            <div style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
              {CHARACTERS.map((char) => {
                const isSelected = !char.locked && selectedCharacter === char.id;
                return (
                  <button
                    key={char.id}
                    disabled={char.locked}
                    onClick={() => !char.locked && onSelectCharacter(char.id)}
                    title={char.locked ? "Coming soon" : `Play as ${char.label}`}
                    style={{
                      display:        "flex",
                      alignItems:     "center",
                      justifyContent: "center",
                      width:          72,
                      height:         72,
                      background:     isSelected ? "rgba(255,215,0,0.15)" : "transparent",
                      border:         isSelected ? "2px solid #ffd700" : "2px solid #555",
                      boxShadow:      isSelected ? "0 0 0 2px #c88000, 0 0 14px rgba(255,215,0,0.4)" : "none",
                      padding:        0,
                      cursor:         char.locked ? "not-allowed" : "pointer",
                      opacity:        char.locked ? 0.3 : 1,
                      transition:     "border 0.15s, box-shadow 0.15s, background 0.15s",
                      outline:        "none",
                      imageRendering: "pixelated",
                      flexShrink:     0,
                    }}
                  >
                    {char.locked ? (
                      <span style={{ filter: "grayscale(1)", fontSize: 22 }}>🔒</span>
                    ) : char.id === "cookie-monster" ? (
                      <CookieMonsterSprite size={52} />
                    ) : (
                      <MarioSprite size={52} />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Lives — left-aligned with canvas HUD `SKILLS x…` (x=16), scale matches scaled canvas */}
          <div
            style={{
              position:        "absolute",
              left:            `calc(${CANVAS_BORDER_PX}px + (100% - ${CANVAS_BORDER_PX * 2}px) * ${16} / ${CANVAS_W})`,
              top:             `calc(${CANVAS_BORDER_PX}px + (100% - ${CANVAS_BORDER_PX * 2}px) * ${HEARTS_HUD_TOP_Y} / ${CANVAS_H})`,
              transform:       `translateX(${heartsOpticalShiftX}px)`,
              zIndex:          20,
              display:         "flex",
              alignItems:      "flex-start",
              gap:             Math.max(4, Math.round(6 * hudPxPerCanvasPx)),
              pointerEvents:   "none",
            }}
          >
            {[0, 1, 2].map((i) => (
              <Heart key={i} size={heartSize} />
            ))}
          </div>

          {/* ── State overlays ── */}
          <AnimatePresence>
            {/* Dead overlay */}
            {gameState === "dead" && (
              <motion.div
                key="dead"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "rgba(180,0,0,0.45)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  pointerEvents: "none",
                }}
              >
                <motion.div
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 280, damping: 18 }}
                  style={{
                    fontFamily: FONT,
                    fontSize: "clamp(12px, 2.5vw, 20px)",
                    color: "#fff",
                    textShadow: "3px 3px 0 #000",
                    letterSpacing: "0.06em",
                    textAlign: "center",
                  }}
                >
                  ✕ TRY AGAIN
                </motion.div>
              </motion.div>
            )}

            {/* Win overlay */}
            {gameState === "won" && (
              <motion.div
                key="won"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "rgba(0,0,0,0.55)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  pointerEvents: "none",
                }}
              >
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 250, damping: 16, delay: 0.05 }}
                  style={{
                    fontFamily: FONT,
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    gap: 12,
                  }}
                >
                  <span
                    style={{
                      fontSize: "clamp(14px, 3vw, 24px)",
                      color: "#ffd700",
                      textShadow: "3px 3px 0 #5c2e00",
                      letterSpacing: "0.06em",
                    }}
                  >
                    ★ LEVEL CLEAR! ★
                  </span>
                  <span
                    style={{
                      fontSize: "clamp(7px, 1.4vw, 11px)",
                      color: "#52ff52",
                      letterSpacing: "0.06em",
                      animation: "marioBlink 0.9s step-end infinite",
                    }}
                  >
                    OPENING...
                  </span>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Controls hint bar — desktop only; removed on touch to save space */}
        {!isTouchDevice && (
          <div
            style={{
              fontFamily: FONT,
              background: "rgba(0,0,0,0.85)",
              border: "4px solid #c88000",
              borderTop: "none",
              boxShadow: "0 0 0 4px #5c2e00",
              padding: "8px 16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "clamp(12px, 2vw, 32px)",
              flexWrap: "wrap",
            }}
          >
            {[
              { keys: "← →",           action: "MOVE" },
              { keys: "SPACE / W / ↑", action: "JUMP" },
            ].map(({ keys: k, action }, i) => (
              <span key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span
                  style={{
                    fontSize: 8,
                    color: "#ffd700",
                    letterSpacing: "0.04em",
                    background: "rgba(255,255,255,0.1)",
                    border: "2px solid #555",
                    padding: "2px 6px",
                  }}
                >
                  {k}
                </span>
                <span style={{ fontSize: 7, color: "#aaa", letterSpacing: "0.04em" }}>
                  {action}
                </span>
              </span>
            ))}
          </div>
        )}

        {/* Virtual D-pad — touch devices only */}
        {isTouchDevice && (
          <div
            style={{
              background:      "rgba(0,0,0,0.85)",
              border:          "4px solid #c88000",
              borderTop:       "none",
              boxShadow:       "0 0 0 4px #5c2e00",
              padding:         "4px 8px",
              display:         "flex",
              alignItems:      "center",
              justifyContent:  "space-between",
            }}
          >
            {/* Left / Right */}
            <div style={{ display: "flex", gap: 10 }}>
              <DpadBtn
                label="◀"
                onActivate={() => { keysRef.current.left  = true;  }}
                onDeactivate={() => { keysRef.current.left  = false; }}
              />
              <DpadBtn
                label="▶"
                onActivate={() => { keysRef.current.right = true;  }}
                onDeactivate={() => { keysRef.current.right = false; }}
              />
            </div>

            {/* Jump */}
            <DpadBtn
              label="▲"
              wide
              onActivate={() => {
                if (!keysRef.current.held) {
                  keysRef.current.jump = true;
                  keysRef.current.held = true;
                }
              }}
              onDeactivate={() => {
                keysRef.current.jump = false;
                keysRef.current.held = false;
              }}
            />
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
