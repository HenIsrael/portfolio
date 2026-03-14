/* ── Castle background (WORLD 3-4) ──────────────────────────────
   Dark gothic night, stars, glowing moon, distant castle silhouette,
   subtle lava glow at the base.
──────────────────────────────────────────────────────────────── */

function stableVal(x: number, y: number): number {
  return (Math.sin(x * 12.9898 + y * 78.233) + 1) / 2;
}

export function drawCastle(ctx: CanvasRenderingContext2D) {
  /* stars */
  const starPositions: [number, number][] = [
    [15,32],[72,16],[132,42],[196,24],[258,50],[322,20],[386,37],
    [448,14],[508,44],[568,26],[628,40],[688,16],[748,30],[786,46],
    [42,66],[112,76],[232,58],[362,72],[492,62],[622,56],[752,60],
    [82,96],[202,108],[342,88],[462,102],[582,94],[702,86],[762,99],
    [160,130],[300,118],[440,125],[580,115],[720,128],
  ];
  for (const [sx, sy] of starPositions) {
    const bright = 0.3 + stableVal(sx, sy) * 0.5;
    ctx.fillStyle = `rgba(255,255,255,${bright})`;
    ctx.fillRect(sx, sy, 1, 1);
    if (stableVal(sy, sx) > 0.78) {
      ctx.fillStyle = `rgba(255,255,255,${bright * 0.35})`;
      ctx.fillRect(sx - 1, sy, 3, 1);
      ctx.fillRect(sx, sy - 1, 1, 3);
    }
  }

  /* moon */
  const moonX = 680, moonY = 62, moonR = 28;
  /* outer glow */
  const moonGlow = ctx.createRadialGradient(moonX, moonY, moonR, moonX, moonY, moonR + 40);
  moonGlow.addColorStop(0,   "rgba(240,232,64,0.18)");
  moonGlow.addColorStop(1,   "rgba(240,232,64,0)");
  ctx.fillStyle = moonGlow;
  ctx.beginPath();
  ctx.arc(moonX, moonY, moonR + 40, 0, Math.PI * 2);
  ctx.fill();
  /* moon disc */
  ctx.fillStyle = "#f0e840";
  ctx.beginPath();
  ctx.arc(moonX, moonY, moonR, 0, Math.PI * 2);
  ctx.fill();
  /* craters */
  ctx.fillStyle = "#d8d020";
  for (const [cx, cy, cr] of [[moonX - 9, moonY - 6, 5], [moonX + 10, moonY + 7, 4], [moonX - 2, moonY + 11, 3]] as [number,number,number][]) {
    ctx.beginPath();
    ctx.arc(cx, cy, cr, 0, Math.PI * 2);
    ctx.fill();
  }

  /* distant castle silhouette */
  ctx.globalAlpha = 0.2;
  ctx.fillStyle = "#2a1a3a";

  /* main wall */
  ctx.fillRect(178, 242, 444, 138);

  /* battlement notches on main wall */
  for (let bx = 183; bx < 616; bx += 22) {
    ctx.fillRect(bx, 232, 14, 12);
  }

  /* left tower */
  ctx.fillRect(158, 200, 82, 180);
  for (const mx of [158, 176, 194, 212, 222]) {
    ctx.fillRect(mx, 190, 14, 12);
  }

  /* right tower */
  ctx.fillRect(560, 200, 82, 180);
  for (const mx of [560, 578, 596, 614, 624]) {
    ctx.fillRect(mx, 190, 14, 12);
  }

  /* tall center tower */
  ctx.fillRect(338, 158, 124, 222);
  for (const mx of [338, 358, 378, 398, 418, 438, 452]) {
    ctx.fillRect(mx, 146, 16, 14);
  }

  /* gate arch (dark cutout) */
  ctx.fillStyle = "#12082a";
  ctx.fillRect(362, 300, 76, 80);
  ctx.fillRect(368, 292, 64, 14);
  ctx.fillRect(378, 286, 44, 10);

  ctx.globalAlpha = 1;

  /* lava glow near ground */
  const lavaGrad = ctx.createLinearGradient(0, 345, 0, 380);
  lavaGrad.addColorStop(0, "rgba(0,0,0,0)");
  lavaGrad.addColorStop(1, "rgba(90,22,0,0.38)");
  ctx.fillStyle = lavaGrad;
  ctx.fillRect(0, 340, 800, 40);
}
