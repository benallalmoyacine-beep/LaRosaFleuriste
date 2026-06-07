"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 1600);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-blanc"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center gap-4"
          >
            <Image
              src="/logo.jpg"
              alt="La Rosa Fleuriste"
              width={100}
              height={100}
              className="rounded-full shadow-md"
            />
            <p className="font-vibes text-4xl text-noir">La Rosa</p>
            <p className="font-jost text-xs tracking-widest uppercase text-muted">Fleuriste · Tlemcen</p>
          </motion.div>

          <motion.div className="mt-8 h-0.5 bg-border rounded-full overflow-hidden w-24">
            <motion.div
              className="h-full bg-or rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
