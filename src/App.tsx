import { useState } from "react";
import Hero from "./components/Hero";
import CardGrid from "./components/CardGrid";
import ResumeModal from "./components/ResumeModal";
import MarioBackground from "./components/MarioBackground";

export default function App() {
  const [resumeOpen, setResumeOpen] = useState(false);

  return (
    <>
      <MarioBackground />
      <main className="min-h-screen" style={{ paddingBottom: 120 }}>
        <Hero />
        <CardGrid onResumeClick={() => setResumeOpen(true)} />
        <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
      </main>
    </>
  );
}
