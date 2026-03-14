import { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { useGameEngine, CANVAS_W, CANVAS_H } from "../game/useGameEngine";

interface GameModalProps {
  worldKey: string;
  worldTitle: string;
  onWin: () => void;
  onClose: () => void;
}

const FONT = '"Press Start 2P", monospace';

export default function GameModal({ worldKey, worldTitle, onWin, onClose }: GameModalProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { gameState } = useGameEngine(canvasRef, worldKey, onWin);

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
        {/* Title bar */}
        <div
          style={{
            fontFamily: FONT,
            background: "rgba(0,0,0,0.85)",
            border: "4px solid #c88000",
            borderBottom: "none",
            boxShadow: "0 0 0 4px #5c2e00",
            padding: "10px 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
          }}
        >
          <span style={{ fontSize: 9, color: "#ffd700", letterSpacing: "0.08em" }}>
            ► {worldTitle.toUpperCase()}
          </span>
          <span style={{ fontSize: 8, color: "#52ff52", letterSpacing: "0.05em" }}>
            COLLECT ALL COINS TO WIN
          </span>
          <button
            onClick={onClose}
            style={{
              background: "rgba(255,255,255,0.1)",
              border: "2px solid #555",
              color: "#aaa",
              cursor: "pointer",
              width: 28,
              height: 28,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 0,
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

        {/* Canvas wrapper */}
        <div style={{ position: "relative" }}>
          <canvas
            ref={canvasRef}
            width={CANVAS_W}
            height={CANVAS_H}
            style={{
              display: "block",
              maxWidth: "min(800px, calc(100vw - 32px))",
              width: "100%",
              height: "auto",
              imageRendering: "pixelated",
              border: "4px solid #c88000",
              boxShadow: "0 0 0 4px #5c2e00",
              outline: "none",
            }}
          />

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
            { keys: "← →",             action: "MOVE" },
            { keys: "SPACE / W / ↑",   action: "JUMP" },
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
      </motion.div>
    </motion.div>
  );
}
