"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import type { Produit } from "@/types/airtable";

const DISPO: Record<string, { label: string; cls: string }> = {
  "En stock": { label: "En stock", cls: "text-vert bg-vert/10" },
  "Sur commande": { label: "Sur commande", cls: "text-or bg-or/10" },
  Rupture: { label: "Rupture", cls: "text-muted bg-border" },
};

export default function ProductCard({ produit }: { produit: Produit }) {
  const { addItem, setDrawerOpen } = useCart();
  const dispo = DISPO[produit.disponibilite] ?? DISPO["En stock"];
  const rupture = produit.disponibilite === "Rupture";

  return (
    <motion.article
      className="group bg-white border border-border hover:border-or/40 transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5 }}
    >
      {/* Image */}
      <Link href={`/catalogue/${produit.slug}`} className="block relative aspect-square overflow-hidden bg-blanc">
        {produit.photos[0] ? (
          <Image
            src={produit.photos[0].url}
            alt={produit.nom}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-rose/20 to-border flex items-center justify-center">
            <span className="text-5xl">🌹</span>
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-noir/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
          <span className="font-jost text-xs tracking-widest uppercase text-white bg-noir/70 px-4 py-2">
            Voir détails
          </span>
        </div>
      </Link>

      {/* Info */}
      <div className="p-4">
        <span className={`inline-block text-xs px-2 py-0.5 font-jost tracking-wider mb-2 ${dispo.cls}`}>
          {dispo.label}
        </span>

        <Link href={`/catalogue/${produit.slug}`}>
          <h3 className="font-playfair text-noir text-lg leading-tight group-hover:text-rouge transition-colors mb-1">
            {produit.nom}
          </h3>
        </Link>

        {produit.description && (
          <p className="font-cormorant italic text-muted text-sm leading-relaxed line-clamp-2 mb-3">
            {produit.description}
          </p>
        )}

        <div className="flex items-center justify-between pt-3 border-t border-border">
          <p className="font-playfair text-noir text-lg">
            {produit.prix.toLocaleString("fr-DZ")}{" "}
            <span className="text-xs text-muted">DZD</span>
          </p>
          <button
            disabled={rupture}
            onClick={() => {
              addItem({ id: produit.id, nom: produit.nom, prix: produit.prix, photo: produit.photos[0]?.url });
              setDrawerOpen(true);
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-jost tracking-wider transition-all ${
              rupture
                ? "opacity-30 cursor-not-allowed bg-border text-muted"
                : "bg-noir text-white hover:bg-rouge"
            }`}
          >
            <ShoppingCart size={12} />
            {rupture ? "Indisponible" : "Ajouter"}
          </button>
        </div>
      </div>
    </motion.article>
  );
}
