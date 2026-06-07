"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, ChevronLeft, Minus, Plus } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import type { Produit } from "@/types/airtable";

const DISPO: Record<string, { label: string; cls: string }> = {
  "En stock": { label: "En stock", cls: "text-vert" },
  "Sur commande": { label: "Sur commande", cls: "text-or" },
  Rupture: { label: "Rupture de stock", cls: "text-blanc/40" },
};

export default function ProductDetail({ produit }: { produit: Produit }) {
  const [mainPhoto, setMainPhoto] = useState(0);
  const [qty, setQty] = useState(1);
  const { addItem, setDrawerOpen } = useCart();
  const dispo = DISPO[produit.disponibilite] ?? DISPO["En stock"];
  const rupture = produit.disponibilite === "Rupture";

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) {
      addItem({ id: produit.id, nom: produit.nom, prix: produit.prix, photo: produit.photos[0]?.url });
    }
    setDrawerOpen(true);
  };

  return (
    <div className="min-h-screen bg-noir pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <Link
          href="/catalogue"
          className="inline-flex items-center gap-2 text-or/60 hover:text-or font-jost text-sm tracking-wider mb-10 transition-colors"
        >
          <ChevronLeft size={16} />
          Retour au catalogue
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Gallery */}
          <div>
            <div className="relative aspect-square overflow-hidden border border-or/20 mb-3">
              <AnimatePresence mode="wait">
                <motion.div
                  key={mainPhoto}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0"
                >
                  {produit.photos[mainPhoto] ? (
                    <Image
                      src={produit.photos[mainPhoto].url}
                      alt={produit.nom}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-rose/20 to-rouge/10 flex items-center justify-center">
                      <span className="text-8xl">🌹</span>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Thumbnails */}
            {produit.photos.length > 1 && (
              <div className="flex gap-2 flex-wrap">
                {produit.photos.map((ph, i) => (
                  <button
                    key={ph.id}
                    onClick={() => setMainPhoto(i)}
                    className={`relative w-16 h-16 border overflow-hidden transition-all ${
                      i === mainPhoto ? "border-or" : "border-or/20 hover:border-or/50"
                    }`}
                  >
                    <Image src={ph.url} alt="" fill className="object-cover" sizes="64px" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="lg:sticky lg:top-28">
            <p className={`font-jost text-sm tracking-widest uppercase mb-3 ${dispo.cls}`}>
              {dispo.label}
            </p>
            <h1 className="font-playfair text-4xl md:text-5xl text-blanc mb-4 leading-tight">
              {produit.nom}
            </h1>
            <div className="divider-or max-w-[100px] mb-6" />

            <p className="font-playfair text-3xl text-or mb-6">
              {produit.prix.toLocaleString("fr-DZ")}{" "}
              <span className="text-lg text-or/60">DZD</span>
            </p>

            {produit.description && (
              <p className="font-cormorant italic text-blanc/60 text-lg leading-relaxed mb-8">
                {produit.description}
              </p>
            )}

            {/* Qty */}
            {!rupture && (
              <div className="flex items-center gap-4 mb-6">
                <span className="font-jost text-sm text-blanc/50 tracking-wider uppercase">Quantité</span>
                <div className="flex items-center border border-or/30">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="px-3 py-2 text-or/60 hover:text-or transition-colors"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="px-4 py-2 font-jost text-blanc min-w-[2.5rem] text-center">{qty}</span>
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    className="px-3 py-2 text-or/60 hover:text-or transition-colors"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                disabled={rupture}
                onClick={handleAdd}
                className={`flex items-center justify-center gap-2 flex-1 py-3 font-jost text-sm tracking-widest uppercase transition-all ${
                  rupture
                    ? "opacity-30 cursor-not-allowed border border-blanc/20 text-blanc/30"
                    : "bg-rouge text-blanc hover:bg-rouge/80"
                }`}
              >
                <ShoppingCart size={16} />
                {rupture ? "Indisponible" : "Ajouter au panier"}
              </button>
              <a
                href={`https://wa.me/213791112663?text=${encodeURIComponent(
                  `Bonjour La Rosa 🌹, je suis intéressé(e) par : ${produit.nom} (${produit.prix} DZD)`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 flex-1 py-3 border border-or text-or font-jost text-sm tracking-widest uppercase hover:bg-or hover:text-noir transition-all"
              >
                Commander directement
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
