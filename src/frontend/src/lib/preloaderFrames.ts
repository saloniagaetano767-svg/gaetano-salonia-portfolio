export const PRELOADER_FRAME_COUNT = 48;

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function easeOutCubic(t: number): number {
  return 1 - (1 - t) ** 3;
}

/** Procedural GS logo reveal frames (ChainZoku-style materialization). */
export function drawPreloaderFrame(
  ctx: CanvasRenderingContext2D,
  frameIndex: number,
  totalFrames: number,
): void {
  const w = ctx.canvas.width;
  const h = ctx.canvas.height;
  const t = frameIndex / Math.max(1, totalFrames - 1);
  const reveal = easeOutCubic(Math.min(1, t * 1.15));
  const pulse = 0.5 + 0.5 * Math.sin(t * Math.PI * 4);

  ctx.clearRect(0, 0, w, h);

  const bg = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w * 0.55);
  bg.addColorStop(0, `rgba(8, 22, 38, ${0.92 + reveal * 0.08})`);
  bg.addColorStop(0.55, "#061018");
  bg.addColorStop(1, "#020608");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  const ringCount = 5;
  for (let i = 0; i < ringCount; i++) {
    const ringT = Math.max(0, reveal - i * 0.08);
    if (ringT <= 0) continue;
    const radius = lerp(18, 120 + i * 22, ringT) * (w / 400);
    ctx.beginPath();
    ctx.arc(w / 2, h / 2, radius, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(255, 179, 71, ${0.08 * ringT * (1 - i * 0.12)})`;
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }

  const waveY = h * 0.62 + Math.sin(t * Math.PI * 6) * 6 * (1 - reveal);
  const waveGrad = ctx.createLinearGradient(0, waveY - 40, 0, h);
  waveGrad.addColorStop(0, `rgba(26, 74, 98, ${0.15 * reveal})`);
  waveGrad.addColorStop(1, `rgba(2, 8, 12, ${0.5 * reveal})`);
  ctx.fillStyle = waveGrad;
  ctx.fillRect(0, waveY, w, h - waveY);

  ctx.save();
  ctx.translate(w / 2, h / 2 - 8);
  ctx.globalAlpha = reveal;

  const fontSize = w * 0.19;
  ctx.font = `800 ${fontSize}px "Syne", "Segoe UI", system-ui, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  ctx.shadowColor = `rgba(255, 140, 60, ${0.35 * pulse})`;
  ctx.shadowBlur = 24 * reveal;

  const gGrad = ctx.createLinearGradient(-80, -40, 80, 40);
  gGrad.addColorStop(0, "#ffffff");
  gGrad.addColorStop(0.45, "#ffe8cc");
  gGrad.addColorStop(1, "#ffb347");
  ctx.fillStyle = gGrad;
  ctx.fillText("G", -fontSize * 0.34, 0);

  const sGrad = ctx.createLinearGradient(-20, -40, 100, 40);
  sGrad.addColorStop(0, "#ffb347");
  sGrad.addColorStop(0.55, "#ff8c42");
  sGrad.addColorStop(1, "#ff6b35");
  ctx.fillStyle = sGrad;
  ctx.fillText("S", fontSize * 0.34, 0);

  ctx.shadowBlur = 0;
  ctx.restore();

  const scanY = lerp(-20, h + 20, t);
  const scanGrad = ctx.createLinearGradient(0, scanY - 30, 0, scanY + 30);
  scanGrad.addColorStop(0, "rgba(255,255,255,0)");
  scanGrad.addColorStop(
    0.5,
    `rgba(255, 200, 140, ${0.12 * (1 - Math.abs(t - 0.5) * 2)})`,
  );
  scanGrad.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = scanGrad;
  ctx.fillRect(0, scanY - 30, w, 60);
}

export function generatePreloaderFrames(
  count = PRELOADER_FRAME_COUNT,
  size = 400,
): HTMLCanvasElement[] {
  const frames: HTMLCanvasElement[] = [];
  for (let i = 0; i < count; i++) {
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (!ctx) continue;
    drawPreloaderFrame(ctx, i, count);
    frames.push(canvas);
  }
  return frames;
}
