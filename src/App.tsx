import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Hero from "./components/Hero";
import CardGrid from "./components/CardGrid";
import ResumeModal from "./components/ResumeModal";
import GameModal from "./components/GameModal";
import MarioBackground from "./components/MarioBackground";

type PendingWorld = {
  worldKey: string;
  worldTitle: string;
  href?: string;
  isResume?: boolean;
};

export default function App() {
  const [resumeOpen, setResumeOpen] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null);
  const [pendingWorld, setPendingWorld] = useState<PendingWorld | null>(null);

  const handleGameStart = (scene: string, href?: string, isResume?: boolean) => {
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
      <main className="min-h-screen" style={{ paddingBottom: 120 }}>
        <Hero
          selectedCharacter={selectedCharacter}
          onSelectCharacter={setSelectedCharacter}
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
            onWin={handleWin}
            onClose={handleGameClose}
          />
        )}
      </AnimatePresence>
    </>
  );
}
