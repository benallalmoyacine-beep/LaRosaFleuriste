"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Étoile 5 branches SVG (comme le logo)
function StarShape({ size, color }: { size: number; color: string }) {
  // Polygone étoile 5 branches
  const points = Array.from({ length: 5 }, (_, i) => {
    const outer = (Math.PI * 2 * i) / 5 - Math.PI / 2;
    const inner = outer + Math.PI / 5;
    const R = size / 2;
    const r = R * 0.42;
    return [
      `${R + R * Math.cos(outer)},${R + R * Math.sin(outer)}`,
      `${R + r * Math.cos(inner)},${R + r * Math.sin(inner)}`,
    ];
  }).flat().join(" ");

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: "block" }}>
      <polygon points={points} fill={color} />
    </svg>
  );
}

// Étoiles statiquement définies
const STARS: { angle: number; radius: number; size: number; duration: number; color: string }[] = [
  { angle: 0,   radius: 85,  size: 14, duration: 9,  color: "#c9a84c" },
  { angle: 72,  radius: 85,  size: 10, duration: 9,  color: "#c9a84c" },
  { angle: 144, radius: 85,  size: 12, duration: 9,  color: "#c9a84c" },
  { angle: 216, radius: 85,  size: 9,  duration: 9,  color: "#c9a84c" },
  { angle: 288, radius: 85,  size: 11, duration: 9,  color: "#c9a84c" },
  { angle: 30,  radius: 118, size: 8,  duration: 14, color: "#e8c97a" },
  { angle: 102, radius: 118, size: 10, duration: 14, color: "#e8c97a" },
  { angle: 174, radius: 118, size: 7,  duration: 14, color: "#e8c97a" },
  { angle: 246, radius: 118, size: 9,  duration: 14, color: "#e8c97a" },
  { angle: 318, radius: 118, size: 8,  duration: 14, color: "#e8c97a" },
];

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 2400);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-blanc"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        >
          {/* Zone orbitale : 300×300, centrée */}
          <div className="relative" style={{ width: 300, height: 300 }}>

            {/* Étoiles en orbite */}
            {STARS.map((star, i) => (
              <motion.div
                key={i}
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  width: 0,
                  height: 0,
                  transformOrigin: "0 0",
                }}
                animate={{ rotate: [star.angle, star.angle + 360] }}
                transition={{
                  duration: star.duration,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <motion.div
                  style={{
                    position: "absolute",
                    left: star.radius,
                    top: 0,
                    transform: "translate(-50%, -50%)",
                  }}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{
                    duration: star.duration / 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <StarShape size={star.size} color={star.color} />
                </motion.div>
              </motion.div>
            ))}

            {/* Texte centré */}
            <motion.div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.34, 1.2, 0.64, 1] }}
            >
              <p
                className="font-vibes leading-none"
                style={{ fontSize: 72, color: "#e8a4b8" }}
              >
                La Rosa
              </p>
              <motion.p
                className="font-jost text-muted"
                style={{ fontSize: 10, letterSpacing: "0.35em", textTransform: "uppercase", marginTop: 8 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                Fleuriste &middot; Tlemcen
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
