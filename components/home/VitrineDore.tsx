"use client";

import { motion } from "framer-motion";
import ProductCard from "@/components/catalogue/ProductCard";
import type { Produit } from "@/types/airtable";

interface Props {
  produits: Produit[];
}

export default function VitrineDore({ produits }: Props) {
  if (produits.length === 0) return null;

  return (
    <section className="py-6 sm:py-10 bg-[#faf8f5] relative overflow-hidden">
      {/* Lignes dorées haut/bas */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-or/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-or/30 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">

        {/* En-tête */}
        <motion.div
          className="text-center mb-5 sm:mb-8"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-or/50" />
            <span className="text-or text-[10px] tracking-widest">✦</span>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-or/50" />
          </div>
          <p className="font-jost text-[10px] tracking-[0.35em] uppercase text-or mb-1.5">
            Sélection exclusive
          </p>
          <h2 className="font-playfair text-2xl sm:text-4xl text-noir mb-2">
            La Vitrine Dorée
          </h2>
          <div className="divider-or max-w-[100px] mx-auto" />
        </motion.div>

        {/* Grille — cartes identiques aux produits normaux, contour doré en plus */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
          {produits.map((produit, i) => (
            <motion.div
              key={produit.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="ring-1 ring-or/50 hover:ring-or transition-all duration-300"
            >
              <ProductCard produit={produit} />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
