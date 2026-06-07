"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import type { Produit } from "@/types/airtable";

interface Props {
  produits: Produit[];
}

const DISPO: Record<string, { label: string; cls: string }> = {
  "En stock": { label: "En stock", cls: "text-vert bg-vert/10" },
  "Sur commande": { label: "Sur commande", cls: "text-or bg-or/10" },
  Rupture: { label: "Rupture", cls: "text-muted bg-border" },
};

export default function VitrineDore({ produits }: Props) {
  const { addItem, setDrawerOpen } = useCart();

  if (produits.length === 0) return null;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-jost text-xs tracking-[0.3em] uppercase text-muted mb-3">
            Sélection exclusive
          </p>
          <h2 className="font-playfair text-4xl md:text-5xl text-noir mb-3">
            Vitrine Dorée
          </h2>
          <div className="divider-or max-w-[120px] mx-auto mb-3" />
          <p className="font-cormorant italic text-muted text-lg">
            Nos créations vedettes — vues sur Instagram
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {produits.map((produit, i) => {
            const dispo = DISPO[produit.disponibilite] ?? DISPO["En stock"];
            const rupture = produit.disponibilite === "Rupture";
            return (
              <motion.article
                key={produit.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group bg-blanc border border-border hover:border-or/40 transition-all duration-300"
              >
                {/* Instagram badge */}
                <div className="relative overflow-hidden aspect-[4/5]">
                  <span className="absolute top-3 left-3 z-10 bg-white text-noir text-xs px-2.5 py-1 font-jost tracking-wider border border-border flex items-center gap-1">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="2" width="20" height="20" rx="5"/>
                      <circle cx="12" cy="12" r="4"/>
                      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                    </svg>
                    Instagram
                  </span>

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
                </div>

                {/* Info */}
                <div className="p-5">
                  <span className={`inline-block text-xs px-2 py-0.5 font-jost tracking-wider mb-2 ${dispo.cls}`}>
                    {dispo.label}
                  </span>
                  <h3 className="font-playfair text-noir text-xl mb-1 group-hover:text-rouge transition-colors">
                    {produit.nom}
                  </h3>
                  {produit.description && (
                    <p className="font-cormorant italic text-muted text-sm leading-relaxed line-clamp-2 mb-4">
                      {produit.description}
                    </p>
                  )}
                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <p className="font-playfair text-noir text-xl">
                      {produit.prix.toLocaleString("fr-DZ")} <span className="text-sm text-muted">DZD</span>
                    </p>
                    <div className="flex gap-2">
                      <Link
                        href={`/catalogue/${produit.slug}`}
                        className="px-3 py-1.5 border border-border text-muted text-xs font-jost tracking-wider hover:border-noir hover:text-noir transition-colors"
                      >
                        Voir
                      </Link>
                      {!rupture && (
                        <button
                          onClick={() => {
                            addItem({ id: produit.id, nom: produit.nom, prix: produit.prix, photo: produit.photos[0]?.url });
                            setDrawerOpen(true);
                          }}
                          className="px-3 py-1.5 bg-noir text-white text-xs font-jost tracking-wider hover:bg-rouge transition-colors"
                        >
                          Ajouter
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Link
            href="/catalogue"
            className="inline-block border border-noir text-noir font-jost text-xs tracking-widest uppercase px-10 py-3 hover:bg-noir hover:text-white transition-all duration-300"
          >
            Voir tout le Catalogue
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
