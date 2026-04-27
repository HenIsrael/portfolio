import { motion, AnimatePresence } from "framer-motion";
import {
  SiPython, SiCplusplus, SiJavascript, SiTensorflow, SiPytorch, SiOpencv,
  SiReact, SiNodedotjs, SiDocker, SiGit, SiRender, SiVercel, SiJira,
  SiFastapi,
} from "react-icons/si";
import { FaScroll, FaGraduationCap, FaCode, FaShieldAlt, FaStar, FaExternalLinkAlt } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FONT = '"Press Start 2P", monospace';
const GOLD  = "#c88000";
const GOLD2 = "#5c2e00";
const GREEN = "#52ff52";
const CYAN  = "#52d8ff";

/* ── Pixel section heading ── */
function SectionHeading({ label, icon: Icon }: { label: string; icon: React.ElementType }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
      <div
        style={{
          background: GOLD,
          border: `2px solid ${GOLD2}`,
          boxShadow: "2px 2px 0 rgba(0,0,0,0.6)",
          padding: "4px 6px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon size={13} color="#000" />
      </div>
      <span style={{ fontFamily: FONT, fontSize: 10, color: GOLD, letterSpacing: "0.1em" }}>
        {label}
      </span>
      <div style={{ flex: 1, height: 2, background: `linear-gradient(to right, ${GOLD}88, transparent)` }} />
    </div>
  );
}

/* ── XP-bar style skill chip ── */
function SkillChip({ label, icon: Icon }: { label: string; icon?: React.ElementType }) {
  return (
    <div
      style={{
        display:    "inline-flex",
        alignItems: "center",
        gap:        5,
        background: "rgba(200,128,0,0.12)",
        border:     `1px solid ${GOLD}55`,
        padding:    "4px 9px",
        fontFamily: "'Raleway', sans-serif",
        fontSize:   11,
        color:      "#d8c090",
        whiteSpace: "nowrap",
      }}
    >
      {Icon && <Icon size={12} color={GOLD} />}
      {label}
    </div>
  );
}

/* ── Timeline entry ── */
function TimelineEntry({
  role, org, period, bullets,
}: {
  role: string; org: string; period: string; bullets: string[]; logo?: React.ReactNode;
}) {
  return (
    <div style={{ marginBottom: 20 }}>
      {/* Role + right column (period) */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 6, marginBottom: 4 }}>
        <span style={{ fontFamily: "'Raleway', sans-serif", fontSize: 15, fontWeight: 700, color: "#fff" }}>
          {role}
        </span>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
          <span style={{ fontFamily: FONT, fontSize: 9, color: GOLD, whiteSpace: "nowrap" }}>{period}</span>
        </div>
      </div>
      {/* Organisation */}
      <div style={{ fontFamily: "'Raleway', sans-serif", fontSize: 12, fontWeight: 200, color: CYAN, marginBottom: 8 }}>
        {org}
      </div>
      {/* Bullets */}
      <ul style={{ margin: 0, paddingLeft: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 5 }}>
        {bullets.map((b, i) => (
          <li key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
            <span style={{ color: GOLD, fontFamily: FONT, fontSize: 7, marginTop: 3, flexShrink: 0 }}>▸</span>
            <span style={{ fontFamily: "'Raleway', sans-serif", fontSize: 15, fontWeight: 300, color: "#b8c8d8", lineHeight: 1.7 }}>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="resume-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            style={{
              position: "fixed", inset: 0,
              background: "rgba(0,0,0,0.80)",
              backdropFilter: "blur(4px)",
              zIndex: 200,
            }}
          />

          {/* Panel */}
          <motion.div
            key="resume-panel"
            initial={{ opacity: 0, scale: 0.9, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 24 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            style={{
              position:  "fixed",
              top:       "20px",
              left:      "50%",
              x:         "-50%",
              zIndex:    201,
              width: "clamp(320px, 95vw, 1200px)",
              maxHeight: "calc(100vh - 40px)",
              overflowY: "auto",
              background: "rgba(10, 8, 20, 0.97)",
              border:     `4px solid ${GOLD}`,
              boxShadow:  `0 0 0 4px ${GOLD2}, 0 12px 60px ${GOLD}55, inset 0 0 60px rgba(200,128,0,0.04)`,
              padding:    "2rem 2rem 2.5rem",
              scrollbarWidth: "thin",
              scrollbarColor: `${GOLD} transparent`,
            }}
          >
            {/* ── TOP BAR ── */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <span style={{ fontFamily: FONT, fontSize: 9, color: GREEN, letterSpacing: "0.08em" }}>
                ★ PLAYER PROFILE
              </span>
              <button
                onClick={onClose}
                aria-label="Close resume"
                style={{
                  fontFamily: FONT, fontSize: 10, color: "#fff",
                  background: "rgba(92,46,0,0.7)",
                  border: `2px solid ${GOLD}`,
                  padding: "4px 8px", cursor: "pointer",
                  lineHeight: 1,
                  boxShadow: "2px 2px 0 rgba(0,0,0,0.5)",
                  display: "flex", alignItems: "center", gap: 4,
                }}
              >
                <IoClose size={14} />
                <span style={{ fontSize: 8 }}>ESC</span>
              </button>
            </div>

            {/* Divider */}
            <div style={{ height: 3, background: `linear-gradient(to right, transparent, ${GOLD}, transparent)`, marginBottom: 24 }} />

            {/* ── HERO HEADER ── */}
            <div style={{ marginBottom: 28 }}>
              <h1 style={{
                fontFamily: FONT, fontSize: 18, color: "#fff",
                letterSpacing: "0.05em", margin: 0, marginBottom: 10,
                textShadow: `0 0 20px ${GOLD}88, 2px 2px 0 rgba(0,0,0,0.8)`,
              }}>
                HEN ORI ISRAEL
              </h1>
              <p style={{
                fontFamily: FONT, fontSize: 11,
                color: CYAN, margin: 0, marginBottom: 10, letterSpacing: "0.01em",
              }}>
                Junior Software Engineer
              </p>
              {/* Contact row */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 20px" }}>
                {[
                  { label: "hheenn20@gmail.com" },
                  { label: "+972 526399508" },
                  {
                    label: "linkedin.com/in/hen-israel",
                    href: "https://www.linkedin.com/in/hen-israel",
                  },
                ].map(({ label, href }) =>
                  href ? (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontFamily:"'Raleway', sans-serif", fontSize: 13,
                        color: GOLD, textDecoration: "none",
                        display: "inline-flex", alignItems: "center", gap: 4,
                      }}
                    >
                      <FaExternalLinkAlt size={9} />
                      {label}
                    </a>
                  ) : (
                    <span
                      key={label}
                      style={{ fontFamily: "'Raleway', sans-serif", fontSize: 13, color: "#8090a0" }}
                    >
                      {label}
                    </span>
                  )
                )}
              </div>

              {/* Bio */}
              <div style={{
                marginTop: 16, padding: "12px 14px",
                background: "rgba(255,255,255,0.035)",
                border: "1px solid rgba(200,128,0,0.2)",
                borderLeft: `3px solid ${GOLD}`,
              }}>
                <p style={{fontFamily: "'Raleway', sans-serif", fontSize: 15, fontWeight: 300, color: "#b8c8d8", lineHeight: 1.7}}>
                  Junior Software Engineer with a B.Sc. in Computer Science from the Technion and 2 years of
                  experience as a Computer Vision Engineer Intern at Rafael. Proven ability to learn new technologies
                  quickly, take ownership of systems, and work effectively in complex, multi-team environments.
                </p>
              </div>
            </div>

            {/* ── EXPERIENCE ── */}
            <div style={{ marginBottom: 28 }}>
              <SectionHeading label="QUESTS  ·  EXPERIENCE" icon={FaScroll} />
              <TimelineEntry
                role="Software Engineer — CV Team"
                org="Rafael Advanced Defense Systems"
                period="2022 – 2024"
                bullets={[
                  "Developed a real-time Python module for validating track consistency and detecting anomalies in estimated geospatial trajectories of GPS-denied systems, enhancing localization reliability within a parallel multi-team operational pipeline.",
                  "Implemented data ingestion pipelines for a raw experimental data platform, converting heterogeneous data into structured NoSQL schemas and indexing into Elasticsearch to enable fast scenario retrieval.",
                  "Executed field experiments and system integrations in collaboration with cross-functional teams to validate algorithms and support deployment readiness.",
                  "Maintained and contributed to GitLab-hosted projects and Docker container environments to support reproducible development and deployment workflows.",
                  "Integrated Computer Vision algorithms into large-scale projects, adapting models and pipelines to operational constraints and system interfaces.",
                ]}
              />
            </div>

            {/* ── PROJECTS ── */}
            <div style={{ marginBottom: 28 }}>
              <SectionHeading label="SIDE QUESTS  ·  PROJECTS" icon={FaCode} />
              <div style={{
                padding: "14px 16px",
                background: "rgba(255,255,255,0.03)",
                border: `1px solid ${GOLD}33`,
                borderTop: `3px solid ${GOLD}`,
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 6, marginBottom: 6 }}>
                  <span style={{ fontFamily: "'Raleway', sans-serif", fontSize: 15, fontWeight: 700, color: "#fff" }}>
                    SafrSight
                  </span>
                  <div style={{ display: "flex", gap: 10 }}>
                    <a
                      href="https://safrsight.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontFamily: FONT, fontSize: 9, color: GREEN, textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}
                    >
                      <FaExternalLinkAlt size={8} /> APP
                    </a>
                    <a
                      href="https://github.com/HenIsrael/violence-detection-web"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontFamily: FONT, fontSize: 9, color: CYAN, textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}
                    >
                      <FaExternalLinkAlt size={8} /> REPO
                    </a>
                  </div>
                </div>
                <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: 12, color: "#8090a8", margin: 0, marginBottom: 8, fontStyle: "italic" }}>
                  AI-Powered Violence Detection System
                </p>
                <ul style={{ margin: 0, paddingLeft: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 5 }}>
                  {[
                    "Developed and evaluated activity recognition models for violence detection using PyTorch TimeSformer and TensorFlow CNN-LSTM architectures, achieving 95% test accuracy.",
                    "Augmented violence detection outputs with a YOLO-based weapon detection model, adding post-hoc semantic explainability to improve interpretability and trust.",
                    "Built an end-to-end cloud-based system for video-based violence detection, developing RESTful APIs with FastAPI and integrating a React frontend and ML inference pipelines.",
                    "Deployed scalable services to production using Vercel, Render, and Hugging Face, enabling reliable model serving.",
                  ].map((b, i) => (
                    <li key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                      <span style={{ color: GOLD, fontFamily: FONT, fontSize: 7, marginTop: 3, flexShrink: 0 }}>▸</span>
                      <span style={{fontFamily: "'Raleway', sans-serif", fontSize: 15, fontWeight: 300, color: "#b8c8d8", lineHeight: 1.7}}>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* ── EDUCATION ── */}
            <div style={{ marginBottom: 28 }}>
              <SectionHeading label="LEVEL UP  ·  EDUCATION" icon={FaGraduationCap} />

              <TimelineEntry
                role="B.Sc. in Computer Science"
                org="Technion — Israel Institute of Technology"
                period="2019 – 2024"
                bullets={[
                  "Final Project: SafrSight – AI-Powered Violence Detection System.",
                  "Grade: 98 · Selected for the Outstanding Projects Competition.",
                ]}
              />
            </div>

             {/* ── INVOLVEMENT ── */}
             <div style={{ marginBottom: 28 }}>
              <SectionHeading label="GUILD  ·  INVOLVEMENT" icon={FaShieldAlt} />
              <div style={{
                padding: "14px 16px",
                background: "rgba(255,255,255,0.03)",
                border: `1px solid ${GOLD}33`,
                borderLeft: `3px solid ${GOLD}`,
              }}>
              {[
                {
                  role: 'Instructor',
                  org: '"Aharai!"',
                  period: "2019 – 2022",
                  bullets: ["Led and mentored youth groups preparing for meaningful military service, fostering leadership, resilience, and teamwork through structured physical and mental training programmes."],
                },
                {
                  role: "Fighter",
                  org: "IDF — Combat Engineering Unit",
                  period: "2011 – 2014",
                  bullets: ["Served in demanding, high-pressure operational environments, executing complex missions with precision."],
                },

              ].map((entry) => (
                <TimelineEntry key={entry.role} {...entry} />
              ))}
              </div>
            </div>


            {/* ── SKILLS ── */}
            <div style={{ marginBottom: 28 }}>
              <SectionHeading label="ABILITIES  ·  SKILLS" icon={FaStar} />
              {[
                {
                  category: "Languages",
                  items: [
                    { label: "Python",     icon: SiPython },
                    { label: "C++",        icon: SiCplusplus },
                    { label: "JavaScript", icon: SiJavascript },
                  ],
                },
                {
                  category: "ML / CV",
                  items: [
                    { label: "TensorFlow", icon: SiTensorflow },
                    { label: "PyTorch",    icon: SiPytorch },
                    { label: "OpenCV",     icon: SiOpencv },
                  ],
                },
                {
                  category: "Web Technologies",
                  items: [
                    { label: "React",     icon: SiReact },
                    { label: "Node.js",   icon: SiNodedotjs },
                    { label: "FastAPI",    icon: SiFastapi },

                  ],
                },
                {
                  category: "DevOps & Tools",
                  items: [
                    { label: "Docker",    icon: SiDocker },
                    { label: "Git",       icon: SiGit },
                    { label: "Render",    icon:  SiRender },
                    { label: "Vercel",    icon:SiVercel   },
                    { label: "Jira",      icon:SiJira},
                  ],
                },
                {
                  category: "Languages Spoken",
                  items: [
                    { label: "Hebrew — Native" },
                    { label: "English — Fluent" },
                  ],
                },
              ].map(({ category, items }) => (
                <div key={category} style={{ marginBottom: 12 }}>
                  <span style={{ fontFamily: FONT, fontSize: 7, color: "#6070a0", letterSpacing: "0.08em", display: "block", marginBottom: 7 }}>
                    {category}
                  </span>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {items.map((item) => (
                      <SkillChip key={item.label} label={item.label} icon={"icon" in item ? item.icon : undefined} />
                    ))}
                  </div>
                </div>
              ))}
            </div>

          
            {/* Bottom divider */}
            <div style={{ height: 2, background: `linear-gradient(to right, transparent, ${GOLD}66, transparent)`, marginTop: 8 }} />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
