import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal panel */}
          <motion.div
            className="relative z-10 w-full max-w-lg rounded-2xl border border-white/10
                       bg-[#1a1a2e] p-8 shadow-2xl"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full
                         bg-white/10 text-white/60 transition-colors hover:bg-white/20 hover:text-white
                         cursor-pointer border-none"
            >
              <IoClose size={18} />
            </button>

            <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-white mb-6">
              Resume
            </h2>

            <div className="flex items-center justify-center min-h-[200px] rounded-xl border border-dashed border-white/15 text-slate-500">
              Coming soon
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
