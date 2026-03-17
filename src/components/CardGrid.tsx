import { FaGithub } from "react-icons/fa";
import { SiHuggingface } from "react-icons/si";
import { HiDocumentText } from "react-icons/hi2";
import { MdSecurity } from "react-icons/md";
import LevelCard from "./LevelCard";
import type { LevelCardProps } from "./LevelCard";
interface CardGridProps {
  onGameStart: (scene: string, href?: string, isResume?: boolean) => void;
}

type CardData = Omit<LevelCardProps, "index" | "onGameStart"> & {
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

const DIAMOND_POSITIONS: { card: CardData; col: number; row: number }[] = [
  { card: cards[2], col: 2, row: 1 }, // Resume     — top center
  { card: cards[0], col: 1, row: 2 }, // GitHub     — middle left
  { card: cards[1], col: 3, row: 2 }, // Hugging Face — middle right
  { card: cards[3], col: 2, row: 3 }, // SafrSight  — bottom center
];

export default function CardGrid({ onGameStart }: CardGridProps) {
  return (
    <section className="mx-auto w-full max-w-3xl px-4 pb-2">
      <div
        style={{
          display:             "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gridTemplateRows:    "auto auto auto",
          rowGap:              "0px",
          columnGap:           "0px",
          paddingTop:          "0px"
        }}
      >
        {DIAMOND_POSITIONS.map(({ card, col, row }, i) => (
          <div
            key={card.title}
            style={{ 
              gridColumn: col, 
              gridRow: row,
              marginBottom: row === 1 ? "-100px" : undefined, // pull top card down
              marginTop: row === 3 ? "-100px" : undefined,    // pull bottom card up
             }}
          >
            <LevelCard
              index={i}
              title={card.title}
              description={card.description}
              icon={card.icon}
              accentColor={card.accentColor}
              href={card.href}
              isResume={card.isResume}
              scene={card.scene}
              onGameStart={onGameStart}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
