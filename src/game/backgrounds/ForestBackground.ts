/* ── Forest background (WORLD 2-1) ──────────────────────────────
   Warm sunrise sky, pixel-art triangular trees, Mario-style pipes,
   small flowers near the ground.
──────────────────────────────────────────────────────────────── */

const GROUND_Y = 380;

/* filled equilateral-ish triangle, tip pointing up */
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

function drawPipe(ctx: CanvasRenderingContext2D, x: number, bodyH: number) {
  const capH  = 18;
  const bodyW = 32;
  const capW  = bodyW + 8;
  const bodyY = GROUND_Y - bodyH;
  const capY  = bodyY - capH;
  const capX  = x - 4;

  /* body */
  ctx.fillStyle = "#388e3c";
  ctx.fillRect(x, bodyY, bodyW, bodyH);
  ctx.fillStyle = "#4caf50";                        // left highlight strip
  ctx.fillRect(x + 3, bodyY, 7, bodyH);
  ctx.fillStyle = "#2e7d32";                        // right shadow strip
  ctx.fillRect(x + bodyW - 7, bodyY, 7, bodyH);

  /* cap */
  ctx.fillStyle = "#388e3c";
  ctx.fillRect(capX, capY, capW, capH);
  ctx.fillStyle = "#66bb6a";                        // bright top rim
  ctx.fillRect(capX, capY, capW, 3);
  ctx.fillStyle = "#4caf50";                        // cap left highlight
  ctx.fillRect(capX + 3, capY + 3, 7, capH - 3);
  ctx.fillStyle = "#2e7d32";                        // cap right shadow
  ctx.fillRect(capX + capW - 7, capY + 3, 7, capH - 3);
}

export function drawForest(ctx: CanvasRenderingContext2D) {
  /* sun — warm radial glow (top-left like the SVG scene) */
  const sunGrad = ctx.createRadialGradient(70, 55, 0, 70, 55, 20);
  sunGrad.addColorStop(0,   "#ffe848");
  sunGrad.addColorStop(0.45, "#ffd010");
  sunGrad.addColorStop(1,   "rgba(255,208,16,0)");
  ctx.fillStyle = sunGrad;
  ctx.fillRect(0, 0, 145, 130);

  /* pixel-art clouds */
  const clouds = [{ x: 280, y: 38 }, { x: 510, y: 52 }];
  for (const { x, y } of clouds) {
    ctx.fillStyle = "rgba(255,255,255,0.88)";
    ctx.fillRect(x,      y,      90, 16);
    ctx.fillRect(x + 10, y - 10, 58, 16);
    ctx.fillRect(x + 22, y - 18, 32, 12);
  }

  /* background trees — semi-transparent for depth */
  ctx.globalAlpha = 0.46;
  const bgTrees = [35, 210, 485, 640];
  for (const bx of bgTrees) {
    const cx = bx + 14;
    /* trunk */
    ctx.fillStyle = "#4a2800";
    ctx.fillRect(cx - 3, GROUND_Y - 26, 6, 26);
    /* 2 foliage tiers */
    ctx.fillStyle = "#1a5000";
    tri(ctx, cx, GROUND_Y - 88, 18, 34);
    ctx.fillStyle = "#1e5800";
    tri(ctx, cx, GROUND_Y - 64, 24, 36);
  }
  ctx.globalAlpha = 1;

  /* foreground trees — 3 stacked triangular tiers (SMB style) */
  const fgTrees = [158, 432, 758];
  for (const bx of fgTrees) {
    /* trunk */
    ctx.fillStyle = "#6b3800";
    ctx.fillRect(bx - 5, GROUND_Y - 36, 10, 36);
    ctx.fillStyle = "#4a2800";              // shadow side
    ctx.fillRect(bx - 5, GROUND_Y - 36, 3, 36);

    /* tier 1 — top, darkest, narrowest */
    ctx.fillStyle = "#1a5800";
    tri(ctx, bx, GROUND_Y - 114, 20, 46);
    /* tier 2 — bottom, mid green */
    ctx.fillStyle = "#228a00";
    tri(ctx, bx, GROUND_Y - 82, 30, 46);
  }

  /* Mario-style green pipes */
  drawPipe(ctx, 218, 44);
  drawPipe(ctx, 576, 64);
}
