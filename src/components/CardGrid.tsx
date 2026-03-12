import { FaGithub } from "react-icons/fa";
import { SiHuggingface } from "react-icons/si";
import { HiDocumentText } from "react-icons/hi2";
import { MdSecurity } from "react-icons/md";
import LevelCard from "./LevelCard";
import type { LevelCardProps } from "./LevelCard";

interface CardGridProps {
  onResumeClick: () => void;
}

type CardData = Omit<LevelCardProps, "index" | "onClick"> & {
  isResume?: boolean;
  description: string;
};

const cards: CardData[] = [
  {
    title:       "GitHub Repos",
    description: "Browse my open-source projects and contributions on GitHub.",
    icon:        FaGithub,
    accentColor: "#7ab8f0",
    href:        "https://github.com/HenIsrael?tab=repositories",
    scene:       "mountain",
  },
  {
    title:       "Hugging Face",
    description: "Explore my machine-learning demos and models on Hugging Face.",
    icon:        SiHuggingface,
    accentColor: "#fbbf24",
    href:        "https://huggingface.co/henIsrael/spaces",
    scene:       "forest",
  },
  {
    title:       "Resume",
    description: "View my professional experience, skills, and education.",
    icon:        HiDocumentText,
    accentColor: "#c09ee8",
    scene:       "castle",
    isResume:    true,
  },
  {
    title:       "SafrSight",
    description: "A real-time web violence detection application powered by AI.",
    icon:        MdSecurity,
    accentColor: "#f0c84c",
    href:        "https://safrsight.vercel.app/",
    scene:       "temple",
  },
];

export default function CardGrid({ onResumeClick }: CardGridProps) {
  return (
    <section className="mx-auto w-full max-w-3xl px-4 pb-28">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-16 pt-4">
        {cards.map((card, i) => (
          <LevelCard
            key={card.title}
            index={i}
            title={card.title}
            description={card.description}
            icon={card.icon}
            accentColor={card.accentColor}
            href={card.isResume ? undefined : card.href}
            scene={card.scene}
            onClick={card.isResume ? onResumeClick : undefined}
          />
        ))}
      </div>
    </section>
  );
}
