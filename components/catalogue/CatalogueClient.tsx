"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "./ProductCard";
import type { Produit, Categorie } from "@/types/airtable";

interface Props {
  produits: Produit[];
  categories: Categorie[];
}

export default function CatalogueClient({ produits, categories }: Props) {
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = selected
    ? produits.filter((p) => p.categorie.includes(selected))
    : produits;

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap gap-1 mb-10 border-b border-border pb-4">
        <button
          onClick={() => setSelected(null)}
          className={`px-4 py-2 text-xs font-jost tracking-widest uppercase transition-all ${
            selected === null
              ? "text-noir border-b-2 border-noir"
              : "text-muted hover:text-noir"
          }`}
        >
          Tout ({produits.length})
        </button>
        {categories.map((cat) => {
          const count = produits.filter((p) => p.categorie.includes(cat.id)).length;
          return (
            <button
              key={cat.id}
              onClick={() => setSelected(selected === cat.id ? null : cat.id)}
              className={`px-4 py-2 text-xs font-jost tracking-widest uppercase transition-all ${
                selected === cat.id
                  ? "text-noir border-b-2 border-noir"
                  : "text-muted hover:text-noir"
              }`}
            >
              {cat.nom} ({count})
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selected ?? "all"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5"
        >
          {filtered.length > 0 ? (
            filtered.map((p) => <ProductCard key={p.id} produit={p} />)
          ) : (
            <div className="col-span-full text-center py-20">
              <p className="font-cormorant italic text-muted text-xl">
                Aucun produit dans cette catégorie pour le moment.
              </p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
