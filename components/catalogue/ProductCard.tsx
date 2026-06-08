"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import type { Produit } from "@/types/airtable";
import ProductOptionsModal from "./ProductOptionsModal";
import OptionsBadges from "./OptionsBadges";

export default function ProductCard({ produit }: { produit: Produit }) {
  const { addItem } = useCart();
  const { showToast } = useToast();
  const [qty, setQty] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);

  const rupture = produit.disponibilite === "Rupture";
  const hasOptions = (produit.tailles?.length > 0) || (produit.couleurs?.length > 0);

  // Prix affiché
  const prixActuel = produit.prixPromo ?? produit.prix;
  const aPromo = !!produit.prixPromo && produit.prixPromo < produit.prix;
  const remise = aPromo
    ? Math.round((1 - produit.prixPromo! / produit.prix) * 100)
    : 0;

  const handleAdd = () => {
    if (rupture) return;
    if (hasOptions) {
      setModalOpen(true);
    } else {
      for (let i = 0; i < qty; i++) {
        addItem({ id: produit.id, nom: produit.nom, prix: prixActuel, photo: produit.photos[0]?.url });
      }
      showToast(produit.nom);
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
  };

  return (
    <>
      <div className="bg-white border border-border flex flex-col">

        {/* Image */}
        <Link href={`/catalogue/${produit.slug}`} className="relative block aspect-square overflow-hidden bg-blanc">
          {produit.photos[0] ? (
            <Image
              src={produit.photos[0].url}
              alt={produit.nom}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-rose/20 to-border flex items-center justify-center">
              <span className="text-4xl">🌹</span>
            </div>
          )}

          {/* Badges sur l'image — haut gauche */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {aPromo && (
              <span className="bg-rouge text-white font-jost font-semibold text-[10px] px-1.5 py-0.5 rounded-sm">
                -{remise}%
              </span>
            )}
            {produit.nouveau && (
              <span className="bg-vert text-white font-jost font-semibold text-[10px] px-1.5 py-0.5 rounded-sm">
                NOUVEAU
              </span>
            )}
          </div>
        </Link>

        {/* Infos */}
        <div className="flex flex-col flex-1 p-2 sm:p-3 gap-1.5">

          {/* Nom */}
          <Link href={`/catalogue/${produit.slug}`}>
            <h3 className="font-jost text-noir text-xs sm:text-sm leading-tight line-clamp-2 hover:text-rouge transition-colors">
              {produit.nom}
            </h3>
          </Link>

          {/* Badges taille/couleur */}
          <OptionsBadges produit={produit} size="sm" />

          {/* Prix */}
          <div className="flex items-baseline gap-1.5 mt-auto pt-1">
            {aPromo ? (
              <>
                <span className="font-jost font-semibold text-rouge text-sm sm:text-base">
                  {produit.prixPromo!.toLocaleString("fr-DZ")}
                  <span className="text-[10px] ml-0.5">DZD</span>
                </span>
                <span className="font-jost text-muted text-xs line-through">
                  {produit.prix.toLocaleString("fr-DZ")}
                </span>
              </>
            ) : (
              <span className="font-jost font-semibold text-noir text-sm sm:text-base">
                {produit.prix.toLocaleString("fr-DZ")}
                <span className="text-[10px] text-muted ml-0.5">DZD</span>
              </span>
            )}
          </div>

          {/* Qty + Ajouter */}
          <div className="flex items-center gap-1 mt-1">
            {/* Contrôles qty */}
            {!rupture && (
              <div className="flex items-center border border-border shrink-0">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="w-7 h-7 flex items-center justify-center text-muted hover:text-noir hover:bg-blanc transition-colors"
                >
                  <Minus size={10} />
                </button>
                <span className="w-6 text-center font-jost text-xs text-noir">{qty}</span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="w-7 h-7 flex items-center justify-center text-muted hover:text-noir hover:bg-blanc transition-colors"
                >
                  <Plus size={10} />
                </button>
              </div>
            )}

            {/* Bouton ajouter */}
            <button
              disabled={rupture}
              onClick={handleAdd}
              className={`flex-1 h-7 font-jost text-[10px] sm:text-xs tracking-wider uppercase transition-all ${
                rupture
                  ? "bg-border text-muted cursor-not-allowed opacity-50"
                  : "bg-noir text-white hover:bg-rouge"
              }`}
            >
              {rupture ? "Indisponible" : "Ajouter"}
            </button>
          </div>

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
