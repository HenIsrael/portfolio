import { motion, AnimatePresence } from "framer-motion";
import CharacterSelect from "./CharacterSelect";

interface CharacterModalProps {
  isOpen: boolean;
  selectedCharacter: string | null;
  onSelect: (character: string) => void;
  onClose: () => void;
}

const FONT = '"Press Start 2P", monospace';

export default function CharacterModal({
  isOpen,
  selectedCharacter,
  onSelect,
  onClose,
}: CharacterModalProps) {
  const handleSelect = (character: string) => {
    onSelect(character);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="character-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.75)",
              zIndex: 200,
            }}
          />

          {/* Panel */}
          <motion.div
            key="character-modal-panel"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}

            transition={{ duration: 0.25, ease: "easeOut" }}
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              x: "-50%",
              y: "-50%",
              zIndex: 201,
              background: "rgba(0, 0, 0, 0.55)",
              border: "4px solid #c88000",
              boxShadow: "0 0 0 4px #5c2e00, 0 8px 40px #c88000",
              padding: "2rem 2.5rem 2rem",
              minWidth: 320,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            {/* Header row */}
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontFamily: FONT,
                  fontSize: 10,
                  color: "#52ff52",
                  letterSpacing: "0.06em",
                }}
              >
                SELECT CHARACTER
              </span>

              {/* Pixel-art ✕ button */}
              <button
                onClick={onClose}
                aria-label="Close character select"
                style={{
                  fontFamily: FONT,
                  fontSize: 10,
                  color: "#fff",
                  background: "rgba(92,46,0,0.7)",
                  border: "2px solid #c88000",
                  padding: "4px 8px",
                  cursor: "pointer",
                  lineHeight: 1,
                  boxShadow: "2px 2px 0 rgba(0,0,0,0.5)",
                }}
              >
                ✕
              </button>
            </div>

            {/* Divider */}
            <div style={{ height: 3, background: "#c88000", width: "100%" }} />

            {/* Character select content */}
            <CharacterSelect selected={selectedCharacter} onSelect={handleSelect} />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
