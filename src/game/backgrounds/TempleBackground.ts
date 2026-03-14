/* ── Temple background (WORLD 4-1) ──────────────────────────────
   Golden Mediterranean dawn, large glowing sun, pixel-art clouds,
   faint distant column ruins.
──────────────────────────────────────────────────────────────── */

export function drawTemple(ctx: CanvasRenderingContext2D) {
  /* large sun — top-right, radial glow */
  const sunX = 694, sunY = 68;
  const sunGrad = ctx.createRadialGradient(sunX, sunY, 12, sunX, sunY, 85);
  sunGrad.addColorStop(0,    "#fff8cc");
  sunGrad.addColorStop(0.25, "#ffe888");
  sunGrad.addColorStop(0.55, "#ffd060");
  sunGrad.addColorStop(0.75, "rgba(255,200,48,0.3)");
  sunGrad.addColorStop(1,    "rgba(255,200,48,0)");
  ctx.fillStyle = sunGrad;
  ctx.fillRect(sunX - 86, sunY - 86, 172, 172);

  /* sun core disc */
  ctx.fillStyle = "#fff8cc";
  ctx.beginPath();
  ctx.arc(sunX, sunY, 24, 0, Math.PI * 2);
  ctx.fill();

  /* pixel-art clouds */
  const clouds = [{ x: 58, y: 44 }, { x: 285, y: 34 }, { x: 455, y: 56 }];
  for (const { x, y } of clouds) {
    ctx.fillStyle = "rgba(255,255,255,0.9)";
    ctx.fillRect(x,      y,      80, 15);
    ctx.fillRect(x + 10, y - 9,  52, 14);
    ctx.fillRect(x + 20, y - 16, 28, 10);
    /* bottom shadow on cloud */
    ctx.fillStyle = "rgba(200,190,160,0.35)";
    ctx.fillRect(x, y + 12, 80, 3);
  }

  /* distant column ruins — very faint silhouette */
  const colXs = [108, 182, 256, 498, 572, 646];
  ctx.globalAlpha = 0.16;
  ctx.fillStyle = "#e8dcc0";
  for (const cx of colXs) {
    /* column shaft */
    ctx.fillRect(cx, 190, 18, 190);
    /* slight fluting lines */
    ctx.fillStyle = "#c8bca0";
    ctx.fillRect(cx + 5, 190, 3, 190);
    ctx.fillStyle = "#e8dcc0";
    /* capital (top block) */
    ctx.fillRect(cx - 4, 184, 26, 8);
    /* base (bottom block) */
    ctx.fillRect(cx - 4, 374, 26, 6);
    /* broken column — truncate some */
    if (cx === 182 || cx === 572) {
      ctx.fillStyle = "#e8dcc0";
      ctx.fillRect(cx, 240, 18, 140);       // shorter shaft
      ctx.fillRect(cx - 4, 234, 26, 8);     // cap at lower height
      /* rubble block at base */
      ctx.fillRect(cx - 6, 370, 30, 10);
    }
  }
  ctx.globalAlpha = 1;

  /* warm golden horizon band */
  const horizGrad = ctx.createLinearGradient(0, 310, 0, 380);
  horizGrad.addColorStop(0, "rgba(244,192,72,0)");
  horizGrad.addColorStop(1, "rgba(244,192,72,0.4)");
  ctx.fillStyle = horizGrad;
  ctx.fillRect(0, 310, 800, 70);
}
