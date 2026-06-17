import { useEffect, useRef } from "react";

interface FrameSequencePlayerProps {
  frames: HTMLCanvasElement[];
  playing: boolean;
  fps?: number;
  loop?: boolean;
  className?: string;
  onComplete?: () => void;
}

export function FrameSequencePlayer({
  frames,
  playing,
  fps = 24,
  loop = false,
  className = "",
  onComplete,
}: FrameSequencePlayerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);
  const rafRef = useRef<number>(0);
  const lastTimeRef = useRef(0);
  const completedRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || frames.length === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = (index: number) => {
      const frame = frames[Math.min(index, frames.length - 1)];
      if (!frame) return;
      if (canvas.width !== frame.width || canvas.height !== frame.height) {
        canvas.width = frame.width;
        canvas.height = frame.height;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(frame, 0, 0);
    };

    draw(frameRef.current);

    if (!playing) return;

    completedRef.current = false;
    lastTimeRef.current = performance.now();

    const tick = (now: number) => {
      const elapsed = now - lastTimeRef.current;
      const frameDuration = 1000 / fps;
      if (elapsed >= frameDuration) {
        lastTimeRef.current = now - (elapsed % frameDuration);
        frameRef.current += 1;
        if (frameRef.current >= frames.length) {
          if (loop) {
            frameRef.current = 0;
          } else {
            frameRef.current = frames.length - 1;
            draw(frameRef.current);
            if (!completedRef.current) {
              completedRef.current = true;
              onComplete?.();
            }
            return;
          }
        }
        draw(frameRef.current);
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [frames, playing, fps, loop, onComplete]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden
      style={{ width: "min(72vw, 280px)", height: "min(72vw, 280px)" }}
    />
  );
}
