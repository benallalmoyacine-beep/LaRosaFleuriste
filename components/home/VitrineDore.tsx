"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import type { Produit } from "@/types/airtable";
import OptionsBadges from "@/components/catalogue/OptionsBadges";
import ProductOptionsModal from "@/components/catalogue/ProductOptionsModal";

interface Props {
  produits: Produit[];
}

const DISPO: Record<string, { label: string; cls: string }> = {
  "En stock": { label: "En stock", cls: "text-vert bg-vert/10" },
  "Sur commande": { label: "Sur commande", cls: "text-or bg-or/10" },
  Rupture: { label: "Rupture", cls: "text-muted bg-border" },
};

export default function VitrineDore({ produits }: Props) {
  const { addItem } = useCart();
  const { showToast } = useToast();
  const [modalProduit, setModalProduit] = useState<Produit | null>(null);

  if (produits.length === 0) return null;

  const handleAdd = (produit: Produit) => {
    const hasOptions = produit.tailles?.length > 0 || produit.couleurs?.length > 0;
    if (hasOptions) {
      setModalProduit(produit);
    } else {
      addItem({ id: produit.id, nom: produit.nom, prix: produit.prix, photo: produit.photos[0]?.url });
      showToast(produit.nom);
    }
  };

  const handleConfirm = (taille?: string, couleur?: string) => {
    if (!modalProduit) return;
    const variantId = `${modalProduit.id}|${taille ?? ""}|${couleur ?? ""}`;
    const label = [taille, couleur].filter(Boolean).join(" · ");
    addItem({
      id: variantId,
      nom: modalProduit.nom,
      prix: modalProduit.prix,
      photo: modalProduit.photos[0]?.url,
      taille,
      couleur,
      details: label || undefined,
    });
    showToast(modalProduit.nom);
    setModalProduit(null);
  };

  return (
  <>
    <section className="py-16 md:py-24 bg-[#faf8f5] relative overflow-hidden">
      {/* Ornement fond doré subtil */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-or/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-or/30 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* En-tête section */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* Ornements latéraux */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-or/50" />
            <span className="text-or text-xs tracking-widest">✦</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-or/50" />
          </div>

          <p className="font-jost text-[10px] tracking-[0.35em] uppercase text-or mb-2">
            Sélection exclusive
          </p>
          <h2 className="font-playfair text-3xl md:text-5xl text-noir mb-3">
            La Vitrine Dorée
          </h2>
          <div className="divider-or max-w-[140px] mx-auto mb-3" />
          <p className="font-cormorant italic text-muted text-base md:text-lg">
            Nos créations vedettes — vues sur Instagram
          </p>
        </motion.div>

        {/* Grille premium */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {produits.map((produit, i) => {
            const dispo = DISPO[produit.disponibilite] ?? DISPO["En stock"];
            const rupture = produit.disponibilite === "Rupture";
            return (
              <motion.article
                key={produit.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group relative"
              >
                {/* Cadre doré */}
                <div className="relative border border-or/30 hover:border-or/70 transition-all duration-500 bg-white shadow-sm hover:shadow-md">

                  {/* Coins dorés */}
                  <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-or z-10 pointer-events-none" />
                  <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-or z-10 pointer-events-none" />
                  <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-or z-10 pointer-events-none" />
                  <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-or z-10 pointer-events-none" />

                  {/* Badge Instagram */}
                  <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1 bg-white/90 backdrop-blur-sm border border-or/40 text-[9px] md:text-[10px] px-1.5 md:px-2.5 py-0.5 md:py-1 font-jost tracking-wider text-or">
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="2" width="20" height="20" rx="5"/>
                      <circle cx="12" cy="12" r="4"/>
                      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                    </svg>
                    <span className="hidden sm:inline">Vu sur Instagram</span>
                    <span className="sm:hidden">Insta</span>
                    <span>✨</span>
                  </div>

                  {/* Image */}
                  <div className="relative aspect-[3/4] overflow-hidden">
                    {produit.photos[0] ? (
                      <Image
                        src={produit.photos[0].url}
                        alt={produit.nom}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-rose/20 to-border flex items-center justify-center">
                        <span className="text-4xl md:text-6xl">🌹</span>
                      </div>
                    )}
                    {/* Overlay hover */}
                    <div className="absolute inset-0 bg-noir/10 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                  </div>

                  {/* Infos */}
                  <div className="p-3 md:p-5">
                    <span className={`inline-block text-[9px] md:text-xs px-1.5 md:px-2 py-0.5 font-jost tracking-wider mb-1.5 md:mb-2 ${dispo.cls}`}>
                      {dispo.label}
                    </span>

                    <h3 className="font-playfair text-noir text-sm md:text-xl mb-0.5 md:mb-1 leading-tight group-hover:text-rouge transition-colors line-clamp-2">
                      {produit.nom}
                    </h3>

                    {produit.description && (
                      <p className="hidden md:block font-cormorant italic text-muted text-sm leading-relaxed line-clamp-2 mb-2">
                        {produit.description}
                      </p>
                    )}

                    <OptionsBadges produit={produit} size="sm" />

                    <div className="flex items-center justify-between pt-2 md:pt-3 border-t border-or/15 mt-2 gap-1">
                      <p className="font-playfair text-noir text-sm md:text-xl">
                        {produit.prix.toLocaleString("fr-DZ")}
                        <span className="text-[9px] md:text-sm text-muted ml-0.5">DZD</span>
                      </p>
                      <div className="flex gap-1.5">
                        <Link
                          href={`/catalogue/${produit.slug}`}
                          className="px-2 md:px-3 py-1 md:py-1.5 border border-or/40 text-or text-[9px] md:text-xs font-jost tracking-wider hover:bg-or hover:text-white transition-all"
                        >
                          Voir
                        </Link>
                        {!rupture && (
                          <button
                            onClick={() => handleAdd(produit)}
                            className="px-2 md:px-3 py-1 md:py-1.5 bg-noir text-white text-[9px] md:text-xs font-jost tracking-wider hover:bg-rouge transition-all min-h-[28px]"
                          >
                            +
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Lien catalogue */}
        <motion.div
          className="text-center mt-10 md:mt-14"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Link
            href="/catalogue"
            className="inline-flex items-center gap-3 border border-or text-or font-jost text-xs tracking-widest uppercase px-8 md:px-12 py-3 hover:bg-or hover:text-white transition-all duration-300"
          >
            <span className="text-[10px]">✦</span>
            Voir tout le Catalogue
            <span className="text-[10px]">✦</span>
          </Link>
        </motion.div>
      </div>
    </section>

    {modalProduit && (
      <ProductOptionsModal
        produit={modalProduit}
        onConfirm={handleConfirm}
        onClose={() => setModalProduit(null)}
      />
    )}
  </>
  );
}
