import { FaGithub } from "react-icons/fa";
import { SiHuggingface } from "react-icons/si";
import { HiDocumentText } from "react-icons/hi2";
import { MdSecurity } from "react-icons/md";
import LevelCard from "./LevelCard";
import LakeCenter from "./LakeCenter";
import type { LevelCardProps } from "./LevelCard";
interface CardGridProps {
  onGameStart: (scene: string, href?: string, isResume?: boolean) => void;
  onLakeClick: () => void;
  unlockedLevels: Set<string>;
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

/* ── 5×5 grid positions ────────────────────────────────────────
   Columns: 1   2   3   4   5
            └── └── └── └── └──
   Rows:    1 = top, 3 = middle, 5 = bottom
   Lake sits at the true center: col 3, row 3.

   To nudge ONE card without affecting others use offsetX / offsetY.
   These use position:relative so they NEVER push other cards around.
   • offsetY:  negative = move ↑   positive = move ↓
   • offsetX:  positive = move →   negative = move ←
────────────────────────────────────────────────────────────── */
type PositionSlot = {
  card: CardData;
  col: number;
  row: number;
  offsetX?: number; // px, relative — does NOT affect other cards
  offsetY?: number; // px, relative — does NOT affect other cards
};

const POSITIONS: PositionSlot[] = [
  { card: cards[2], col: 3, row: 1 , offsetY: 40, offsetX: 62},                    // Resume
  { card: cards[0], col: 1, row: 3, offsetY: -82, offsetX: 50 }, // GitHub
  { card: cards[1], col: 3, row: 5, offsetY: -60, offsetX: -100 },                    // Hugging Face — bottom center
  { card: cards[3], col: 5, row: 3 },                    // SafrSight — middle right
];

export default function CardGrid({ onGameStart, onLakeClick, unlockedLevels }: CardGridProps) {
  return (
    <section className="mx-auto -mt-10 w-full max-w-4xl px-4 pb-2">
      <div
        style={{
          display:             "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
          gridTemplateRows:    "auto auto auto auto auto",
          rowGap:              "0px",
          columnGap:           "0px",
        }}
      >
        {POSITIONS.map(({ card, col, row, offsetX, offsetY }, i) => (
          <div
            key={card.title}
            style={{
              gridColumn:      col,
              gridRow:         row,
              display:         "flex",
              justifyContent:  "center",
              position:        "relative",
              left:            offsetX ?? 0,
              top:             offsetY ?? 0,
              /* Above the lake so footer / ? block stays clickable when offsets overlap the lake */
              zIndex:          2,
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
              isUnlocked={unlockedLevels.has(card.scene)}
            />
          </div>
        ))}

        {/* Lake — z-index below level cards so offset overlaps don't steal clicks */}
        <div
          style={{
            gridColumn:     3,
            gridRow:        3,
            display:        "flex",
            alignItems:     "center",
            justifyContent: "center",
            position:       "relative",
            zIndex:         0,
          }}
        >
          <LakeCenter onClick={onLakeClick} />
        </div>
      </div>
    </section>
  );
}
