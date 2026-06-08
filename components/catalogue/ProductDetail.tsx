"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, ChevronLeft, Minus, Plus } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import type { Produit } from "@/types/airtable";
import ProductOptionsModal from "./ProductOptionsModal";

const DISPO: Record<string, { label: string; cls: string }> = {
  "En stock": { label: "En stock", cls: "text-vert" },
  "Sur commande": { label: "Sur commande", cls: "text-or" },
  Rupture: { label: "Rupture de stock", cls: "text-muted" },
};

export default function ProductDetail({ produit }: { produit: Produit }) {
  const [mainPhoto, setMainPhoto] = useState(0);
  const [qty, setQty] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const { addItem } = useCart();
  const { showToast } = useToast();
  const dispo = DISPO[produit.disponibilite] ?? DISPO["En stock"];
  const rupture = produit.disponibilite === "Rupture";

  const hasOptions = (produit.tailles?.length > 0) || (produit.couleurs?.length > 0);
  const prixActuel = produit.prixPromo ?? produit.prix;
  const aPromo = !!produit.prixPromo && produit.prixPromo < produit.prix;
  const remise = aPromo ? Math.round((1 - produit.prixPromo! / produit.prix) * 100) : 0;

  const handleAdd = () => {
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
      <div className="min-h-screen bg-blanc pt-24 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/catalogue" className="inline-flex items-center gap-1.5 text-muted hover:text-noir font-jost text-xs tracking-wider uppercase mb-10 transition-colors">
            <ChevronLeft size={14} />
            Retour au catalogue
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Gallery */}
            <div>
              <div className="relative aspect-square overflow-hidden border border-border bg-blanc mb-3">
                <AnimatePresence mode="wait">
                  <motion.div key={mainPhoto} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="absolute inset-0">
                    {produit.photos[mainPhoto] ? (
                      <Image src={produit.photos[mainPhoto].url} alt={produit.nom} fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-rose/20 to-border flex items-center justify-center">
                        <span className="text-8xl">🌹</span>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {produit.photos.length > 1 && (
                <div className="flex gap-2 flex-wrap">
                  {produit.photos.map((ph, i) => (
                    <button key={ph.id} onClick={() => setMainPhoto(i)}
                      className={`relative w-16 h-16 border overflow-hidden transition-all ${i === mainPhoto ? "border-noir" : "border-border hover:border-muted"}`}>
                      <Image src={ph.url} alt={`${produit.nom} — photo ${i + 1}`} fill className="object-cover" sizes="64px" />
                    </button>
                  ))}
                  <p className="w-full font-jost text-xs text-muted mt-1">{mainPhoto + 1} / {produit.photos.length}</p>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="lg:sticky lg:top-28">
              <p className={`font-jost text-xs tracking-widest uppercase mb-3 ${dispo.cls}`}>{dispo.label}</p>
              <h1 className="font-playfair text-4xl md:text-5xl text-noir mb-4 leading-tight">{produit.nom}</h1>
              <div className="divider-or max-w-[80px] mb-6" />
              <div className="flex flex-wrap items-baseline gap-3 mb-4">
                {aPromo ? (
                  <>
                    <span className="bg-rouge text-white font-jost text-xs px-2 py-0.5 rounded-sm">-{remise}%</span>
                    <span className="font-playfair text-3xl text-rouge">
                      {produit.prixPromo!.toLocaleString("fr-DZ")} <span className="text-lg">DZD</span>
                    </span>
                    <span className="font-jost text-muted text-lg line-through">
                      {produit.prix.toLocaleString("fr-DZ")} DZD
                    </span>
                  </>
                ) : (
                  <span className="font-playfair text-3xl text-noir">
                    {produit.prix.toLocaleString("fr-DZ")} <span className="text-lg text-muted">DZD</span>
                  </span>
                )}
              </div>
              {produit.nouveau && (
                <span className="inline-block bg-vert text-white font-jost text-xs px-2 py-0.5 rounded-sm mb-4">
                  NOUVEAU
                </span>
              )}
              {produit.description && (
                <p className="font-cormorant italic text-muted text-lg leading-relaxed mb-6">{produit.description}</p>
              )}

              {/* Tailles disponibles */}
              {produit.tailles?.length > 0 && (
                <div className="mb-4">
                  <p className="font-jost text-[10px] tracking-widest uppercase text-muted mb-2">Tailles disponibles</p>
                  <div className="flex flex-wrap gap-2">
                    {produit.tailles.map((t) => (
                      <span key={t} className="font-jost text-xs px-3 py-1 border border-border text-noir">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Couleurs disponibles */}
              {produit.couleurs?.length > 0 && (
                <div className="mb-6">
                  <p className="font-jost text-[10px] tracking-widest uppercase text-muted mb-2">Couleurs disponibles</p>
                  <div className="flex flex-wrap gap-2">
                    {produit.couleurs.map((c) => (
                      <span key={c} className="font-jost text-xs px-3 py-1 border border-border text-noir">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {!rupture && (
                <div className="flex items-center gap-4 mb-6">
                  <span className="font-jost text-xs text-muted tracking-wider uppercase">Quantité</span>
                  <div className="flex items-center border border-border">
                    <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-3 py-2 text-muted hover:text-noir transition-colors"><Minus size={13} /></button>
                    <span className="px-4 py-2 font-jost text-noir min-w-[2.5rem] text-center">{qty}</span>
                    <button onClick={() => setQty((q) => q + 1)} className="px-3 py-2 text-muted hover:text-noir transition-colors"><Plus size={13} /></button>
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3">
                <button disabled={rupture} onClick={handleAdd}
                  className={`flex items-center justify-center gap-2 flex-1 py-3 font-jost text-xs tracking-widest uppercase transition-all ${
                    rupture ? "opacity-30 cursor-not-allowed bg-border text-muted" : "bg-noir text-white hover:bg-rouge"
                  }`}>
                  <ShoppingCart size={14} />
                  {rupture ? "Indisponible" : "Ajouter au panier"}
                </button>
                <a
                  href={`https://wa.me/213791112663?text=${encodeURIComponent(`Bonjour La Rosa 🌹, je suis intéressé(e) par : ${produit.nom} (${produit.prix} DZD)`)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 flex-1 py-3 border border-noir text-noir font-jost text-xs tracking-widest uppercase hover:bg-noir hover:text-white transition-all">
                  Commander directement
                </a>
              </div>
            </div>
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
