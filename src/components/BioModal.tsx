import { motion, AnimatePresence } from "framer-motion";
import {
  FaEnvelope,
  FaLinkedin,
  FaMapMarkerAlt,
  FaGraduationCap,
  FaBriefcase,
  FaPhone,
} from "react-icons/fa";
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
            <div style={{ display: "flex", gap: 22, alignItems: "stretch", marginBottom: 28 }}>
              <div
                style={{
                  flexShrink: 0,
                  width: 110,
                  border: `3px solid ${GOLD}`,
                  boxShadow: `0 0 0 2px ${GOLD2}, 0 0 20px ${GOLD}44`,
                  overflow: "hidden",
                  imageRendering: "pixelated",
                }}
              >
                <img
                  src="/profile.png"
                  alt="Hen Israel"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
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
                  HEN ORI ISRAEL
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
                      label: "hheenn20@gmail.com",
                      href: "mailto:hheenn20@gmail.com",
                    },
                    {
                      icon: FaLinkedin,
                      label: "linkedin.com/in/hen-israel",
                      href: "https://www.linkedin.com/in/hen-israel/",
                    },
                    {
                      icon: FaPhone,
                      label: "+972 526399508",
                      href: "tel:+972526399508",
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
              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                {/* Intro */}
                <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: 14, fontWeight: 300, color: "#b8c8d8", lineHeight: 1.75, margin: 0 }}>
                <span style={{ textShadow: `0 0 20px ${GOLD}88, 2px 2px 0 rgba(0,0,0,0.8)`, fontWeight: 800 }}>Welcome to my world!</span> Much like a classic platformer, my journey in tech has been about leveling up, unlocking new abilities, and navigating complex landscapes. I hold a B.Sc. in Computer Science from the <span style={{ color: CYAN, fontWeight: 600 }}>Technion</span>, where I built the foundation for my "power-ups" in engineering and problem-solving.
                </p>

                {/* Section: Quest Logs */}
                <div>
                  <div style={{ fontFamily: FONT, fontSize: 7, color: GOLD, letterSpacing: "0.1em", marginBottom: 6 }}>
                    THE QUEST LOGS
                  </div>
                  <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: 14, fontWeight: 300, color: "#b8c8d8", lineHeight: 1.75, margin: 0 }}>
                    My journey took me to <span style={{ color: CYAN, fontWeight: 600 }}>Rafael</span>, where I spent two years in the Computer Vision department. As part of the <span style={{ color: "#b8c8d8", fontWeight: 500 }}>Data Platform team</span>, I developed systems for efficiently uploading and retrieving field experiment data through precise, queryable pipelines. Along the way, I also contributed to a <span style={{ color: "#b8c8d8", fontWeight: 500 }}>Navigation Trajectory model</span>, tracking down path inconsistencies to ensure accurate and reliable system behavior.
                  </p>
                </div>

                {/* Section: Big Boss Battle */}
                <div>
                  <div style={{ fontFamily: FONT, fontSize: 7, color: GOLD, letterSpacing: "0.1em", marginBottom: 6 }}>
                    THE BIG BOSS BATTLE
                  </div>
                  <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: 14, fontWeight: 300, color: "#b8c8d8", lineHeight: 1.75, margin: 0 }}>
                    For my final quest at school, I stepped into the world of <span style={{ color: GREEN, fontWeight: 600 }}>Deep Learning</span>, building a model designed to detect violent behavior within video feeds. To bring this to life, I went full <span style={{ color: GREEN, fontWeight: 600 }}>Fullstack mode</span>, creating a web application that allows users to upload real videos and receive instant predictions. It's not just about the code; it's about building tools that make a real-world impact.
                  </p>
                </div>

                {/* Section: Inventory & Skills */}
                <div>
                  <div style={{ fontFamily: FONT, fontSize: 7, color: GOLD, letterSpacing: "0.1em", marginBottom: 6 }}>
                    INVENTORY & SKILLS
                  </div>
                  <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: 14, fontWeight: 300, color: "#b8c8d8", lineHeight: 1.75, margin: 0 }}>
                    My loadout centers around <span style={{ fontWeight: 800 }}>Computer Vision</span>, <span style={{ fontWeight: 800 }}>Fullstack Development</span>, and <span style={{ fontWeight: 800 }}>DevOps</span> — fields where I've gained hands-on experience and am continuously leveling up. I'm constantly grinding XP by learning new tools and improving existing ones, and I thrive in co-op mode — working with strong teams to tackle complex challenges and ship meaningful solutions.
                  </p>
                </div>

                {/* Section: Current Status */}
                <div style={{ background: "rgba(82,255,82,0.06)", border: "1px solid rgba(82,255,82,0.25)", borderLeft: `3px solid ${GREEN}`, padding: "10px 14px" }}>
                  <div style={{ fontFamily: FONT, fontSize: 7, color: GREEN, letterSpacing: "0.1em", marginBottom: 6 }}>
                    CURRENT STATUS
                  </div>
                  <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: 14, fontWeight: 400, color: "#b8c8d8", lineHeight: 1.75, margin: 0 }}>
                    <span style={{ color: GREEN }}>🟢 Open for a new quest.</span><br />
                    Ready to dive into the next challenge, grow as an engineer, and build impactful solutions with a great team.
                  </p>
                </div>
              </div>
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
                { label: "DEGREE", value: "B.Sc CS", Icon: FaGraduationCap },
                { label: "EXPERIENCE", value: "2 YRS", Icon: FaBriefcase },
                { label: "LOCATION", value: "ISRAEL", Icon: FaMapMarkerAlt },
              ].map(({ label, value, Icon }) => (
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
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 4,
                      fontFamily: FONT,
                      fontSize: 6,
                      color: "#6070a0",
                      marginBottom: 6,
                      letterSpacing: "0.08em",
                    }}
                  >
                    <Icon size={12} style={{ flexShrink: 0, marginBottom: 2 }} />
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
