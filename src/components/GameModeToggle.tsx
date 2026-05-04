export type GameMode = "view" | "play";

interface GameModeToggleProps {
  mode: GameMode;
  onToggle: () => void;
}

export default function GameModeToggle({ mode, onToggle }: GameModeToggleProps) {
  const isPlay = mode === "play";

  return (
    <button
      onClick={onToggle}
      title={
        isPlay
          ? "View mode — clicking a level opens it directly"
          : "Play mode — win the game to unlock each level"
      }
      style={{
        fontFamily:  '"Press Start 2P", monospace',
        fontSize:    11,
        color:       isPlay ? "#ff6060" : "#52ff52",
        letterSpacing: "0.1em",
        animation:   "marioBlink 2s step-end infinite",
        margin:      0,
        background:  "none",
        border:      "none",
        cursor:      "pointer",
        padding:     0,
      }}
    >
      {isPlay ? "▼ GAME MODE ▼" : "▼ VIEW MODE ▼"}
    </button>
  );
}
