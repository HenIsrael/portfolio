import { useState } from "react";
import Hero from "./components/Hero";
import CardGrid from "./components/CardGrid";
import ResumeModal from "./components/ResumeModal";

export default function App() {
  const [resumeOpen, setResumeOpen] = useState(false);

  return (
    <main className="min-h-screen">
      <Hero />
      <CardGrid onResumeClick={() => setResumeOpen(true)} />
      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
    </main>
  );
}
