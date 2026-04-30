import { motion, AnimatePresence } from "framer-motion";
import { FaEnvelope, FaLinkedin, FaGithub, FaMapMarkerAlt } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

interface BioModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FONT = '"Press Start 2P", monospace';
const GOLD = "#c88000";
const GOLD2 = "#5c2e00";
const GREEN = "#52ff52";
const CYAN = "#52d8ff";

export default function BioModal({ isOpen, onClose }: BioModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="bio-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.80)",
              backdropFilter: "blur(4px)",
              zIndex: 200,
            }}
          />

          {/* Centered overlay — flex keeps panel in viewport middle; pointer-events pass through to backdrop */}
          <div
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 201,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 20,
              boxSizing: "border-box",
              pointerEvents: "none",
            }}
          >
          <motion.div
            key="bio-panel"
            initial={{ opacity: 0, scale: 0.9, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 24 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            style={{
              pointerEvents: "auto",
              width: "clamp(320px, 94vw, 560px)",
              maxHeight: "calc(100vh - 40px)",
              overflowY: "auto",
              background: "#0d1a2b",
              border: `4px solid ${GOLD}`,
              boxShadow: `0 0 0 4px ${GOLD2}, 0 12px 60px ${GOLD}55, inset 0 0 60px rgba(200,128,0,0.04)`,
              padding: "2rem 2rem 2.5rem",
              scrollbarWidth: "thin",
              scrollbarColor: `${GOLD} transparent`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top bar */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <span style={{ fontFamily: FONT, fontSize: 9, color: GREEN, letterSpacing: "0.08em" }}>
                ★ ABOUT THE HERO
              </span>
              <button
                onClick={onClose}
                aria-label="Close about"
                style={{
                  fontFamily: FONT,
                  fontSize: 10,
                  color: "#fff",
                  background: "rgba(92,46,0,0.7)",
                  border: `2px solid ${GOLD}`,
                  padding: "4px 8px",
                  cursor: "pointer",
                  lineHeight: 1,
                  boxShadow: "2px 2px 0 rgba(0,0,0,0.5)",
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <IoClose size={14} />
                <span style={{ fontSize: 8 }}>ESC</span>
              </button>
            </div>

            {/* Divider */}
            <div style={{ height: 3, background: `linear-gradient(to right, transparent, ${GOLD}, transparent)`, marginBottom: 24 }} />

            {/* Profile row */}
            <div style={{ display: "flex", gap: 22, alignItems: "flex-start", marginBottom: 28 }}>
              <div
                style={{
                  flexShrink: 0,
                  width: 96,
                  height: 96,
                  border: `3px solid ${GOLD}`,
                  boxShadow: `0 0 0 2px ${GOLD2}, 0 0 20px ${GOLD}44`,
                  overflow: "hidden",
                  imageRendering: "pixelated",
                }}
              >
                <img
                  src="/profile.png"
                  alt="Hen Israel"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <h2
                  style={{
                    fontFamily: FONT,
                    fontSize: 13,
                    color: "#fff",
                    margin: 0,
                    marginBottom: 8,
                    letterSpacing: "0.05em",
                    lineHeight: 1.6,
                    textShadow: `0 0 20px ${GOLD}88, 2px 2px 0 rgba(0,0,0,0.8)`,
                  }}
                >
                  HEN ISRAEL
                </h2>
                <p
                  style={{
                    fontFamily: FONT,
                    fontSize: 9,
                    color: CYAN,
                    margin: 0,
                    marginBottom: 12,
                    letterSpacing: "0.01em",
                    lineHeight: 1.8,
                  }}
                >
                  Junior Software Engineer
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {[
                    {
                      icon: FaEnvelope,
                      label: "hen.israel1@gmail.com",
                      href: "mailto:hen.israel1@gmail.com",
                    },
                    {
                      icon: FaLinkedin,
                      label: "linkedin.com/in/hen-israel",
                      href: "https://www.linkedin.com/in/hen-israel/",
                    },
                    {
                      icon: FaGithub,
                      label: "github.com/HenIsrael",
                      href: "https://github.com/HenIsrael",
                    },
                    {
                      icon: FaMapMarkerAlt,
                      label: "Israel",
                      href: undefined,
                    },
                  ].map(({ icon: Icon, label, href }) =>
                    href ? (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                          fontFamily: "'Raleway', sans-serif",
                          fontSize: 13,
                          color: GOLD,
                          textDecoration: "none",
                        }}
                      >
                        <Icon size={11} style={{ flexShrink: 0, color: GOLD }} />
                        {label}
                      </a>
                    ) : (
                      <span
                        key={label}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                          fontFamily: "'Raleway', sans-serif",
                          fontSize: 13,
                          color: "#8090a0",
                        }}
                      >
                        <Icon size={11} style={{ flexShrink: 0, color: "#8090a0" }} />
                        {label}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Bio block — same inset style as ResumeModal */}
            <div
              style={{
                marginBottom: 24,
                padding: "12px 14px",
                background: "rgba(255,255,255,0.035)",
                border: "1px solid rgba(200,128,0,0.2)",
                borderLeft: `3px solid ${GOLD}`,
              }}
            >
              <p
                style={{
                  fontFamily: "'Raleway', sans-serif",
                  fontSize: 15,
                  fontWeight: 300,
                  color: "#b8c8d8",
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                Junior Software Engineer with a B.Sc. in Computer Science from the Technion and 2 years of
                experience as a Computer Vision Engineer Intern at Rafael. Proven ability to learn new
                technologies quickly, take ownership of systems, and work effectively in complex,
                multi-team environments.
              </p>
            </div>

            {/* Stats — SkillChip-style like ResumeModal */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: 10,
              }}
            >
              {[
                { label: "DEGREE", value: "B.Sc CS" },
                { label: "EXPERIENCE", value: "2 YRS" },
                { label: "LOCATION", value: "ISRAEL" },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  style={{
                    padding: "10px 8px",
                    textAlign: "center",
                    background: "rgba(200,128,0,0.12)",
                    border: `1px solid ${GOLD}55`,
                    boxShadow: "2px 2px 0 rgba(0,0,0,0.35)",
                  }}
                >
                  <div
                    style={{
                      fontFamily: FONT,
                      fontSize: 6,
                      color: "#6070a0",
                      marginBottom: 6,
                      letterSpacing: "0.08em",
                    }}
                  >
                    {label}
                  </div>
                  <div style={{ fontFamily: FONT, fontSize: 8, color: GOLD }}>{value}</div>
                </div>
              ))}
            </div>

            <div style={{ height: 2, background: `linear-gradient(to right, transparent, ${GOLD}66, transparent)`, marginTop: 24 }} />
          </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
