import { motion } from "framer-motion";

export default function Hero() {
  return (
    <motion.section
      className="flex flex-col items-center justify-center pt-24 pb-16 px-4 text-center"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      {/* Pixel score-board panel */}
      <div
        style={{
          fontFamily: '"Press Start 2P", monospace',
          background: "rgba(0,0,0,0.55)",
          border: "4px solid #c88000",
          boxShadow: "0 0 0 4px #5c2e00, 0 8px 32px rgba(0,0,0,0.5)",
          padding: "2rem 2.5rem",
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
            color: "#fff",
            fontSize: 10,
            marginBottom: "1.5rem",
            letterSpacing: "0.05em",
          }}
        >
          <span>SCORE</span>
          <span style={{ color: "#ffd700" }}>★ 1000000</span>
          <span>TIME <span style={{ color: "#ffd700" }}>∞</span></span>
        </div>

        {/* Divider */}
        <div style={{ height: 3, background: "#c88000", marginBottom: "1.5rem" }} />

        {/* Name */}
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
          HEN ISRAEL
        </h1>

        {/* Role */}
        <p
          style={{
            marginTop: "1rem",
            fontSize: "clamp(8px, 1.8vw, 11px)",
            color: "#52ff52",
            letterSpacing: "0.08em",
            lineHeight: 2,
          }}
        >
          SOFTWARE DEVELOPER
        </p>

        {/* Divider */}
        <div style={{ height: 3, background: "#c88000", margin: "1.5rem 0" }} />

        {/* Press-start prompt */}
        <p
          style={{
            fontSize: 9,
            color: "#fff",
            letterSpacing: "0.1em",
            animation: "marioBlink 1.1s step-end infinite",
            margin: 0,
          }}
        >
          ▼ SELECT YOUR LEVEL ▼
        </p>
      </div>

      {/* Coin row under panel */}
      <div style={{ display: "flex", gap: 12, marginTop: "1.5rem" }}>
        {["🪙", "🪙", "🪙"].map((c, i) => (
          <span
            key={i}
            style={{
              fontSize: 20,
              animation: `marioSparkle ${1.2 + i * 0.2}s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`,
            }}
          >
            {c}
          </span>
        ))}
      </div>
    </motion.section>
  );
}
