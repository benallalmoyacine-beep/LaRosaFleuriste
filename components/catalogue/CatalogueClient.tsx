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
      {/* Category filter pills */}
      <div className="flex flex-wrap gap-2 mb-10">
        <button
          onClick={() => setSelected(null)}
          className={`px-4 py-1.5 text-sm font-jost tracking-widest uppercase border transition-all ${
            selected === null
              ? "border-or bg-or text-noir"
              : "border-or/30 text-or/60 hover:border-or hover:text-or"
          }`}
        >
          Tout
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelected(selected === cat.id ? null : cat.id)}
            className={`px-4 py-1.5 text-sm font-jost tracking-widest uppercase border transition-all ${
              selected === cat.id
                ? "border-or bg-or text-noir"
                : "border-or/30 text-or/60 hover:border-or hover:text-or"
            }`}
          >
            {cat.nom}
          </button>
        ))}
      </div>

      {/* Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selected ?? "all"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filtered.length > 0 ? (
            filtered.map((p) => <ProductCard key={p.id} produit={p} />)
          ) : (
            <div className="col-span-full text-center py-20 text-blanc/30 font-cormorant italic text-xl">
              Aucun produit dans cette catégorie pour le moment.
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
