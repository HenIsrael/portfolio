import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Hero from "./components/Hero";
import CardGrid from "./components/CardGrid";
import ResumeModal from "./components/ResumeModal";
import GameModal from "./components/GameModal";
import MarioBackground from "./components/MarioBackground";
import type { GameMode } from "./components/GameModeToggle";

type PendingWorld = {
  worldKey: string;
  worldTitle: string;
  href?: string;
  isResume?: boolean;
};

export default function App() {
  const [resumeOpen, setResumeOpen] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<string>("mario");
  const [gameMode, setGameMode] = useState<GameMode>("view");
  const [pendingWorld, setPendingWorld] = useState<PendingWorld | null>(null);

  const handleGameStart = (scene: string, href?: string, isResume?: boolean) => {
    if (gameMode === "view") {
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
    const { href, isResume } = pendingWorld;
    setPendingWorld(null);
    if (isResume) setResumeOpen(true);
    else if (href) window.open(href, "_blank", "noopener,noreferrer");
  };

  const handleGameClose = () => {
    setPendingWorld(null);
  };

  return (
    <>
      <MarioBackground />
      <main className="min-h-screen" style={{ paddingBottom: 8 }}>
        <Hero
          gameMode={gameMode}
          onToggleMode={() => setGameMode(m => m === "view" ? "play" : "view")}
        />
        <CardGrid onGameStart={handleGameStart} />
        <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
      </main>

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
