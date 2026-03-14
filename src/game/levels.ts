export interface Platform {
  x: number;
  y: number;
  w: number;
  h: number;
  color?: string;
}

export interface Coin {
  x: number;
  y: number;
  type?: "coin" | "mushroom";
}

export interface LevelData {
  bgColor: string;
  bgColor2?: string; // optional gradient second stop
  groundColor: string;
  platformColor: string;
  platformBorderColor: string;
  coinColor: string;
  platforms: Platform[];
  coins: Coin[];
  playerStart: { x: number; y: number };
  worldId: string;
}

// Canvas is 800 × 450. Ground platform always sits at y=380, h=70.
export const LEVELS: Record<string, LevelData> = {
  mountain: {
    bgColor: "#08101e",
    groundColor: "#c0d8ee",
    platformColor: "#c0d8ee",
    platformBorderColor: "#8ab0cc",
    coinColor: "#ffd700",
    worldId: "WORLD 1-1",
    platforms: [
      { x: 0,   y: 380, w: 800, h: 70 }, // snowy ground
      { x: 80,  y: 300, w: 150, h: 16 },
      { x: 320, y: 245, w: 130, h: 16 },
      { x: 530, y: 185, w: 150, h: 16 },
    ],
    coins: [
      { x: 130, y: 268 },
      { x: 180, y: 268 },
      { x: 365, y: 212 },
      { x: 570, y: 152 },
      { x: 630, y: 152 },
    ],
    playerStart: { x: 50, y: 330 },
  },

  forest: {
    bgColor: "#f8a828",
    bgColor2: "#f8d050",
    groundColor: "#52a800",
    platformColor: "#6b3800",
    platformBorderColor: "#3a1800",
    coinColor: "#ffd700",
    worldId: "WORLD 2-1",
    platforms: [
      { x: 0,   y: 380, w: 800, h: 70 }, // grass ground
      { x: 60,  y: 295, w: 120, h: 18 },
      { x: 260, y: 240, w: 140, h: 18 },
      { x: 650, y: 210, w: 130, h: 18 },
      // pipe caps — jumpable tops of the background pipes
      { x: 214, y: 318, w: 40, h: 18, color: "#388e3c" },
      { x: 572, y: 298, w: 40, h: 18, color: "#388e3c" },
    ],
    coins: [
      { x: 100, y: 260 },
      { x: 305, y: 205 },
      { x: 360, y: 205 },
      { x: 520, y: 250 },
      { x: 700, y: 175 },
      // mushroom collectibles — sitting on the ground
      { x: 196, y: 369, type: "mushroom" }, // between stair 1 and pipe 1
      { x: 486, y: 369, type: "mushroom" }, // between stair 2 and pipe 2
    ],
    playerStart: { x: 50, y: 330 },
  },

  castle: {
    bgColor: "#12082a",
    groundColor: "#585868",
    platformColor: "#585868",
    platformBorderColor: "#3a3a4c",
    coinColor: "#f0c030",
    worldId: "WORLD 3-4",
    platforms: [
      { x: 0,   y: 380, w: 800, h: 70 }, // stone ground
      { x: 50,  y: 315, w: 130, h: 18 },
      { x: 260, y: 260, w: 150, h: 18 },
      { x: 470, y: 200, w: 140, h: 18 },
      { x: 660, y: 300, w: 120, h: 18 },
    ],
    coins: [
      { x: 100, y: 280 },
      { x: 310, y: 225 },
      { x: 370, y: 225 },
      { x: 525, y: 165 },
      { x: 700, y: 265 },
    ],
    playerStart: { x: 50, y: 330 },
  },

  temple: {
    bgColor: "#7ab8f8",
    bgColor2: "#f4c048",
    groundColor: "#c0a840",
    platformColor: "#ece4c0",
    platformBorderColor: "#c8c0a0",
    coinColor: "#ffd700",
    worldId: "WORLD 4-1",
    platforms: [
      { x: 0,   y: 380, w: 800, h: 70 }, // marble ground
      { x: 80,  y: 305, w: 100, h: 18 },
      { x: 280, y: 250, w: 100, h: 18 },
      { x: 470, y: 195, w: 100, h: 18 },
      { x: 660, y: 285, w: 100, h: 18 },
    ],
    coins: [
      { x: 118, y: 270 },
      { x: 318, y: 215 },
      { x: 500, y: 160 },
      { x: 520, y: 160 },
      { x: 698, y: 250 },
    ],
    playerStart: { x: 50, y: 330 },
  },
};
