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
        fontSize:    9,
        color:       isPlay ? "#ff6060" : "#52ff52",
        letterSpacing: "0.1em",
        animation:   "marioBlink 1.1s step-end infinite",
        margin:      0,
        background:  "none",
        border:      "none",
        cursor:      "pointer",
        padding:     0,
      }}
    >
      {isPlay ? "▼ SWITCH TO VIEW MODE ▼" : "▼ SWITCH TO PLAY MODE ▼"}
    </button>
  );
}
