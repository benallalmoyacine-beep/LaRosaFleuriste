"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import type { Produit } from "@/types/airtable";
import ProductOptionsModal from "./ProductOptionsModal";

const DISPO: Record<string, { label: string; cls: string }> = {
  "En stock": { label: "En stock", cls: "text-vert bg-vert/10" },
  "Sur commande": { label: "Sur commande", cls: "text-or bg-or/10" },
  Rupture: { label: "Rupture", cls: "text-muted bg-border" },
};

export default function ProductCard({ produit }: { produit: Produit }) {
  const { addItem } = useCart();
  const { showToast } = useToast();
  const dispo = DISPO[produit.disponibilite] ?? DISPO["En stock"];
  const rupture = produit.disponibilite === "Rupture";
  const [modalOpen, setModalOpen] = useState(false);

  const hasOptions = (produit.tailles?.length > 0) || (produit.couleurs?.length > 0);

  const handleAdd = () => {
    if (hasOptions) {
      setModalOpen(true);
    } else {
      addItem({ id: produit.id, nom: produit.nom, prix: produit.prix, photo: produit.photos[0]?.url });
      showToast(produit.nom);
    }
  };

  const handleConfirm = (taille?: string, couleur?: string) => {
    const variantId = `${produit.id}|${taille ?? ""}|${couleur ?? ""}`;
    const label = [taille, couleur].filter(Boolean).join(" · ");
    addItem({
      id: variantId,
      nom: produit.nom,
      prix: produit.prix,
      photo: produit.photos[0]?.url,
      taille,
      couleur,
      details: label || undefined,
    });
    showToast(produit.nom);
    setModalOpen(false);
  };

  return (
    <>
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
        <div className="p-2.5 sm:p-4">
          <span className={`inline-block text-[10px] sm:text-xs px-1.5 py-0.5 font-jost tracking-wide mb-1.5 sm:mb-2 ${dispo.cls}`}>
            {dispo.label}
          </span>

          <Link href={`/catalogue/${produit.slug}`}>
            <h3 className="font-playfair text-noir text-sm sm:text-lg leading-tight group-hover:text-rouge transition-colors mb-0.5 sm:mb-1 line-clamp-2">
              {produit.nom}
            </h3>
          </Link>

          {produit.description && (
            <p className="hidden sm:block font-cormorant italic text-muted text-sm leading-relaxed line-clamp-2 mb-2">
              {produit.description}
            </p>
          )}

          {/* Badges tailles/couleurs */}
          {(produit.tailles?.length > 0 || produit.couleurs?.length > 0) && (
            <div className="hidden sm:flex flex-wrap gap-1 mb-3">
              {produit.tailles?.map((t) => (
                <span key={t} className="font-jost text-[10px] px-1.5 py-0.5 border border-border text-muted">
                  {t}
                </span>
              ))}
              {produit.couleurs?.map((c) => (
                <span key={c} className="font-jost text-[10px] px-1.5 py-0.5 border border-border text-muted">
                  {c}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between pt-2 sm:pt-3 border-t border-border mt-1.5 sm:mt-0">
            <p className="font-playfair text-noir text-sm sm:text-lg">
              {produit.prix.toLocaleString("fr-DZ")}{" "}
              <span className="text-[10px] sm:text-xs text-muted">DZD</span>
            </p>
            <button
              disabled={rupture}
              onClick={handleAdd}
              className={`flex items-center gap-1 px-2 py-1.5 sm:px-3 sm:py-1.5 text-[10px] sm:text-xs font-jost tracking-wider transition-all min-h-[36px] ${
                rupture
                  ? "opacity-30 cursor-not-allowed bg-border text-muted"
                  : "bg-noir text-white hover:bg-rouge"
              }`}
            >
              <ShoppingCart size={10} className="sm:hidden" />
              <ShoppingCart size={12} className="hidden sm:block" />
              <span className="hidden sm:inline">{rupture ? "Indisponible" : "Ajouter"}</span>
              <span className="sm:hidden">{rupture ? "—" : "+"}</span>
            </button>
          </div>
        </div>
      </motion.article>

      {modalOpen && (
        <ProductOptionsModal
          produit={produit}
          onConfirm={handleConfirm}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
}
