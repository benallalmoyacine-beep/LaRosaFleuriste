"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import type { Produit } from "@/types/airtable";

interface Props {
  produits: Produit[];
}

const DISPO_COLORS: Record<string, string> = {
  "En stock": "text-vert bg-vert/10 border-vert/30",
  "Sur commande": "text-or bg-or/10 border-or/30",
  Rupture: "text-blanc/40 bg-blanc/5 border-blanc/10",
};

export default function VitrineDore({ produits }: Props) {
  const { addItem, setDrawerOpen } = useCart();

  if (produits.length === 0) return null;

  return (
    <section className="py-24 bg-noir relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-gradient-to-b from-rouge/5 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="font-cormorant italic text-or/60 text-base tracking-widest uppercase mb-2">
            Sélection exclusive
          </p>
          <h2 className="font-vibes text-6xl md:text-7xl text-or mb-4">
            Vitrine Dorée
          </h2>
          <div className="divider-or max-w-[200px] mx-auto mb-4" />
          <p className="font-cormorant italic text-blanc/50 text-lg">
            Nos créations vedettes, vues sur Instagram ✨
          </p>
        </motion.div>

        {/* Products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {produits.map((produit, i) => (
            <motion.div
              key={produit.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative"
            >
              {/* Gold border card */}
              <div className="relative border border-or/30 hover:border-or/70 transition-all duration-500 overflow-hidden bg-blanc/[0.02]">
                {/* Instagram badge */}
                <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 bg-noir/80 border border-or/40 text-or text-xs px-2.5 py-1 font-jost tracking-wider">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <circle cx="12" cy="12" r="4"/>
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                  </svg>
                  Vu sur Instagram
                </div>

                {/* Image */}
                <div className="relative aspect-[4/5] overflow-hidden">
                  {produit.photos[0] ? (
                    <Image
                      src={produit.photos[0].url}
                      alt={produit.nom}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-rose/20 to-rouge/10 flex items-center justify-center">
                      <span className="text-6xl">🌹</span>
                    </div>
                  )}
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-noir/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Info */}
                <div className="p-5">
                  <span
                    className={`inline-block text-xs border px-2 py-0.5 font-jost tracking-wider mb-3 ${
                      DISPO_COLORS[produit.disponibilite]
                    }`}
                  >
                    {produit.disponibilite}
                  </span>

                  <h3 className="font-playfair text-blanc text-xl mb-1 group-hover:text-or transition-colors">
                    {produit.nom}
                  </h3>

                  {produit.description && (
                    <p className="font-cormorant italic text-blanc/50 text-sm leading-relaxed mb-4 line-clamp-2">
                      {produit.description}
                    </p>
                  )}

                  <div className="flex items-center justify-between gap-3 mt-4">
                    <p className="font-playfair text-or text-2xl">
                      {produit.prix.toLocaleString("fr-DZ")} <span className="text-sm text-or/70">DZD</span>
                    </p>

                    <div className="flex gap-2">
                      <Link
                        href={`/catalogue/${produit.slug}`}
                        className="px-3 py-1.5 border border-or/40 text-or/70 hover:text-or hover:border-or text-xs font-jost tracking-wider transition-colors"
                      >
                        Voir
                      </Link>
                      {produit.disponibilite !== "Rupture" && (
                        <button
                          onClick={() => {
                            addItem({
                              id: produit.id,
                              nom: produit.nom,
                              prix: produit.prix,
                              photo: produit.photos[0]?.url,
                            });
                            setDrawerOpen(true);
                          }}
                          className="px-3 py-1.5 bg-rouge text-blanc text-xs font-jost tracking-wider hover:bg-rouge/80 transition-colors"
                        >
                          Ajouter
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Corner decoration */}
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-or/60" />
                <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-or/60" />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-14"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <Link
            href="/catalogue"
            className="inline-block border border-or text-or font-jost text-sm tracking-widest uppercase px-10 py-3 hover:bg-or hover:text-noir transition-all duration-300"
          >
            Voir tout le Catalogue
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
