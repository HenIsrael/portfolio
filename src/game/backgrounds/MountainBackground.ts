/* ── Mountain background (WORLD 1-1) ────────────────────────────
   Deep night sky, aurora borealis, two snow-capped peaks,
   pine trees at the base.
──────────────────────────────────────────────────────────────── */

const GROUND_Y = 380;

function tri(
  ctx: CanvasRenderingContext2D,
  cx: number,
  tipY: number,
  halfW: number,
  h: number,
) {
  ctx.beginPath();
  ctx.moveTo(cx, tipY);
  ctx.lineTo(cx + halfW, tipY + h);
  ctx.lineTo(cx - halfW, tipY + h);
  ctx.closePath();
  ctx.fill();
}

/* deterministic "random" based on position — no Math.random() so it's stable */
function stableVal(x: number, y: number): number {
  return (Math.sin(x * 12.9898 + y * 78.233) + 1) / 2;
}

export function drawMountain(ctx: CanvasRenderingContext2D) {
  /* stars */
  const starPositions: [number, number][] = [
    [30,15],[88,8],[148,26],[215,12],[278,32],[340,9],[402,21],[461,14],
    [528,30],[598,11],[658,23],[718,9],[778,17],[52,46],[128,57],[202,41],
    [312,62],[452,52],[568,50],[678,43],[748,38],[102,72],[262,82],[502,66],
    [178,95],[308,108],[438,88],[558,102],[678,90],[748,78],
  ];
  for (const [sx, sy] of starPositions) {
    const bright = 0.45 + stableVal(sx, sy) * 0.45;
    ctx.fillStyle = `rgba(255,255,255,${bright})`;
    ctx.fillRect(sx, sy, 1, 1);
    /* occasional cross-sparkle on brighter stars */
    if (stableVal(sy, sx) > 0.72) {
      ctx.fillStyle = `rgba(255,255,255,${bright * 0.4})`;
      ctx.fillRect(sx - 1, sy, 3, 1);
      ctx.fillRect(sx, sy - 1, 1, 3);
    }
  }

  /* aurora borealis — three faint colour bands */
  const aurora = [
    { y: 42, h: 28, color: "#00cc88" },
    { y: 60, h: 22, color: "#0088cc" },
    { y: 76, h: 16, color: "#8800cc" },
  ];
  for (const { y, h, color } of aurora) {
    ctx.globalAlpha = 0.085;
    ctx.fillStyle = color;
    ctx.fillRect(0, y, 800, h);
  }
  ctx.globalAlpha = 1;

  /* left mountain */
  ctx.fillStyle = "#1e3050";
  tri(ctx, 240, 60, 220, 320);
  /* snow cap */
  ctx.fillStyle = "#b8d0ec";
  tri(ctx, 240, 60, 52, 72);
  ctx.fillStyle = "#dceeff";
  tri(ctx, 240, 60, 32, 44);
  ctx.fillStyle = "#eaf4ff";             // bright peak highlight
  tri(ctx, 240, 60, 16, 22);

  /* right mountain */
  ctx.fillStyle = "#152030";
  tri(ctx, 580, 100, 200, 280);
  /* snow cap */
  ctx.fillStyle = "#a8c8e0";
  tri(ctx, 580, 100, 46, 66);
  ctx.fillStyle = "#cce0f8";
  tri(ctx, 580, 100, 28, 40);
  ctx.fillStyle = "#dce8f8";
  tri(ctx, 580, 100, 14, 20);

  /* pine trees at base */
  const pines = [48, 112, 174, 638, 702, 760];
  for (const px of pines) {
    const s = 0.88 + stableVal(px, 1) * 0.24;     // slight size variation
    const h = 56 * s;
    ctx.fillStyle = "#1a4a1a";
    tri(ctx, px, GROUND_Y - h, 13 * s, h * 0.48);
    ctx.fillStyle = "#204e20";
    tri(ctx, px, GROUND_Y - h * 0.62, 17 * s, h * 0.62);
    /* trunk */
    ctx.fillStyle = "#3a1800";
    ctx.fillRect(px - 3, GROUND_Y - 14, 6, 14);
  }

  /* snowfield at ground level */
  const snowGrad = ctx.createLinearGradient(0, GROUND_Y - 10, 0, GROUND_Y);
  snowGrad.addColorStop(0, "rgba(192,216,238,0)");
  snowGrad.addColorStop(1, "rgba(192,216,238,0.6)");
  ctx.fillStyle = snowGrad;
  ctx.fillRect(0, GROUND_Y - 10, 800, 10);
}
