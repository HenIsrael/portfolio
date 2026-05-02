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
  skill: string;
  icon: string;
}

export interface LevelData {
  bgColor: string;
  bgColor2?: string; // optional gradient second stop
  groundColor: string;
  platformColor: string;
  platformBorderColor: string;
  skillColor: string;
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
    skillColor: "#3fb950",
    worldId: "WORLD 1-1",
    platforms: [
      { x: 0,   y: 380, w: 800, h: 70 }, // snowy ground
      { x: 80,  y: 300, w: 150, h: 16 },
      { x: 320, y: 245, w: 130, h: 16 },
      { x: 530, y: 185, w: 150, h: 16 },
    ],
    coins: [
      { x: 130, y: 268, skill: "Git Bash",   icon: "/skills/gitBash.jpg"   },
      { x: 195, y: 268, skill: "Python",      icon: "/skills/python.png"    },
      { x: 385, y: 213, skill: "TypeScript",  icon: "/skills/ts.png"        },
      { x: 570, y: 152, skill: "HTML",        icon: "/skills/html.png"      },
      { x: 635, y: 152, skill: "CSS",         icon: "/skills/css.png"       },
    ],
    playerStart: { x: 50, y: 330 },
  },

  forest: {
    bgColor: "#f8a828",
    bgColor2: "#f8d050",
    groundColor: "#52a800",
    platformColor: "#6b3800",
    platformBorderColor: "#3a1800",
    skillColor: "#ff9d00",
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
      { x: 120, y: 263, skill: "OpenCV",          icon: "/skills/openCV.png"      },
      { x: 330, y: 208, skill: "TensorFlow",       icon: "/skills/tensorFlow.png"  },
      { x: 592, y: 266, skill: "PyTorch",          icon: "/skills/pyTorch.png"     },
      { x: 715, y: 178, skill: "Neural Networks",  icon: "/skills/dp.png"          },
    ],
    playerStart: { x: 50, y: 330 },
  },

  castle: {
    bgColor: "#12082a",
    groundColor: "#585868",
    platformColor: "#585868",
    platformBorderColor: "#3a3a4c",
    skillColor: "#7c8cf8",
    worldId: "WORLD 3-4",
    platforms: [
      { x: 0,   y: 380, w: 800, h: 70 }, // stone ground
      { x: 50,  y: 315, w: 130, h: 18 },
      { x: 260, y: 260, w: 150, h: 18 },
      { x: 470, y: 200, w: 140, h: 18 },
      { x: 660, y: 300, w: 120, h: 18 },
    ],
    coins: [
      { x: 100, y: 280, skill: "Python",           icon: "/skills/python.png"   },
      { x: 310, y: 225, skill: "C++",              icon: "/skills/cpp.png"      },
      { x: 375, y: 225, skill: "Computer Vision",  icon: "/skills/cv.png"   },
      { x: 525, y: 165, skill: "Docker",           icon: "/skills/docker.png"   },
      { x: 710, y: 265, skill: "Git",              icon: "/skills/git.png"      },
    ],
    playerStart: { x: 50, y: 330 },
  },

  temple: {
    bgColor: "#7ab8f8",
    bgColor2: "#f4c048",
    groundColor: "#c0a840",
    platformColor: "#ece4c0",
    platformBorderColor: "#c8c0a0",
    skillColor: "#0ea5e9",
    worldId: "WORLD 4-1",
    platforms: [
      { x: 0,   y: 380, w: 800, h: 70 }, // marble ground
      { x: 80,  y: 305, w: 100, h: 18 },
      { x: 280, y: 250, w: 100, h: 18 },
      { x: 470, y: 195, w: 100, h: 18 },
      { x: 660, y: 285, w: 100, h: 18 },
    ],
    coins: [
      { x: 118, y: 270, skill: "REST API",      icon: "/skills/fastAPI.png"  },
      { x: 318, y: 215, skill: "React",          icon: "/skills/react.png"    },
      { x: 500, y: 160, skill: "Vercel",         icon: "/skills/vercel.png"   },
      { x: 540, y: 160, skill: "Render",         icon: "/skills/render.jpg"   },
      { x: 700, y: 250, skill: "Deep Learning",  icon: "/skills/dp.png"       },
    ],
    playerStart: { x: 50, y: 330 },
  },
};
