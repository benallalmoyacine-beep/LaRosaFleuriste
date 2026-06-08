"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import ProductCard from "./ProductCard";
import type { Produit, Categorie } from "@/types/airtable";

interface Props {
  produits: Produit[];
  categories: Categorie[];
}

export default function CatalogueClient({ produits, categories }: Props) {
  const [selectedCat, setSelectedCat] = useState<Categorie | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
      <AnimatePresence mode="wait">

        {/* ── VUE CATÉGORIES ── */}
        {selectedCat === null && (
          <motion.div
            key="categories"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="text-center mb-6 sm:mb-10">
              <p className="font-jost text-[10px] tracking-[0.3em] uppercase text-muted mb-2">
                Notre collection
              </p>
              <h1 className="font-playfair text-3xl sm:text-5xl text-noir mb-3">Catalogue</h1>
              <div className="divider-or max-w-[80px] mx-auto" />
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
              {categories.map((cat, i) => {
                const img = cat.image?.[0]?.url;
                return (
                  <motion.button
                    key={cat.id}
                    onClick={() => setSelectedCat(cat)}
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.35, delay: i * 0.04 }}
                    className="group relative overflow-hidden bg-border focus:outline-none"
                    style={{ aspectRatio: "1 / 1" }}
                  >
                    {img ? (
                      <Image
                        src={img}
                        alt={cat.nom}
                        fill
                        sizes="(max-width: 640px) 33vw, 25vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-rose/30 to-border flex items-center justify-center">
                        <span className="text-4xl">🌸</span>
                      </div>
                    )}

                    {/* Overlay permanent */}
                    <div className="absolute inset-0 bg-gradient-to-t from-noir/70 via-noir/20 to-transparent group-hover:from-noir/80 transition-all duration-300" />

                    {/* Nom — bas gauche pour plus de lisibilité */}
                    <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-2.5">
                      <span className="font-jost font-semibold text-white text-[9px] sm:text-[11px] tracking-wide uppercase leading-tight drop-shadow-lg line-clamp-2 text-left block">
                        {cat.nom}
                      </span>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {categories.length === 0 && (
              <div className="text-center py-20">
                <p className="font-cormorant italic text-muted text-xl">Aucune catégorie disponible.</p>
              </div>
            )}
          </motion.div>
        )}

        {/* ── VUE PRODUITS ── */}
        {selectedCat !== null && (
          <motion.div
            key={selectedCat.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 mb-5 sm:mb-8 border-b border-border pb-4">
              <button
                onClick={() => setSelectedCat(null)}
                className="flex items-center gap-1 text-muted hover:text-noir font-jost text-xs tracking-wider uppercase transition-colors shrink-0"
              >
                <ChevronLeft size={14} />
                Retour
              </button>
              <div className="h-4 w-px bg-border" />
              <h2 className="font-playfair text-lg sm:text-2xl text-noir truncate">{selectedCat.nom}</h2>
              <span className="font-jost text-[10px] text-muted ml-auto shrink-0">
                {produits.filter(p => p.categorie.includes(selectedCat.id)).length} article{produits.filter(p => p.categorie.includes(selectedCat.id)).length > 1 ? "s" : ""}
              </span>
            </div>

            {/* Grille produits */}
            {(() => {
              const filtered = produits.filter(p => p.categorie.includes(selectedCat.id));
              return filtered.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                  {filtered.map((p) => (
                    <ProductCard key={p.id} produit={p} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <p className="font-cormorant italic text-muted text-xl">Aucun produit dans cette catégorie.</p>
                </div>
              );
            })()}
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
