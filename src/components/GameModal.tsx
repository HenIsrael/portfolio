import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { useGameEngine, CANVAS_W, CANVAS_H } from "../game/useGameEngine";
import MarioSprite from "./characters/MarioSprite";
import CookieMonsterSprite from "./characters/CookieMonsterSprite";

const isTouchDevice =
  typeof window !== "undefined" &&
  ("ontouchstart" in window || navigator.maxTouchPoints > 0);

/** Returns the current inner height and re-renders on orientation/resize. */
function useViewportHeight(): number {
  const [h, setH] = useState(() =>
    typeof window !== "undefined" ? window.innerHeight : 900
  );
  useEffect(() => {
    const update = () => setH(window.innerHeight);
    window.addEventListener("resize", update);
    window.addEventListener("orientationchange", update);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("orientationchange", update);
    };
  }, []);
  return h;
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
  const viewportH = useViewportHeight();

  // In landscape on a phone the viewport is ~390 px tall.
  // Reserve space for top strip (~32px), hint bar (~30px), d-pad (~92px),
  // borders/gaps (~20px) → 174px of non-canvas chrome.
  // Constrain the canvas maxWidth so everything fits without scrolling.
  const NON_CANVAS_H = 174;
  const isLandscapePhone = isTouchDevice && viewportH < 500;
  const canvasMaxWidth = isLandscapePhone
    ? `min(${Math.floor(Math.max(120, viewportH - NON_CANVAS_H) * (CANVAS_W / CANVAS_H))}px, calc(100vw - 32px))`
    : "min(800px, calc(100vw - 32px))";

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

          {/* Character selector — floating overlay centred at top of canvas */}
          <div
            style={{
              position:       "absolute",
              top:            isLandscapePhone ? 6 : 12,
              left:           "50%",
              // In landscape phone the canvas is ~216 px tall; scale the
              // overlay down so it doesn't eat half the play area.
              transform:      isLandscapePhone
                ? "translateX(-50%) scale(0.6)"
                : "translateX(-50%)",
              transformOrigin: "top center",
              zIndex:         20,
              display:        "flex",
              flexDirection:  "column",
              alignItems:     "center",
              gap:            6,
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
                      flexDirection:  "column",
                      alignItems:     "center",
                      justifyContent: "center",
                      gap:            3,
                      width:          80,
                      height:         80,
                      background:     isSelected ? "rgba(255,215,0,0.15)" : "transparent",
                      border:         isSelected ? "2px solid #ffd700" : "2px solid #555",
                      boxShadow:      isSelected ? "0 0 0 2px #c88000, 0 0 14px rgba(255,215,0,0.4)" : "none",
                      padding:        "4px 0",
                      cursor:         char.locked ? "not-allowed" : "pointer",
                      opacity:        char.locked ? 0.3 : 1,
                      transition:     "border 0.15s, box-shadow 0.15s, background 0.15s",
                      outline:        "none",
                      imageRendering: "pixelated",
                      fontFamily:     FONT,
                      flexShrink:     0,
                    }}
                  >
                    <div style={{ width: 32, height: 40, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {char.locked ? (
                        <span style={{ filter: "grayscale(1)", fontSize: 18 }}>🔒</span>
                      ) : char.id === "cookie-monster" ? (
                        <CookieMonsterSprite size={32} />
                      ) : (
                        <MarioSprite size={32} />
                      )}
                    </div>
                    <span
                      style={{
                        fontSize:    6,
                        color:       isSelected ? "#ffd700" : "#666",
                        letterSpacing: "0.05em",
                        textAlign:   "center",
                        lineHeight:  1.4,
                        height:      16,
                        overflow:    "hidden",
                        display:     "flex",
                        flexDirection: "column",
                        alignItems:  "center",
                        justifyContent: "center",
                      }}
                    >
                      {char.label.split(" ").map((word, i) => (
                        <div key={i}>{word}</div>
                      ))}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* 3 smooth SVG hearts */}
            <div style={{ display: "flex", gap: 8 }}>
              {[0, 1, 2].map((i) => (
                <Heart key={i} />
              ))}
            </div>
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

        {/* Controls hint bar */}
        <div
          style={{
            fontFamily: FONT,
            background: "rgba(0,0,0,0.85)",
            border: "4px solid #c88000",
            borderTop: "none",
            boxShadow: isTouchDevice ? "none" : "0 0 0 4px #5c2e00",
            padding: "8px 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "clamp(12px, 2vw, 32px)",
            flexWrap: "wrap",
          }}
        >
          {isTouchDevice ? (
            <span style={{ fontSize: 7, color: "#aaa", letterSpacing: "0.06em" }}>
              USE BUTTONS BELOW TO MOVE &amp; JUMP
            </span>
          ) : (
            [
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
            ))
          )}
        </div>

        {/* Virtual D-pad — touch devices only */}
        {isTouchDevice && (
          <div
            style={{
              background:      "rgba(0,0,0,0.85)",
              border:          "4px solid #c88000",
              borderTop:       "none",
              boxShadow:       "0 0 0 4px #5c2e00",
              padding:         "14px 20px",
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
