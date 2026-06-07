"use client";

import { useEffect, useRef } from "react";

interface Petal {
  x: number;
  y: number;
  size: number;
  speed: number;
  drift: number;
  rotation: number;
  rotSpeed: number;
  opacity: number;
  color: string;
  scaleX: number;
}

const COLORS = [
  "#8b1a1a",
  "#6b1212",
  "#a83030",
  "#7a1818",
  "#c44040",
];

function createPetal(width: number, height: number): Petal {
  return {
    x: Math.random() * width,
    y: -30 - Math.random() * height * 0.3,
    size: 8 + Math.random() * 14,
    speed: 0.4 + Math.random() * 0.7,
    drift: (Math.random() - 0.5) * 0.5,
    rotation: Math.random() * 360,
    rotSpeed: (Math.random() - 0.5) * 1.2,
    opacity: 0.15 + Math.random() * 0.35,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    scaleX: 0.4 + Math.random() * 0.6,
  };
}

function drawPetal(ctx: CanvasRenderingContext2D, p: Petal) {
  ctx.save();
  ctx.globalAlpha = p.opacity;
  ctx.translate(p.x, p.y);
  ctx.rotate((p.rotation * Math.PI) / 180);
  ctx.scale(p.scaleX, 1);
  ctx.fillStyle = p.color;
  ctx.beginPath();
  // Organic rose petal shape using bezier curves
  ctx.moveTo(0, -p.size);
  ctx.bezierCurveTo(p.size * 0.8, -p.size * 0.6, p.size * 0.8, p.size * 0.6, 0, p.size);
  ctx.bezierCurveTo(-p.size * 0.8, p.size * 0.6, -p.size * 0.8, -p.size * 0.6, 0, -p.size);
  ctx.fill();
  ctx.restore();
}

export default function PetalAnimation({ count = 20 }: { count?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Spread petals across the full height initially
    const petals: Petal[] = Array.from({ length: count }, (_, i) => {
      const p = createPetal(canvas.width, canvas.height);
      p.y = (canvas.height / count) * i * 1.5 - canvas.height * 0.3;
      return p;
    });

    let animId: number;
    let last = 0;
    const FPS = 30;
    const interval = 1000 / FPS;

    const draw = (ts: number) => {
      animId = requestAnimationFrame(draw);
      const delta = ts - last;
      if (delta < interval) return;
      last = ts - (delta % interval);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      petals.forEach((p) => {
        drawPetal(ctx, p);
        p.y += p.speed;
        p.x += p.drift + Math.sin(p.y * 0.01) * 0.3;
        p.rotation += p.rotSpeed;
        if (p.y > canvas.height + 30) {
          Object.assign(p, createPetal(canvas.width, canvas.height));
          p.y = -30;
        }
      });
    };

    animId = requestAnimationFrame(draw);
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}
