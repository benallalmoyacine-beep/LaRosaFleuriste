"use client";

import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import PetalAnimation from "@/components/ui/PetalAnimation";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.2 } },
};

const line: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9 } },
};


export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-blanc flex items-center justify-center overflow-hidden">
      {/* Pétales bordeaux tombants */}
      <PetalAnimation count={22} />

      {/* Ligne décorative gauche */}
      <motion.div
        className="absolute left-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-3"
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <div className="w-px h-20 bg-gradient-to-b from-transparent to-border" />
        <p className="font-jost text-[10px] tracking-[0.25em] uppercase text-muted rotate-90 whitespace-nowrap">
          Tlemcen · Algérie
        </p>
        <div className="w-px h-20 bg-gradient-to-t from-transparent to-border" />
      </motion.div>

      {/* Contenu central */}
      <motion.div
        className="relative z-10 text-center max-w-2xl mx-auto px-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Label discret */}
        <motion.p
          variants={line}
          className="font-jost text-[10px] tracking-[0.35em] uppercase text-muted mb-8"
        >
          Fleuriste à Tlemcen
        </motion.p>

        {/* Titre principal — sobre et puissant */}
        <motion.h1
          variants={line}
          className="font-playfair text-5xl md:text-6xl lg:text-7xl text-noir leading-[1.1] mb-6"
        >
          Quand les mots manquent,{" "}
          <em className="font-cormorant not-italic text-rouge">les fleurs parlent.</em>
        </motion.h1>

        {/* Ligne or animée */}
        <motion.div
          className="mx-auto mb-6 h-px bg-or/40"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 80, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        />


        {/* CTAs */}
        <motion.div
          variants={line}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/catalogue"
            className="inline-flex items-center justify-center px-8 py-3 bg-noir text-white font-jost text-xs tracking-widest uppercase hover:bg-rouge transition-all duration-300"
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

        {/* Badge livraison discret */}
        <motion.div
          variants={line}
          className="mt-12 inline-flex items-center gap-3 text-muted"
        >
          <div className="w-8 h-px bg-border" />
          <span className="font-jost text-xs tracking-widest uppercase">Livraison — 69 wilayas</span>
          <div className="w-8 h-px bg-border" />
        </motion.div>
      </motion.div>

      {/* Flèche scroll */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-px h-10 bg-gradient-to-b from-border to-transparent mx-auto"
        />
      </motion.div>
    </section>
  );
}
