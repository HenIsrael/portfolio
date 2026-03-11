import { motion } from "framer-motion";
import type { IconType } from "react-icons";

interface ProjectCardProps {
  title: string;
  description: string;
  icon: IconType;
  accentColor: string;
  href?: string;
  onClick?: () => void;
  index: number;
}

export default function ProjectCard({
  title,
  description,
  icon: Icon,
  accentColor,
  href,
  onClick,
  index,
}: ProjectCardProps) {
  const content = (
    <motion.div
      className="group relative flex flex-col items-center gap-4 rounded-2xl border border-white/10
                 bg-white/5 backdrop-blur-sm p-8 cursor-pointer overflow-hidden
                 transition-colors duration-300 hover:border-white/20"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15 * index, ease: "easeOut" }}
      whileHover={{ scale: 1.04, y: -4 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Glow effect behind the card on hover */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500
                   group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at 50% 0%, ${accentColor}22, transparent 70%)`,
        }}
      />

      <div
        className="flex h-14 w-14 items-center justify-center rounded-xl transition-colors duration-300"
        style={{ backgroundColor: `${accentColor}18` }}
      >
        <Icon className="text-2xl" style={{ color: accentColor }} />
      </div>

      <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold text-white">
        {title}
      </h3>
      <p className="text-sm text-slate-400 text-center leading-relaxed">
        {description}
      </p>

      <span
        className="mt-auto inline-flex items-center gap-1 text-sm font-medium transition-colors duration-300"
        style={{ color: accentColor }}
      >
        {href ? "Visit" : "View"} &rarr;
      </span>
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="no-underline">
        {content}
      </a>
    );
  }

  return <button onClick={onClick} className="text-left w-full appearance-none bg-transparent border-none p-0">{content}</button>;
}
