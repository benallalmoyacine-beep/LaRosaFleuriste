"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import type { Produit } from "@/types/airtable";

const DISPO: Record<string, { label: string; cls: string }> = {
  "En stock": { label: "En stock", cls: "text-vert border-vert/40 bg-vert/10" },
  "Sur commande": { label: "Sur commande", cls: "text-or border-or/40 bg-or/10" },
  Rupture: { label: "Rupture", cls: "text-blanc/30 border-blanc/10 bg-blanc/5" },
};

export default function ProductCard({ produit }: { produit: Produit }) {
  const { addItem, setDrawerOpen } = useCart();
  const dispo = DISPO[produit.disponibilite] ?? DISPO["En stock"];
  const rupture = produit.disponibilite === "Rupture";

  return (
    <motion.article
      className="group relative"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -4 }}
    >
      <div className="relative border border-or/20 group-hover:border-or/50 transition-all duration-500 overflow-hidden bg-blanc/[0.02] h-full flex flex-col">
        {/* Image */}
        <Link href={`/catalogue/${produit.slug}`} className="block relative aspect-square overflow-hidden">
          {produit.photos[0] ? (
            <Image
              src={produit.photos[0].url}
              alt={produit.nom}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-rose/20 to-rouge/10 flex items-center justify-center">
              <span className="text-5xl">🌹</span>
            </div>
          )}
          {/* Bloom overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-noir/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          {/* Quick-view hint */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <span className="font-jost text-xs tracking-widest uppercase text-blanc bg-noir/60 px-4 py-2 border border-or/40">
              Voir détails
            </span>
          </div>
        </Link>

        {/* Info */}
        <div className="p-4 flex flex-col flex-1">
          <span className={`self-start text-xs border px-2 py-0.5 font-jost tracking-wider mb-2 ${dispo.cls}`}>
            {dispo.label}
          </span>

          <Link href={`/catalogue/${produit.slug}`}>
            <h3 className="font-playfair text-blanc text-lg leading-tight group-hover:text-or transition-colors mb-1">
              {produit.nom}
            </h3>
          </Link>

          {produit.description && (
            <p className="font-cormorant italic text-blanc/40 text-sm leading-relaxed line-clamp-2 flex-1">
              {produit.description}
            </p>
          )}

          <div className="flex items-center justify-between mt-4 pt-3 border-t border-or/10">
            <p className="font-playfair text-or text-xl">
              {produit.prix.toLocaleString("fr-DZ")}{" "}
              <span className="text-xs text-or/60">DZD</span>
            </p>
            <button
              disabled={rupture}
              onClick={() => {
                addItem({ id: produit.id, nom: produit.nom, prix: produit.prix, photo: produit.photos[0]?.url });
                setDrawerOpen(true);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-jost tracking-wider transition-all ${
                rupture
                  ? "opacity-30 cursor-not-allowed border border-blanc/20 text-blanc/30"
                  : "bg-rouge text-blanc hover:bg-rouge/80"
              }`}
            >
              <ShoppingCart size={13} />
              {rupture ? "Indisponible" : "Ajouter"}
            </button>
          </div>
        </div>

        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-or/50 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-or/50 pointer-events-none" />
      </div>
    </motion.article>
  );
}
