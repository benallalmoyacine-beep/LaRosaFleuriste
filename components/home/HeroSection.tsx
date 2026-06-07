"use client";

import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import PetalAnimation from "@/components/ui/PetalAnimation";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } },
};

interface Props {
  slogan: string;
}

export default function HeroSection({ slogan }: Props) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-noir">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-radial from-rouge/20 via-noir to-noir" />

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-0.5 bg-or rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Petal canvas */}
      <PetalAnimation count={14} />

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-4 max-w-4xl mx-auto"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.p
          variants={item}
          className="font-cormorant italic text-or/70 text-lg md:text-xl tracking-[0.3em] uppercase mb-4"
        >
          Fleuriste à Tlemcen
        </motion.p>

        <motion.h1
          variants={item}
          className="font-vibes text-8xl md:text-[10rem] text-or leading-none mb-4 drop-shadow-[0_0_40px_rgba(201,168,76,0.4)]"
        >
          La Rosa
        </motion.h1>

        <motion.div variants={item} className="divider-or max-w-xs mx-auto mb-6" />

        <motion.p
          variants={item}
          className="font-cormorant italic text-blanc/70 text-xl md:text-2xl max-w-xl mx-auto leading-relaxed"
        >
          {slogan}
        </motion.p>

        <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
          <Link
            href="/catalogue"
            className="px-8 py-3 border border-or text-or font-jost text-sm tracking-widest uppercase hover:bg-or hover:text-noir transition-all duration-300"
          >
            Découvrir le Catalogue
          </Link>
          <a
            href="https://wa.me/213791112663"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 bg-rouge text-blanc font-jost text-sm tracking-widest uppercase hover:bg-rouge/80 transition-all duration-300"
          >
            Commander sur WhatsApp
          </a>
        </motion.div>

        <motion.div
          variants={item}
          className="mt-16 animate-bounce"
        >
          <div className="w-px h-12 bg-gradient-to-b from-or to-transparent mx-auto" />
        </motion.div>
      </motion.div>
    </section>
  );
}
