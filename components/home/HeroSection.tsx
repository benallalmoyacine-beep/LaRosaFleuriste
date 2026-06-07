"use client";

import { motion, type Variants } from "framer-motion";
import Link from "next/link";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

interface Props {
  slogan: string;
}

export default function HeroSection({ slogan }: Props) {
  return (
    <section className="min-h-screen bg-blanc flex items-center pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left — Text */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-col justify-center"
          >
            <motion.p
              variants={item}
              className="font-jost text-xs tracking-[0.3em] uppercase text-muted mb-6"
            >
              Fleuriste à Tlemcen
            </motion.p>

            <motion.h1
              variants={item}
              className="font-playfair text-5xl md:text-6xl lg:text-7xl text-noir leading-tight mb-4"
            >
              Des fleurs{" "}
              <span className="font-cormorant italic text-rouge">pour chaque</span>
              <br />
              moment de votre vie.
            </motion.h1>

            <motion.p
              variants={item}
              className="font-cormorant italic text-muted text-xl leading-relaxed max-w-md mb-10"
            >
              {slogan}
            </motion.p>

            <motion.div variants={item} className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/catalogue"
                className="inline-flex items-center justify-center px-8 py-3 bg-noir text-white font-jost text-xs tracking-widest uppercase hover:bg-noir/80 transition-all duration-300"
              >
                Découvrir le Catalogue
              </Link>
              <a
                href="https://wa.me/213791112663"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-3 border border-noir text-noir font-jost text-xs tracking-widest uppercase hover:bg-noir hover:text-white transition-all duration-300"
              >
                Commander sur WhatsApp
              </a>
            </motion.div>

            {/* Signature */}
            <motion.p variants={item} className="font-vibes text-4xl text-rouge mt-10">
              La Rosa
            </motion.p>
          </motion.div>

          {/* Right — Decorative */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
            className="hidden lg:flex items-center justify-center relative"
          >
            <div className="w-full h-[600px] bg-gradient-to-br from-rose/20 via-border to-blanc rounded-sm flex items-center justify-center overflow-hidden relative">
              {/* Decorative petals */}
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-rose/60"
                  style={{
                    fontSize: `${40 + i * 20}px`,
                    left: `${10 + i * 15}%`,
                    top: `${15 + (i % 3) * 25}%`,
                  }}
                  animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
                >
                  🌹
                </motion.div>
              ))}
              <div className="text-center z-10">
                <p className="font-vibes text-8xl text-or/60">La Rosa</p>
                <p className="font-cormorant italic text-muted text-lg mt-2">Fleuriste · Tlemcen</p>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-4 -left-4 bg-white shadow-lg px-6 py-4 border border-border">
              <p className="font-jost text-xs text-muted tracking-wider uppercase">Livraison</p>
              <p className="font-playfair text-lg text-noir">69 Wilayas</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
