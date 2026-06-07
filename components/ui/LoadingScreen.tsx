"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 1800);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-noir"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* Petals decoration */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-rose/40 text-2xl select-none"
                style={{ left: `${10 + i * 12}%`, top: `${20 + (i % 3) * 20}%` }}
                animate={{ y: [0, 20, 0], rotate: [0, 15, -15, 0], opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: "easeInOut" }}
              >
                🌹
              </motion.div>
            ))}
          </div>

          <motion.p
            className="font-vibes text-6xl md:text-8xl text-or relative z-10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            La Rosa
          </motion.p>

          <motion.p
            className="font-cormorant italic text-blanc/50 text-xl mt-3 tracking-widest relative z-10"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Fleuriste · Tlemcen
          </motion.p>

          {/* Loading bar */}
          <motion.div
            className="mt-10 h-0.5 bg-or/30 rounded-full overflow-hidden w-32 relative z-10"
          >
            <motion.div
              className="h-full bg-or rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.4, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
