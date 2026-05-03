import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Hero from "./components/Hero";
import CardGrid from "./components/CardGrid";
import ResumeModal from "./components/ResumeModal";
import BioModal from "./components/BioModal";
import GameModal from "./components/GameModal";
import MarioBackground from "./components/MarioBackground";
import RotatePrompt from "./components/RotatePrompt";
import type { GameMode } from "./components/GameModeToggle";

type PendingWorld = {
  worldKey: string;
  worldTitle: string;
  href?: string;
  isResume?: boolean;
};

/**
 * Computes a zoom factor so the whole page fits within the visible viewport.
 * The page was designed for ~950 px of usable height (1080 p minus browser chrome).
 * Shrinks proportionally on laptops / smaller monitors; never scales above 1.
 */
function useViewportZoom(designHeight = 950, minZoom = 0.65): number {
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    const update = () => {
      // On touch/mobile devices the CSS zoom property interferes with the
      // viewport and fixed-position overlays — skip it entirely.
      const isMobile =
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        window.innerWidth < 768;
      if (isMobile) {
        setZoom(1);
        return;
      }
      const z = Math.min(1, window.innerHeight / designHeight);
      setZoom(Math.max(minZoom, z));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [designHeight, minZoom]);

  return zoom;
}

export default function App() {
  const [resumeOpen, setResumeOpen] = useState(false);
  const [bioOpen, setBioOpen] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<string>("mario");
  const [gameMode, setGameMode] = useState<GameMode>("view");
  const [pendingWorld, setPendingWorld] = useState<PendingWorld | null>(null);
  const [unlockedLevels, setUnlockedLevels] = useState<Set<string>>(new Set());

  const zoom = useViewportZoom();

  const handleGameStart = (scene: string, href?: string, isResume?: boolean) => {
    if (gameMode === "view") {
      if (isResume) setResumeOpen(true);
      else if (href) window.open(href, "_blank", "noopener,noreferrer");
      return;
    }
    // Already unlocked — skip the game and go straight to the link
    if (unlockedLevels.has(scene)) {
      if (isResume) setResumeOpen(true);
      else if (href) window.open(href, "_blank", "noopener,noreferrer");
      return;
    }
    const titleMap: Record<string, string> = {
      mountain: "GitHub Repos",
      forest:   "Hugging Face",
      castle:   "Resume",
      temple:   "SafrSight",
    };
    setPendingWorld({ worldKey: scene, worldTitle: titleMap[scene] ?? scene, href, isResume });
  };

  const handleWin = () => {
    if (!pendingWorld) return;
    const { worldKey, href, isResume } = pendingWorld;
    setUnlockedLevels(prev => new Set(prev).add(worldKey));
    setPendingWorld(null);
    if (isResume) setResumeOpen(true);
    else if (href) window.open(href, "_blank", "noopener,noreferrer");
  };

  const handleGameClose = () => {
    setPendingWorld(null);
  };

  return (
    <>
      <RotatePrompt />
      <MarioBackground />
      <main className="min-h-screen" style={{ paddingBottom: 8, zoom }}>
        <Hero
          gameMode={gameMode}
          onToggleMode={() => setGameMode(m => m === "view" ? "play" : "view")}
        />
        <CardGrid onGameStart={handleGameStart} onLakeClick={() => setBioOpen(true)} unlockedLevels={unlockedLevels} />
      </main>

      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
      <BioModal isOpen={bioOpen} onClose={() => setBioOpen(false)} />

      <AnimatePresence>
        {pendingWorld && (
          <GameModal
            key={pendingWorld.worldKey}
            worldKey={pendingWorld.worldKey}
            worldTitle={pendingWorld.worldTitle}
            selectedCharacter={selectedCharacter}
            onSelectCharacter={setSelectedCharacter}
            onWin={handleWin}
            onClose={handleGameClose}
          />
        )}
      </AnimatePresence>
    </>
  );
}
