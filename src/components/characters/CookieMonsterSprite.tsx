interface CookieMonsterSpriteProps {
  size?: number;
}

// Cookie Monster pixel art — 16×16 grid
// C=Blue fur, W=White (eyes), K=Black (pupils+mouth), T=Cookie tan, H=Cookie chip, _=transparent
const PALETTE: Record<string, string> = {
  C: "#1a72d4",  // vivid Cookie Monster blue
  W: "#ffffff",  // white eye spheres
  K: "#0a0a0a",  // black pupils + mouth interior
  T: "#d4a56a",  // cookie tan
  H: "#7b4f21",  // chocolate chip
  _: "transparent",
};

const PIXELS: string[][] = [
  ["_","_","_","W","W","W","_","_","W","W","W","_","_","_","_","_"],
  ["_","_","W","W","W","W","_","W","W","W","W","W","_","_","_","_"],
  ["_","_","W","K","W","W","_","W","W","K","W","W","_","_","_","_"],
  ["_","_","_","W","W","_","_","_","W","W","W","_","_","_","_","_"],

  ["_","_","C","C","C","C","C","C","C","C","C","_","_","_","_","_"],
  ["_","C","C","C","C","C","C","C","C","C","C","C","_","_","_","_"],
  ["C","C","C","C","C","C","C","C","C","C","C","C","C","_","_","_"],

  // mouth (more rounded / chaotic)
  ["C","C","C","C","K","K","K","K","K","K","C","C","C","_","_","_"],
  ["C","C","C","K","K","K","K","K","K","K","K","C","C","_","_","_"],
  ["C","C","K","K","K","K","K","K","K","K","K","K","C","_","_","_"],
  ["C","C","C","K","K","K","K","K","K","K","K","C","C","_","_","_"],

  ["C","C","C","C","C","C","C","C","C","C","C","C","C","_","_","_"],

  // cookie hand (cleaner + clearer)
  ["C","C","C","C","C","C","C","C","C","T","T","T","_","_","_","_"],
  ["C","C","_","C","C","C","C","C","T","T","H","T","_","_","_","_"],
  ["C","C","_","_","C","C","C","_","_","T","T","_","_","_","_","_"],
  ["C","_","_","_","C","C","C","_","_","_","_","_","_","_","_","_"],
];

export default function CookieMonsterSprite({ size = 48 }: CookieMonsterSpriteProps) {
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
