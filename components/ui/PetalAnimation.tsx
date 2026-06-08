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
  type: number; // 0=rose, 1=lily, 2=flower, 3=leaf
}

// Rose petal palette: bordeaux / rose / doré doux
const COLORS = [
  "#8b1a1a",  // bordeaux
  "#a83030",  // rouge doux
  "#c9607066",// rose translucide
  "#e8a4b855",// rose poudré
  "#6b1212",  // bordeaux foncé
  "#d4808099",// rose moyen
];

function drawRosePetal(ctx: CanvasRenderingContext2D, s: number) {
  ctx.beginPath();
  ctx.moveTo(0, -s);
  ctx.bezierCurveTo(s * 0.7, -s * 0.5, s * 0.7, s * 0.5, 0, s);
  ctx.bezierCurveTo(-s * 0.7, s * 0.5, -s * 0.7, -s * 0.5, 0, -s);
  ctx.fill();
}

function drawLilyPetal(ctx: CanvasRenderingContext2D, s: number) {
  ctx.beginPath();
  ctx.moveTo(0, -s * 1.4);
  ctx.bezierCurveTo(s * 0.4, -s * 0.6, s * 0.3, s * 0.4, 0, s * 0.8);
  ctx.bezierCurveTo(-s * 0.3, s * 0.4, -s * 0.4, -s * 0.6, 0, -s * 1.4);
  ctx.fill();
}

function drawSmallFlower(ctx: CanvasRenderingContext2D, s: number) {
  const petals = 5;
  for (let i = 0; i < petals; i++) {
    ctx.save();
    ctx.rotate((i / petals) * Math.PI * 2);
    ctx.beginPath();
    ctx.ellipse(0, -s * 0.6, s * 0.3, s * 0.55, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
  ctx.beginPath();
  ctx.arc(0, 0, s * 0.2, 0, Math.PI * 2);
  ctx.fill();
}

function drawLeaf(ctx: CanvasRenderingContext2D, s: number) {
  ctx.beginPath();
  ctx.moveTo(0, -s * 1.2);
  ctx.bezierCurveTo(s * 0.6, -s * 0.4, s * 0.5, s * 0.6, 0, s * 1.1);
  ctx.bezierCurveTo(-s * 0.5, s * 0.6, -s * 0.6, -s * 0.4, 0, -s * 1.2);
  ctx.fill();
}

function createPetal(width: number, height: number): Petal {
  return {
    x: Math.random() * width,
    y: -30 - Math.random() * height * 0.3,
    size: 5 + Math.random() * 10,
    speed: 0.35 + Math.random() * 0.65,
    drift: (Math.random() - 0.5) * 0.5,
    rotation: Math.random() * 360,
    rotSpeed: (Math.random() - 0.5) * 1.5,
    opacity: 0.12 + Math.random() * 0.30,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    type: Math.floor(Math.random() * 4),
  };
}

function drawPetal(ctx: CanvasRenderingContext2D, p: Petal) {
  ctx.save();
  ctx.globalAlpha = p.opacity;
  ctx.translate(p.x, p.y);
  ctx.rotate((p.rotation * Math.PI) / 180);
  ctx.fillStyle = p.color;
  switch (p.type) {
    case 0: drawRosePetal(ctx, p.size); break;
    case 1: drawLilyPetal(ctx, p.size); break;
    case 2: drawSmallFlower(ctx, p.size * 0.6); break;
    case 3: drawLeaf(ctx, p.size * 0.7); break;
    default: drawRosePetal(ctx, p.size);
  }
  ctx.restore();
}

export default function PetalAnimation({ count = 18 }: { count?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

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

    const petals: Petal[] = Array.from({ length: count }, (_, i) => {
      const p = createPetal(canvas.width, canvas.height);
      p.y = (canvas.height / count) * i * 1.4 - canvas.height * 0.2;
      return p;
    });

    let animId: number;
    let last = 0;
    const FPS = 28;
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
        p.x += p.drift + Math.sin(p.y * 0.008) * 0.4;
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
