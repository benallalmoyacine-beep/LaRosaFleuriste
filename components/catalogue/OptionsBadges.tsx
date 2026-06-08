"use client";

import type { Produit } from "@/types/airtable";

// Correspondance nom français → couleur CSS (partagée avec ProductOptionsModal)
export const COLOR_MAP: Record<string, string> = {
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

const LIGHT_COLORS = new Set([
  "blanc", "blanche", "ivoire", "crème", "creme", "beige", "jaune",
  "rose pâle", "rose pale", "lavande", "lilas", "gris perle",
  "bleu ciel", "vert tendre", "argent", "or", "doré", "dore", "saumon",
]);

export function getCouleurCSS(nom: string) {
  const key = nom.toLowerCase().trim();
  return {
    bg: COLOR_MAP[key] ?? null,
    isLight: LIGHT_COLORS.has(key),
  };
}

interface Props {
  produit: Produit;
  /** Taille des badges : "sm" pour les cartes, "md" pour la page détail */
  size?: "sm" | "md";
}

export default function OptionsBadges({ produit, size = "sm" }: Props) {
  const hasTailles = produit.tailles?.length > 0;
  const hasCouleurs = produit.couleurs?.length > 0;
  if (!hasTailles && !hasCouleurs) return null;

  const textCls = size === "sm" ? "text-[9px]" : "text-[10px]";
  const dotSize = size === "sm" ? "w-2.5 h-2.5" : "w-3 h-3";
  const chipCls = size === "sm"
    ? "px-1.5 py-0.5 font-jost text-[9px] border border-border text-muted"
    : "px-2 py-0.5 font-jost text-[10px] border border-border text-muted";

  return (
    <div className="flex flex-col gap-1 mt-1.5">
      {/* Tailles */}
      {hasTailles && (
        <div className="flex flex-wrap gap-1">
          {produit.tailles.map((t) => (
            <span key={t} className={chipCls}>{t}</span>
          ))}
        </div>
      )}

      {/* Couleurs avec pastilles */}
      {hasCouleurs && (
        <div className="flex flex-wrap gap-1 items-center">
          {produit.couleurs.map((c) => {
            const { bg, isLight } = getCouleurCSS(c);
            return (
              <span
                key={c}
                className={`inline-flex items-center gap-1 ${chipCls}`}
                title={c}
              >
                {bg && (
                  <span
                    className={`inline-block ${dotSize} rounded-full shrink-0`}
                    style={{
                      background: bg,
                      border: isLight ? "1px solid #d1d5db" : "none",
                    }}
                  />
                )}
                <span className={textCls}>{c}</span>
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}
