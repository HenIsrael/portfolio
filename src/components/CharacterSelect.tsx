import { motion } from "framer-motion";
import MarioSprite from "./characters/MarioSprite";

interface CharacterSelectProps {
  selected: string | null;
  onSelect: (character: string) => void;
}

const FONT = '"Press Start 2P", monospace';

const LOCKED_SLOTS = ["???", "???"];

export default function CharacterSelect({ selected, onSelect }: CharacterSelectProps) {
  const isMarioSelected = selected === "mario";

  return (
    <div
      style={{
        fontFamily: FONT,
        marginTop: "1.5rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      {/* Header */}
      <p
        style={{
          fontSize: 8,
          color: "#52ff52",
          letterSpacing: "0.08em",
          margin: 0,
          textAlign: "center",
        }}
      >
        - CHOOSE YOUR CHARACTER -
      </p>

      {/* Character cards row */}
      <div style={{ display: "flex", gap: 16, alignItems: "flex-start", justifyContent: "center" }}>

        {/* Mario card */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
          {/* P1 indicator — only visible when selected */}
          <span
            style={{
              fontSize: 7,
              color: "#ffd700",
              opacity: isMarioSelected ? 1 : 0,
              transition: "opacity 0.15s",
              letterSpacing: "0.05em",
              height: 12,
            }}
          >
            ► P1
          </span>

          <motion.button
            onClick={() => onSelect("mario")}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: isMarioSelected
                ? "rgba(255,215,0,0.12)"
                : "rgba(0,0,0,0.45)",
              border: isMarioSelected
                ? "4px solid #ffd700"
                : "4px solid #555",
              boxShadow: isMarioSelected
                ? "0 0 0 4px #c88000, 0 0 20px rgba(255,215,0,0.35)"
                : "none",
              padding: "10px",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
              transition: "border 0.15s, box-shadow 0.15s, background 0.15s",
              outline: "none",
              imageRendering: "pixelated",
            }}
          >
            <MarioSprite size={56} />
            <span style={{ fontSize: 7, color: isMarioSelected ? "#ffd700" : "#aaa", letterSpacing: "0.05em" }}>
              MARIO
            </span>
          </motion.button>
        </div>

        {/* Locked slots */}
        {LOCKED_SLOTS.map((_, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            {/* spacer matching P1 height */}
            <span style={{ height: 12, display: "block" }} />

            <div
              style={{
                background: "rgba(0,0,0,0.35)",
                border: "4px solid #333",
                padding: "10px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
                opacity: 0.45,
                cursor: "not-allowed",
              }}
            >
              {/* Lock icon using pixel squares */}
              <div style={{ width: 56, height: 56, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 28, filter: "grayscale(1)" }}>🔒</span>
              </div>
              <span style={{ fontSize: 6, color: "#666", letterSpacing: "0.04em", textAlign: "center", lineHeight: 1.6 }}>
                COMING<br />SOON
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
