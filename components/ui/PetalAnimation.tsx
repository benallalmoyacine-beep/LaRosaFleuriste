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
}

const COLORS = ["#e8a4b8", "#c9a84c44", "#8b1a1a55", "#e8a4b866"];

function createPetal(width: number): Petal {
  return {
    x: Math.random() * width,
    y: -20,
    size: 6 + Math.random() * 10,
    speed: 0.5 + Math.random() * 1.2,
    drift: (Math.random() - 0.5) * 0.8,
    rotation: Math.random() * 360,
    rotSpeed: (Math.random() - 0.5) * 2,
    opacity: 0.3 + Math.random() * 0.5,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
  };
}

export default function PetalAnimation({ count = 18 }: { count?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
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

    let petals: Petal[] = Array.from({ length: count }, () =>
      createPetal(canvas.width)
    );
    // Spread initial Y positions
    petals = petals.map((p, i) => ({ ...p, y: (canvas.height / count) * i }));

    let animId: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      petals.forEach((p) => {
        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        // Ellipse petal shape
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size, p.size / 2, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        p.y += p.speed;
        p.x += p.drift;
        p.rotation += p.rotSpeed;

        if (p.y > canvas.height + 20) {
          Object.assign(p, createPetal(canvas.width));
          p.y = -20;
        }
      });
      animId = requestAnimationFrame(draw);
    };
    draw();

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
