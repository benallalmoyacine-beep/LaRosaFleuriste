"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import type { Produit } from "@/types/airtable";

interface Props {
  produit: Produit;
  onConfirm: (taille: string | undefined, couleur: string | undefined) => void;
  onClose: () => void;
}

export default function ProductOptionsModal({ produit, onConfirm, onClose }: Props) {
  const hasTailles = produit.tailles?.length > 0;
  const hasCouleurs = produit.couleurs?.length > 0;

  const [taille, setTaille] = useState<string | undefined>(
    hasTailles ? undefined : undefined
  );
  const [couleur, setCouleur] = useState<string | undefined>(
    hasCouleurs ? undefined : undefined
  );

  const canConfirm =
    (!hasTailles || taille !== undefined) &&
    (!hasCouleurs || couleur !== undefined);

  return (
    <AnimatePresence>
      <>
        <motion.div
          className="fixed inset-0 z-[80] bg-noir/30 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />
        <motion.div
          className="fixed inset-0 z-[90] flex items-end sm:items-center justify-center p-0 sm:p-4"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.22 }}
        >
          <div
            className="relative w-full sm:max-w-sm bg-white border border-border shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <div>
                <p className="font-jost text-[10px] tracking-widest uppercase text-muted">Options</p>
                <h3 className="font-playfair text-base text-noir leading-tight">{produit.nom}</h3>
              </div>
              <button onClick={onClose} className="p-1 text-muted hover:text-noir transition-colors">
                <X size={16} />
              </button>
            </div>

            <div className="px-5 py-5 space-y-5">
              {/* Tailles */}
              {hasTailles && (
                <div>
                  <p className="font-jost text-[10px] tracking-widest uppercase text-muted mb-2.5">
                    Taille
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {produit.tailles.map((t) => (
                      <button
                        key={t}
                        onClick={() => setTaille(t)}
                        className={`px-3 py-1.5 font-jost text-xs border transition-all ${
                          taille === t
                            ? "border-noir bg-noir text-white"
                            : "border-border text-noir hover:border-noir"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Couleurs */}
              {hasCouleurs && (
                <div>
                  <p className="font-jost text-[10px] tracking-widest uppercase text-muted mb-2.5">
                    Couleur
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {produit.couleurs.map((c) => (
                      <button
                        key={c}
                        onClick={() => setCouleur(c)}
                        className={`px-3 py-1.5 font-jost text-xs border transition-all ${
                          couleur === c
                            ? "border-noir bg-noir text-white"
                            : "border-border text-noir hover:border-noir"
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <button
                disabled={!canConfirm}
                onClick={() => onConfirm(taille, couleur)}
                className={`w-full py-3 font-jost text-xs tracking-widest uppercase transition-all ${
                  canConfirm
                    ? "bg-noir text-white hover:bg-rouge"
                    : "bg-border text-muted cursor-not-allowed opacity-60"
                }`}
              >
                {canConfirm ? "Ajouter au panier" : "Choisir les options"}
              </button>
            </div>
          </div>
        </motion.div>
      </>
    </AnimatePresence>
  );
}
