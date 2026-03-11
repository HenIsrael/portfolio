import { FaGithub } from "react-icons/fa";
import { SiHuggingface } from "react-icons/si";
import { HiDocumentText } from "react-icons/hi2";
import { MdSecurity } from "react-icons/md";
import ProjectCard from "./ProjectCard";

interface CardGridProps {
  onResumeClick: () => void;
}

const cards = [
  {
    title: "GitHub Repos",
    description: "Browse my open-source projects and contributions on GitHub.",
    icon: FaGithub,
    accentColor: "#a78bfa",
    href: "https://github.com/HenIsrael?tab=repositories",
  },
  {
    title: "Hugging Face Spaces",
    description: "Explore my machine-learning demos and models on Hugging Face.",
    icon: SiHuggingface,
    accentColor: "#fbbf24",
    href: "https://huggingface.co/henIsrael/spaces",
  },
  {
    title: "Resume",
    description: "View my professional experience, skills, and education.",
    icon: HiDocumentText,
    accentColor: "#34d399",
  },
  {
    title: "SafrSight",
    description: "A real-time web violence detection application powered by AI.",
    icon: MdSecurity,
    accentColor: "#f472b6",
    href: "https://safrsight.vercel.app/",
  },
];

export default function CardGrid({ onResumeClick }: CardGridProps) {
  return (
    <section className="mx-auto w-full max-w-3xl px-4 pb-24">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {cards.map((card, i) => (
          <ProjectCard
            key={card.title}
            index={i}
            title={card.title}
            description={card.description}
            icon={card.icon}
            accentColor={card.accentColor}
            href={card.href}
            onClick={card.title === "Resume" ? onResumeClick : undefined}
          />
        ))}
      </div>
    </section>
  );
}
