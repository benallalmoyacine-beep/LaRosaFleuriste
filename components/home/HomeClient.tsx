"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import VitrineDore from "./VitrineDore";
import ProductCard from "@/components/catalogue/ProductCard";
import type { Produit, Categorie } from "@/types/airtable";

interface Props {
  produits: Produit[];
  categories: Categorie[];
  vitrineProds: Produit[];
}

export default function HomeClient({ produits, categories, vitrineProds }: Props) {
  const [selectedCat, setSelectedCat] = useState<Categorie | null>(null);
  const produitsSectionRef = useRef<HTMLDivElement>(null);

  const filtered = selectedCat
    ? produits.filter((p) => p.categorie.includes(selectedCat.id))
    : produits;

  const handleCatClick = (cat: Categorie) => {
    setSelectedCat(cat);
    setTimeout(() => {
      produitsSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  };

  return (
    <div>

      {/* ══ SECTION CATÉGORIES ══ */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10">
        <div className="text-center mb-5 sm:mb-8">
          <p className="font-jost text-[10px] tracking-[0.3em] uppercase text-muted mb-1.5">
            Parcourir par
          </p>
          <h2 className="font-playfair text-2xl sm:text-4xl text-noir mb-3">Catégories</h2>
          <div className="divider-or max-w-[60px] mx-auto" />
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 sm:gap-3">
          {categories.map((cat, i) => {
            const img = cat.image?.[0]?.url;
            const isSelected = selectedCat?.id === cat.id;
            return (
              <motion.button
                key={cat.id}
                onClick={() => handleCatClick(cat)}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                className={`group relative overflow-hidden focus:outline-none transition-all duration-200 ${
                  isSelected ? "ring-2 ring-rouge ring-offset-1" : ""
                }`}
                style={{ aspectRatio: "1/1" }}
              >
                {img ? (
                  <Image
                    src={img}
                    alt={cat.nom}
                    fill
                    sizes="(max-width: 640px) 33vw, 20vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-rose/30 to-border flex items-center justify-center">
                    <span className="text-3xl">🌸</span>
                  </div>
                )}

                {/* Overlay gradient */}
                <div className={`absolute inset-0 transition-all duration-300 ${
                  isSelected
                    ? "bg-rouge/40"
                    : "bg-gradient-to-t from-noir/65 via-noir/15 to-transparent group-hover:from-noir/75"
                }`} />

                {/* Nom — haut gauche */}
                <div className="absolute top-0 left-0 right-0 p-1.5 sm:p-2">
                  <span className="font-jost font-semibold text-white text-[8px] sm:text-[10px] tracking-wide uppercase leading-tight drop-shadow-lg line-clamp-2 text-left block">
                    {cat.nom}
                  </span>
                </div>

                {/* Tick si sélectionné */}
                {isSelected && (
                  <div className="absolute bottom-1 right-1 w-4 h-4 bg-rouge rounded-full flex items-center justify-center">
                    <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5L4.5 7.5L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>
      </section>

      {/* ══ SECTION VITRINE DORÉE (masquée si filtre actif) ══ */}
      <AnimatePresence>
        {!selectedCat && vitrineProds.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <VitrineDore produits={vitrineProds} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══ SECTION PRODUITS ══ */}
      <section
        ref={produitsSectionRef}
        className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10 scroll-mt-16"
      >
        {/* Header produits */}
        <div className="flex items-center justify-between mb-5 sm:mb-8">
          <div>
            <p className="font-jost text-[10px] tracking-[0.3em] uppercase text-muted mb-1">
              {selectedCat ? selectedCat.nom : "Notre collection"}
            </p>
            <h2 className="font-playfair text-2xl sm:text-4xl text-noir">
              {selectedCat ? `${filtered.length} article${filtered.length > 1 ? "s" : ""}` : "Produits"}
            </h2>
          </div>

          {/* Réinitialiser filtre */}
          {selectedCat && (
            <button
              onClick={() => setSelectedCat(null)}
              className="flex items-center gap-1.5 border border-border text-muted hover:border-noir hover:text-noir font-jost text-xs tracking-wider uppercase px-3 py-2 transition-all"
            >
              <X size={11} />
              Tout afficher
            </button>
          )}
        </div>

        {!selectedCat && <div className="divider-or max-w-[60px] mb-6 sm:mb-10" />}

        {/* Grille */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCat?.id ?? "all"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4"
          >
            {filtered.length > 0 ? (
              filtered.map((p) => <ProductCard key={p.id} produit={p} />)
            ) : (
              <div className="col-span-full text-center py-16">
                <p className="font-cormorant italic text-muted text-xl">
                  Aucun produit dans cette catégorie.
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </section>

    </div>
  );
}
