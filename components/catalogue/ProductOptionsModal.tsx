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

// Correspondance nom français → couleur CSS
const COLOR_MAP: Record<string, string> = {
  blanc: "#ffffff",
  blanche: "#ffffff",
  ivoire: "#fffff0",
  crème: "#fffdd0",
  creme: "#fffdd0",
  beige: "#f5f0e8",
  jaune: "#f5c518",
  or: "#c9a84c",
  doré: "#c9a84c",
  dore: "#c9a84c",
  orange: "#e8702a",
  saumon: "#fa8072",
  corail: "#ff6b6b",
  rose: "#f4a0b5",
  "rose pâle": "#fce4ec",
  "rose pale": "#fce4ec",
  "rose foncé": "#e91e8c",
  "rose fonce": "#e91e8c",
  fuchsia: "#ff00aa",
  rouge: "#c0392b",
  bordeaux: "#7b1a2a",
  violet: "#7c3aed",
  mauve: "#c084fc",
  lilas: "#d8b4fe",
  lavande: "#e6e0f8",
  bleu: "#3b82f6",
  "bleu ciel": "#87ceeb",
  "bleu marine": "#1a2e5a",
  turquoise: "#06b6d4",
  vert: "#22c55e",
  "vert tendre": "#a7f3a0",
  "vert foncé": "#15803d",
  "vert fonce": "#15803d",
  olive: "#8f9e2a",
  kaki: "#8b8645",
  brun: "#92400e",
  marron: "#7c3d12",
  chocolat: "#4a2512",
  noir: "#1a1a1a",
  gris: "#9ca3af",
  "gris perle": "#e5e7eb",
  argent: "#c0c0c0",
  multicolore: "linear-gradient(135deg, #f43f5e, #f97316, #eab308, #22c55e, #3b82f6, #8b5cf6)",
};

function getCouleurStyle(nom: string): { bg: string; text: string; border: string; isLight: boolean } {
  const key = nom.toLowerCase().trim();
  const css = COLOR_MAP[key] ?? null;

  if (!css) return { bg: "transparent", text: "#1a1a1a", border: "#d1d5db", isLight: true };

  // Déterminer si la couleur est claire pour choisir la couleur du texte
  const lightColors = ["blanc", "blanche", "ivoire", "crème", "creme", "beige", "jaune",
    "rose pâle", "rose pale", "lavande", "lilas", "gris perle", "bleu ciel",
    "vert tendre", "argent", "or", "doré", "dore", "ivoire", "saumon"];
  const isLight = lightColors.includes(key) || (css === "#ffffff");

  return {
    bg: css,
    text: isLight ? "#1a1a1a" : "#ffffff",
    border: isLight ? "#9ca3af" : css,
    isLight,
  };
}

export default function ProductOptionsModal({ produit, onConfirm, onClose }: Props) {
  const hasTailles = produit.tailles?.length > 0;
  const hasCouleurs = produit.couleurs?.length > 0;

  const [taille, setTaille] = useState<string | undefined>(undefined);
  const [couleur, setCouleur] = useState<string | undefined>(undefined);

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
              {/* Tailles — empilées en haut */}
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

              {/* Couleurs — en dessous, avec vraie couleur */}
              {hasCouleurs && (
                <div>
                  <p className="font-jost text-[10px] tracking-widest uppercase text-muted mb-2.5">
                    Couleur
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {produit.couleurs.map((c) => {
                      const { bg, text, border, isLight } = getCouleurStyle(c);
                      const selected = couleur === c;
                      return (
                        <button
                          key={c}
                          onClick={() => setCouleur(c)}
                          className="flex items-center gap-1.5 px-3 py-1.5 font-jost text-xs border transition-all"
                          style={{
                            borderColor: selected ? "#1a1a1a" : border,
                            boxShadow: selected ? "inset 0 0 0 1px #1a1a1a" : undefined,
                            background: "white",
                            color: "#1a1a1a",
                            outline: selected ? "2px solid #1a1a1a" : undefined,
                            outlineOffset: selected ? "1px" : undefined,
                          }}
                        >
                          {/* Pastille couleur */}
                          <span
                            className="inline-block w-3.5 h-3.5 rounded-full border shrink-0"
                            style={{
                              background: bg,
                              borderColor: isLight ? "#d1d5db" : "transparent",
                            }}
                          />
                          <span style={{ color: "#1a1a1a" }}>{c}</span>
                        </button>
                      );
                    })}
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
