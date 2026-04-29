import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Full-screen overlay shown on small screens (phones) while they are in
 * portrait orientation.  Disappears automatically when the user rotates
 * to landscape, or when the viewport is wide enough to be a tablet/desktop.
 *
 * "Small phone" threshold: width < 768 px AND height > width (portrait).
 */
function useIsPortraitPhone(): boolean {
  const check = () =>
    window.innerWidth < 768 && window.innerWidth < window.innerHeight;

  const [show, setShow] = useState(check);

  useEffect(() => {
    const update = () => setShow(check());
    window.addEventListener("resize", update);
    window.addEventListener("orientationchange", update);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("orientationchange", update);
    };
  }, []);

  return show;
}

/* ── Pixel-art phone SVG ─────────────────────────────────── */
function PixelPhone({ rotated }: { rotated: boolean }) {
  return (
    <svg
      width="48"
      height="80"
      viewBox="0 0 12 20"
      style={{
        imageRendering: "pixelated",
        transform: rotated ? "rotate(90deg)" : "rotate(0deg)",
        transition: "transform 0.4s ease",
      }}
    >
      {/* Body */}
      <rect x="1" y="0" width="10" height="20" rx="0" fill="#222" />
      <rect x="2" y="1" width="8"  height="18" fill="#111" />
      {/* Screen */}
      <rect x="2" y="3" width="8"  height="12" fill="#3898f0" />
      {/* Screen shine */}
      <rect x="3" y="4" width="2"  height="3"  fill="#88cfff" opacity="0.5" />
      {/* Home button */}
      <rect x="4" y="17" width="4" height="2"  fill="#333" />
      <rect x="5" y="17" width="2" height="2"  fill="#444" />
      {/* Speaker */}
      <rect x="4" y="1"  width="4" height="1"  fill="#333" />
    </svg>
  );
}

/* ── Rotating arrow arc (pixel-art style) ────────────────── */
function RotateArrow() {
  return (
    <motion.div
      animate={{ rotate: [0, 25, 0] }}
      transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
      style={{ display: "inline-block" }}
    >
      <svg
        width="56"
        height="56"
        viewBox="0 0 14 14"
        style={{ imageRendering: "pixelated" }}
      >
        {/* Arc — chunky pixel segments going clockwise */}
        <rect x="4"  y="1"  width="6"  height="2" fill="#ffd700" />
        <rect x="10" y="3"  width="2"  height="4" fill="#ffd700" />
        <rect x="8"  y="7"  width="2"  height="2" fill="#ffd700" />
        {/* Arrow head pointing down-left */}
        <rect x="5"  y="9"  width="4"  height="2" fill="#ffd700" />
        <rect x="4"  y="8"  width="2"  height="2" fill="#ffd700" />
        <rect x="3"  y="10" width="2"  height="2" fill="#ffd700" />
        {/* Inner cut-out to make it look like an open arc */}
        <rect x="5"  y="3"  width="4"  height="4" fill="transparent" />
      </svg>
    </motion.div>
  );
}

export default function RotatePrompt() {
  const show = useIsPortraitPhone();
  const [phoneRotated, setPhoneRotated] = useState(false);

  /* Animate phone tipping over to hint the gesture */
  useEffect(() => {
    if (!show) return;
    const id = setInterval(() => setPhoneRotated(v => !v), 1200);
    return () => clearInterval(id);
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="rotate-prompt"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            position:       "fixed",
            inset:          0,
            zIndex:         9999,
            background:     "#5c94fc",
            display:        "flex",
            flexDirection:  "column",
            alignItems:     "center",
            justifyContent: "center",
            gap:            24,
          }}
        >
          {/* Pixel scanline overlay */}
          <div
            style={{
              position:   "absolute",
              inset:      0,
              background: "repeating-linear-gradient(0deg, rgba(0,0,0,0.07) 0px, rgba(0,0,0,0.07) 1px, transparent 1px, transparent 4px)",
              pointerEvents: "none",
            }}
          />

          {/* Card */}
          <div
            style={{
              background: "rgba(0,0,0,0.55)",
              border:     "4px solid #c88000",
              boxShadow:  "0 0 0 4px #5c2e00, 0 8px 32px rgba(0,0,0,0.5)",
              padding:    "32px 40px",
              display:    "flex",
              flexDirection: "column",
              alignItems:    "center",
              gap:           20,
              maxWidth:      280,
              width:         "85%",
            }}
          >
            {/* Phone animation */}
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <PixelPhone rotated={phoneRotated} />
              <RotateArrow />
            </div>

            {/* Divider */}
            <div style={{ width: "100%", height: 3, background: "#c88000" }} />

            {/* Text */}
            <p
              style={{
                fontFamily:    '"Press Start 2P", monospace',
                fontSize:      9,
                color:         "#ffd700",
                textAlign:     "center",
                lineHeight:    2,
                margin:        0,
                textShadow:    "2px 2px 0 #5c2e00",
                letterSpacing: "0.04em",
              }}
            >
              ROTATE YOUR<br />DEVICE
            </p>

            <p
              style={{
                fontFamily: '"Press Start 2P", monospace',
                fontSize:   7,
                color:      "#52ff52",
                textAlign:  "center",
                lineHeight: 2,
                margin:     0,
                letterSpacing: "0.04em",
              }}
            >
              BEST VIEWED<br />IN LANDSCAPE
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
