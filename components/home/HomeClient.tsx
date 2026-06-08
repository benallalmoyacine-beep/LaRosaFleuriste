"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import VitrineDore from "./VitrineDore";
import ProductCard from "@/components/catalogue/ProductCard";
import type { Produit, Categorie } from "@/types/airtable";

interface Props {
  produits: Produit[];
  categories: Categorie[];
  vitrineProds: Produit[];
}

export default function HomeClient({ produits, categories, vitrineProds }: Props) {
  return (
    <div>

      {/* ══ SECTION CATÉGORIES ══ */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-4 pb-3 sm:pt-6 sm:pb-4">
        <div className="text-center mb-4 sm:mb-6">
          <p className="font-jost text-[10px] tracking-[0.3em] uppercase text-muted mb-1.5">
            Parcourir par
          </p>
          <h2 className="font-playfair text-2xl sm:text-4xl text-noir mb-3">Catégories</h2>
          <div className="divider-or max-w-[60px] mx-auto" />
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 sm:gap-3">
          {categories.map((cat, i) => {
            const img = cat.image?.[0]?.url;
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
              >
                <Link
                  href={`/categorie/${cat.slug}`}
                  className="group relative overflow-hidden block focus:outline-none"
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

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-noir/65 via-noir/15 to-transparent group-hover:from-noir/80 transition-all duration-300" />

                  {/* Nom — haut gauche */}
                  <div className="absolute top-0 left-0 right-0 p-1.5 sm:p-2">
                    <span className="font-jost font-semibold text-white text-[8px] sm:text-[10px] tracking-wide uppercase leading-tight drop-shadow-lg line-clamp-2 text-left block">
                      {cat.nom}
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ══ VITRINE DORÉE ══ */}
      {vitrineProds.length > 0 && <VitrineDore produits={vitrineProds} />}

      {/* ══ SECTION PRODUITS ══ */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-3 pb-6 sm:pt-4 sm:pb-10">
        <div className="text-center mb-4 sm:mb-6">
          <p className="font-jost text-[10px] tracking-[0.3em] uppercase text-muted mb-1.5">
            Notre collection
          </p>
          <h2 className="font-playfair text-2xl sm:text-4xl text-noir mb-3">Produits</h2>
          <div className="divider-or max-w-[60px] mx-auto" />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key="all"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4"
          >
            {produits.map((p) => (
              <ProductCard key={p.id} produit={p} />
            ))}
          </motion.div>
        </AnimatePresence>
      </section>

    </div>
  );
}
