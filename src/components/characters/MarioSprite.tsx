interface MarioSpriteProps {
  size?: number;
}

// Classic NES Super Mario pixel art — 16×16 grid
// Each row is 16 pixels: color codes mapped below
// R=Red, S=Skin, B=Brown, W=White, U=Blue, O=Gold, _=transparent
const PALETTE: Record<string, string> = {
  R: "#e52213", // red (hat, shirt)
  S: "#ffc78e", // skin
  B: "#7b3f00", // brown (hair, mustache, boots)
  W: "#ffffff", // white (eyes)
  U: "#3b82f6", // blue (overalls)
  O: "#ffd700", // gold (buttons)
  _: "transparent",
};

const PIXELS: string[][] = [
  // row 0
  ["_","_","_","_","R","R","R","R","R","_","_","_","_","_","_","_"],
  // row 1
  ["_","_","_","R","R","R","R","R","R","R","R","R","_","_","_","_"],
  // row 2
  ["_","_","_","B","B","B","S","S","B","S","_","_","_","_","_","_"],
  // row 3
  ["_","_","B","S","B","S","S","S","B","S","S","S","_","_","_","_"],
  // row 4
  ["_","_","B","S","B","B","S","S","S","B","S","S","S","_","_","_"],
  // row 5
  ["_","_","B","B","S","S","S","S","B","B","B","B","_","_","_","_"],
  // row 6
  ["_","_","_","_","S","S","S","S","S","S","S","_","_","_","_","_"],
  // row 7  mustache
  ["_","_","_","B","B","R","B","B","R","B","B","_","_","_","_","_"],
  // row 8  body
  ["_","_","_","S","R","R","R","R","R","S","_","_","_","_","_","_"],
  // row 9  overalls start
  ["_","_","U","U","R","R","R","R","R","U","U","_","_","_","_","_"],
  // row 10
  ["_","U","U","U","U","R","O","R","U","U","U","U","_","_","_","_"],
  // row 11
  ["U","U","U","U","U","U","U","U","U","U","U","U","_","_","_","_"],
  // row 12
  ["U","U","U","_","U","U","U","U","U","_","U","U","_","_","_","_"],
  // row 13  gap between legs
  ["U","U","_","_","U","U","U","U","U","_","_","U","_","_","_","_"],
  // row 14  boots
  ["B","B","_","_","B","B","B","B","B","_","_","B","_","_","_","_"],
  // row 15
  ["B","B","B","_","B","B","B","B","B","_","B","B","_","_","_","_"],
];

export default function MarioSprite({ size = 48 }: MarioSpriteProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      style={{ imageRendering: "pixelated" }}
      xmlns="http://www.w3.org/2000/svg"
    >
      {PIXELS.map((row, y) =>
        row.map((code, x) => {
          if (code === "_") return null;
          return (
            <rect
              key={`${y}-${x}`}
              x={x}
              y={y}
              width={1}
              height={1}
              fill={PALETTE[code]}
            />
          );
        })
      )}
    </svg>
  );
}
