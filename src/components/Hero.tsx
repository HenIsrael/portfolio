import { motion } from "framer-motion";
import GameModeToggle from "./GameModeToggle";
import type { GameMode } from "./GameModeToggle";

function PixelFace() {
  return (
    <img
      src="/profile.png"
      alt="Hen Israel"
      style={{
        width: 120,
        height: 120,
        objectFit: "cover",
        objectPosition: "top",
        flexShrink: 0,
        border: "3px solid #c88000",
        boxShadow: "0 0 0 2px #5c2e00",
        borderRadius: 4,
      }}
    />
  );
}

interface HeroProps {
  gameMode: GameMode;
  onToggleMode: () => void;
}

export default function Hero({ gameMode, onToggleMode }: HeroProps) {
  return (
    <motion.section
      className="flex flex-col items-center justify-center pt-3 pb-2 px-4 text-center"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      {/* Pixel score-board panel */}
      <div
        style={{
          fontFamily: '"Press Start 2P", monospace',
          background: "rgba(0, 0, 0, 0.55)",
          border: "4px solid #c88000",
          boxShadow: "0 0 0 4px #5c2e00, 0 8px 32px rgba(0,0,0,0.5)",
          padding: "0.5rem 2.5rem",
          imageRendering: "pixelated",
          maxWidth: 480,
          width: "100%",
        }}
      >
        {/* Score row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            color: "#fff",
            fontSize: 10,
            marginBottom: "0.5rem",
            letterSpacing: "0.05em",
            fontFamily: '"Press Start 2P", monospace',
          }}
        >
          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/hen-israel/"
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn"
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: 6,
              textDecoration: "none",
              color: "#0af",
              fontSize: 10,
              letterSpacing: "0.07em",
            }}
          >
            {/* Pixel LinkedIn icon */}
            <svg
              width="32"
              height="32"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              style={{ imageRendering: "pixelated", display: "block" }}
              shapeRendering="crispEdges"
            >
              <rect width="20" height="20" fill="#0a66c2" />
              <rect x="2" y="2" width="3" height="3" fill="#fff" />
              <rect x="2" y="7" width="3" height="10" fill="#fff" />
              <rect x="8" y="7" width="3" height="10" fill="#fff" />
              <rect x="11" y="7" width="3" height="3" fill="#fff" />
              <rect x="14" y="10" width="3" height="7" fill="#fff" />
            </svg>

            LINKEDIN
          </a>

          {/* Score */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              color: "#ffd700",
            }}
          >
            <span>SCORE</span>
            <span
              style={{
                display: "inline-block",
                transform: "translateY(-2.5px)",
              }}
            >
              ★
            </span>
            <span>1000000</span>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 3, background: "#c88000", marginBottom: "1.5rem" }} />

        {/* Name + portrait row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20 }}>
          <PixelFace />
          <div style={{ textAlign: "left" }}>
            <h1
              style={{
                fontSize: "clamp(18px, 4vw, 28px)",
                color: "#ffd700",
                textShadow: "3px 3px 0 #5c2e00",
                letterSpacing: "0.05em",
                margin: 0,
                lineHeight: 1.4,
              }}
            >
              HEN-ORI ISRAEL
            </h1>
            <p
              style={{
                marginTop: "0.5rem",
                marginBottom: 0,
                fontSize: "clamp(8px, 1.8vw, 11px)",
                color: "#52ff52",
                letterSpacing: "0.08em",
                lineHeight: 2,
              }}
            >
              SOFTWARE DEVELOPER
            </p>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 3, background: "#c88000", margin: "1.5rem 0" }} />

        {/* Mode toggle */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <GameModeToggle mode={gameMode} onToggle={onToggleMode} />
        </div>
      </div>
    </motion.section>
  );
}