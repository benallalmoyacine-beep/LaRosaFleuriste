"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import type { Produit } from "@/types/airtable";
import ProductOptionsModal from "./ProductOptionsModal";

export default function ProductCard({ produit }: { produit: Produit }) {
  const { addItem } = useCart();
  const { showToast } = useToast();
  const [qty, setQty] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);

  const rupture = produit.disponibilite === "Rupture";
  const hasOptions = (produit.tailles?.length > 0) || (produit.couleurs?.length > 0);

  const prixActuel = produit.prixPromo ?? produit.prix;
  const aPromo = !!produit.prixPromo && produit.prixPromo < produit.prix;
  const remise = aPromo ? Math.round((1 - produit.prixPromo! / produit.prix) * 100) : 0;

  const handleAdd = () => {
    if (rupture) return;
    if (hasOptions) {
      setModalOpen(true);
    } else {
      for (let i = 0; i < qty; i++) {
        addItem({ id: produit.id, nom: produit.nom, prix: prixActuel, photo: produit.photos[0]?.url });
      }
      showToast(produit.nom);
      setQty(1);
    }
  };

  const handleConfirm = (taille?: string, couleur?: string) => {
    const variantId = `${produit.id}|${taille ?? ""}|${couleur ?? ""}`;
    const label = [taille, couleur].filter(Boolean).join(" · ");
    for (let i = 0; i < qty; i++) {
      addItem({
        id: variantId,
        nom: produit.nom,
        prix: prixActuel,
        photo: produit.photos[0]?.url,
        taille,
        couleur,
        details: label || undefined,
      });
    }
    showToast(produit.nom);
    setModalOpen(false);
    setQty(1);
  };

  return (
    <>
      <div className="bg-white border border-border flex flex-col overflow-hidden hover:shadow-md transition-shadow duration-300">

        {/* ── Image ── */}
        <Link href={`/catalogue/${produit.slug}`} className="relative block overflow-hidden bg-blanc" style={{ aspectRatio: "1/1" }}>
          {produit.photos[0] ? (
            <Image
              src={produit.photos[0].url}
              alt={produit.nom}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-rose/20 to-border flex items-center justify-center">
              <span className="text-4xl">🌹</span>
            </div>
          )}

          {/* Badges — haut gauche */}
          <div className="absolute top-1.5 left-1.5 flex flex-col gap-1">
            {aPromo && (
              <span className="bg-rouge text-white font-jost font-bold text-[10px] px-1.5 py-0.5 rounded-sm leading-tight">
                -{remise}%
              </span>
            )}
            {produit.nouveau && (
              <span className="bg-vert text-white font-jost font-bold text-[10px] px-1.5 py-0.5 rounded-sm leading-tight">
                NOUVEAU
              </span>
            )}
          </div>

          {/* Rupture overlay */}
          {rupture && (
            <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
              <span className="font-jost text-xs text-muted tracking-widest uppercase bg-white/80 px-3 py-1">
                Indisponible
              </span>
            </div>
          )}
        </Link>

        {/* ── Infos ── */}
        <div className="flex flex-col flex-1 p-2 sm:p-3">

          {/* Nom */}
          <Link href={`/catalogue/${produit.slug}`} className="block mb-2">
            <h3 className="font-jost text-noir text-xs sm:text-[13px] leading-snug line-clamp-2 hover:text-rouge transition-colors">
              {produit.nom}
            </h3>
          </Link>

          {/* Prix */}
          <div className="mb-2">
            {aPromo ? (
              <div className="flex flex-wrap items-baseline gap-1.5">
                <span className="font-jost font-bold text-rouge text-sm sm:text-base leading-none">
                  {produit.prixPromo!.toLocaleString("fr-DZ")}
                  <span className="text-[10px] font-normal ml-0.5">DZD</span>
                </span>
                <span className="font-jost text-muted text-xs line-through leading-none">
                  {produit.prix.toLocaleString("fr-DZ")}
                </span>
              </div>
            ) : (
              <span className="font-jost font-bold text-noir text-sm sm:text-base leading-none">
                {produit.prix.toLocaleString("fr-DZ")}
                <span className="text-[10px] font-normal text-muted ml-0.5">DZD</span>
              </span>
            )}
          </div>

          {/* Qty + Ajouter */}
          {!rupture && (
            <div className="flex items-center gap-1 mt-auto">
              {/* Contrôles qty */}
              <div className="flex items-center border border-border shrink-0">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="w-6 h-7 sm:w-7 sm:h-7 flex items-center justify-center text-muted hover:bg-blanc transition-colors"
                >
                  <Minus size={9} />
                </button>
                <span className="w-5 sm:w-6 text-center font-jost text-xs text-noir select-none">{qty}</span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="w-6 h-7 sm:w-7 sm:h-7 flex items-center justify-center text-muted hover:bg-blanc transition-colors"
                >
                  <Plus size={9} />
                </button>
              </div>

              {/* Bouton ajouter */}
              <button
                onClick={handleAdd}
                className="flex-1 h-7 bg-rouge text-white font-jost font-semibold text-[10px] sm:text-xs tracking-wider uppercase hover:bg-noir transition-colors"
              >
                Ajouter
              </button>
            </div>
          )}
        </div>
      </div>

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
