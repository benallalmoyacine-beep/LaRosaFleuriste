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

  const filtered = selectedCat
    ? produits.filter((p) => p.categorie.includes(selectedCat.id))
    : [];

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
      <AnimatePresence mode="wait">

        {/* ── VUE CATÉGORIES ── */}
        {!selectedCat && (
          <motion.div
            key="categories"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Header */}
            <div className="text-center mb-6 sm:mb-10">
              <p className="font-jost text-[10px] tracking-[0.3em] uppercase text-muted mb-2">
                Notre collection
              </p>
              <h1 className="font-playfair text-3xl sm:text-5xl text-noir mb-3">Catalogue</h1>
              <div className="divider-or max-w-[80px] mx-auto" />
            </div>

            {/* Grille catégories */}
            <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-4">
              {categories.map((cat, i) => {
                const img = cat.image?.[0]?.url;
                return (
                  <motion.button
                    key={cat.id}
                    onClick={() => setSelectedCat(cat)}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="group relative overflow-hidden aspect-square bg-border focus:outline-none"
                  >
                    {/* Photo */}
                    {img ? (
                      <Image
                        src={img}
                        alt={cat.nom}
                        fill
                        sizes="(max-width: 640px) 33vw, (max-width: 1024px) 25vw, 20vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-rose/20 to-border flex items-center justify-center">
                        <span className="text-3xl">🌸</span>
                      </div>
                    )}

                    {/* Overlay dégradé */}
                    <div className="absolute inset-0 bg-gradient-to-b from-noir/50 via-transparent to-noir/20 group-hover:from-noir/60 transition-all duration-300" />

                    {/* Nom — haut gauche */}
                    <div className="absolute top-0 left-0 right-0 p-2 sm:p-3">
                      <span className="font-jost font-semibold text-white text-[10px] sm:text-xs tracking-wide uppercase leading-tight drop-shadow-md">
                        {cat.nom}
                      </span>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {categories.length === 0 && (
              <div className="text-center py-20 text-muted">
                <p className="font-cormorant italic text-xl">Aucune catégorie disponible.</p>
              </div>
            )}
          </motion.div>
        )}

        {/* ── VUE PRODUITS ── */}
        {selectedCat && (
          <motion.div
            key={`products-${selectedCat.id}`}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.22 }}
          >
            {/* Header catégorie */}
            <div className="flex items-center gap-3 mb-6 sm:mb-8">
              <button
                onClick={() => setSelectedCat(null)}
                className="flex items-center gap-1 text-muted hover:text-noir font-jost text-xs tracking-wider uppercase transition-colors"
              >
                <ChevronLeft size={14} />
                <span className="hidden sm:inline">Retour</span>
              </button>
              <div className="h-4 w-px bg-border" />
              <h2 className="font-playfair text-xl sm:text-3xl text-noir">{selectedCat.nom}</h2>
              <span className="font-jost text-xs text-muted ml-auto">
                {filtered.length} article{filtered.length > 1 ? "s" : ""}
              </span>
            </div>

            {/* Grille produits */}
            {filtered.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                {filtered.map((p) => (
                  <ProductCard key={p.id} produit={p} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="font-cormorant italic text-muted text-xl">
                  Aucun produit dans cette catégorie.
                </p>
              </div>
            )}
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
