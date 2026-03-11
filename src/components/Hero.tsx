import { motion } from "framer-motion";

export default function Hero() {
  return (
    <motion.section
      className="flex flex-col items-center justify-center pt-24 pb-16 px-4 text-center"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <h1
        className="font-[family-name:var(--font-display)] text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight
                    bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
      >
        Hen Israel
      </h1>
      <p className="mt-4 text-lg sm:text-xl text-slate-400 max-w-md">
        Software Developer
      </p>
    </motion.section>
  );
}
