"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Plus, Minus, ShoppingCart, Flower } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import type { Fleur, Emballage } from "@/types/airtable";

interface Props {
  fleurs: Fleur[];
  emballages: Emballage[];
}

export default function BouquetBuilder({ fleurs, emballages }: Props) {
  const { addItem, setDrawerOpen } = useCart();
  const { showToast } = useToast();

  // Quantités choisies par ID de fleur
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [emballageId, setEmballageId] = useState<string>("");

  const setQty = (id: string, val: number, max: number) => {
    const clamped = Math.max(0, Math.min(val, max));
    setQuantities((prev) => ({ ...prev, [id]: clamped }));
  };

  // Calcul du prix total
  const selectedEmballage = emballages.find((e) => e.id === emballageId);
  const fleurTotal = fleurs.reduce(
    (sum, f) => sum + (quantities[f.id] ?? 0) * f.prixUnitaire,
    0
  );
  const emballageTotal = selectedEmballage?.prix ?? 0;
  const total = fleurTotal + emballageTotal;

  const hasItems = fleurTotal > 0;

  // Composition texte
  const buildDetails = () => {
    const lignes = fleurs
      .filter((f) => (quantities[f.id] ?? 0) > 0)
      .map((f) => `${quantities[f.id]}x ${f.nom}${f.couleur ? ` (${f.couleur})` : ""}`);
    if (selectedEmballage) lignes.push(`Emballage: ${selectedEmballage.nom}`);
    return lignes.join(", ");
  };

  const handleAddToCart = () => {
    if (!hasItems) return;
    const details = buildDetails();
    // ID unique basé sur composition
    const id = `bouquet-${Date.now()}`;
    addItem({
      id,
      nom: "Bouquet Sur Mesure",
      prix: total,
      details,
    });
    showToast("Bouquet Sur Mesure");
    // Reset
    setQuantities({});
    setEmballageId("");
  };

  if (fleurs.length === 0) {
    return (
      <div className="text-center py-20 text-muted">
        <Flower size={40} className="mx-auto mb-4 opacity-30" />
        <p className="font-cormorant italic text-xl">
          Aucune fleur disponible pour le moment.
        </p>
        <p className="font-jost text-xs text-muted mt-2">
          Le propri&eacute;taire peut ajouter des fleurs depuis la table &ldquo;Fleurs&rdquo; dans Airtable.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-10">

      {/* Sélection des fleurs */}
      <section>
        <h2 className="font-playfair text-2xl text-noir mb-6">
          1. Choisissez vos fleurs
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {fleurs.map((fleur, i) => {
            const qty = quantities[fleur.id] ?? 0;
            const maxed = qty >= fleur.stockDisponible;
            return (
              <motion.div
                key={fleur.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className={`border bg-white transition-all duration-200 ${
                  qty > 0 ? "border-or shadow-sm" : "border-border"
                }`}
              >
                {/* Photo */}
                <div className="relative aspect-square overflow-hidden bg-blanc">
                  {fleur.photos[0] ? (
                    <Image
                      src={fleur.photos[0].url}
                      alt={fleur.nom}
                      fill
                      sizes="(max-width: 640px) 50vw, 25vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-3xl">
                      🌸
                    </div>
                  )}
                  {qty > 0 && (
                    <span className="absolute top-1.5 right-1.5 bg-or text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                      {qty}
                    </span>
                  )}
                </div>

                {/* Infos */}
                <div className="p-2.5">
                  <p className="font-playfair text-noir text-sm leading-tight truncate">
                    {fleur.nom}
                  </p>
                  {fleur.couleur && (
                    <p className="font-jost text-[10px] text-muted truncate">{fleur.couleur}</p>
                  )}
                  <p className="font-playfair text-or text-sm mt-1">
                    {fleur.prixUnitaire.toLocaleString("fr-DZ")} DZD
                  </p>

                  {/* Contrôles +/- */}
                  <div className="flex items-center justify-between mt-2 border border-border">
                    <button
                      onClick={() => setQty(fleur.id, qty - 1, fleur.stockDisponible)}
                      disabled={qty === 0}
                      className="flex-1 py-1.5 text-muted hover:text-noir hover:bg-blanc disabled:opacity-30 transition-colors"
                    >
                      <Minus size={11} className="mx-auto" />
                    </button>
                    <span className="flex-1 text-center font-jost text-sm text-noir py-1.5 border-x border-border">
                      {qty}
                    </span>
                    <button
                      onClick={() => setQty(fleur.id, qty + 1, fleur.stockDisponible)}
                      disabled={maxed}
                      className="flex-1 py-1.5 text-muted hover:text-noir hover:bg-blanc disabled:opacity-30 transition-colors"
                    >
                      <Plus size={11} className="mx-auto" />
                    </button>
                  </div>
                  {maxed && qty > 0 && (
                    <p className="font-jost text-[9px] text-rouge mt-1 text-center">Stock max</p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Emballage (optionnel) */}
      {emballages.length > 0 && (
        <section>
          <h2 className="font-playfair text-2xl text-noir mb-6">
            2. Choisissez un emballage <span className="font-cormorant italic text-muted text-lg">(optionnel)</span>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {/* Option "sans emballage" */}
            <button
              onClick={() => setEmballageId("")}
              className={`border p-4 text-center transition-all ${
                emballageId === "" ? "border-noir bg-blanc" : "border-border bg-white hover:border-muted"
              }`}
            >
              <div className="text-3xl mb-2">🎀</div>
              <p className="font-jost text-xs text-noir">Sans emballage</p>
              <p className="font-playfair text-muted text-sm">0 DZD</p>
            </button>

            {emballages.map((emb) => (
              <button
                key={emb.id}
                onClick={() => setEmballageId(emb.id)}
                className={`border transition-all ${
                  emballageId === emb.id ? "border-or shadow-sm" : "border-border bg-white hover:border-muted"
                }`}
              >
                <div className="relative aspect-square overflow-hidden bg-blanc">
                  {emb.photos[0] ? (
                    <Image
                      src={emb.photos[0].url}
                      alt={emb.nom}
                      fill
                      sizes="25vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-3xl">🎁</div>
                  )}
                </div>
                <div className="p-2.5 text-left">
                  <p className="font-jost text-xs text-noir truncate">{emb.nom}</p>
                  <p className="font-playfair text-or text-sm">+{emb.prix.toLocaleString("fr-DZ")} DZD</p>
                </div>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Récapitulatif + bouton panier */}
      <section className="sticky bottom-16 md:bottom-0 bg-white border border-border shadow-lg p-4 md:p-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">

          {/* Récap composition */}
          <div className="flex-1 min-w-0">
            {hasItems ? (
              <>
                <p className="font-jost text-xs text-muted tracking-wider uppercase mb-1">
                  Votre bouquet
                </p>
                <p className="font-cormorant italic text-noir text-sm leading-relaxed truncate max-w-xs md:max-w-none">
                  {buildDetails() || "—"}
                </p>
              </>
            ) : (
              <p className="font-cormorant italic text-muted text-base">
                S&eacute;lectionnez au moins une fleur pour cr&eacute;er votre bouquet.
              </p>
            )}
          </div>

          {/* Prix + bouton */}
          <div className="flex items-center gap-4 shrink-0">
            <div className="text-right">
              <p className="font-jost text-[10px] text-muted uppercase tracking-wider">Total</p>
              <p className="font-playfair text-2xl text-noir">
                {total.toLocaleString("fr-DZ")}
                <span className="text-sm text-muted ml-1">DZD</span>
              </p>
            </div>
            <button
              onClick={handleAddToCart}
              disabled={!hasItems}
              className={`flex items-center gap-2 px-5 py-3 font-jost text-xs tracking-widest uppercase transition-all ${
                hasItems
                  ? "bg-noir text-white hover:bg-rouge"
                  : "bg-border text-muted cursor-not-allowed"
              }`}
            >
              <ShoppingCart size={14} />
              Ajouter au panier
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
