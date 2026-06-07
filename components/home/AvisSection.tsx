"use client";

import { motion } from "framer-motion";
import { Star, ExternalLink } from "lucide-react";

const AVIS = [
  { nom: "Karima B.", note: 5, texte: "Des fleurs magnifiques, fraîches et bien emballées. La livraison était rapide. Je recommande vivement !" },
  { nom: "Mohamed A.", note: 5, texte: "Service exceptionnel, bouquets superbes. La Rosa est ma boutique de référence à Tlemcen." },
  { nom: "Fatima Z.", note: 5, texte: "Commande pour un mariage, tout était parfait. Les arrangements floraux étaient féeriques." },
  { nom: "Youcef K.", note: 4, texte: "Très belle boutique, fleurs de qualité. Le personnel est accueillant et professionnel." },
];

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} size={13} className={i <= n ? "text-or fill-or" : "text-border"} />
      ))}
    </div>
  );
}

export default function AvisSection() {
  return (
    <section className="py-20 bg-blanc">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-jost text-xs tracking-[0.3em] uppercase text-muted mb-3">
            Ce que disent nos clients
          </p>
          <h2 className="font-playfair text-4xl text-noir mb-4">Avis</h2>
          <div className="divider-or max-w-[80px] mx-auto mb-8" />

          {/* Rating */}
          <div className="inline-flex flex-col items-center gap-2 border border-border px-8 py-5 bg-white">
            <Stars n={5} />
            <p className="font-playfair text-4xl text-noir">4.6 / 5</p>
            <p className="font-jost text-xs text-muted tracking-wider uppercase">24 avis Google</p>
            <a
              href="https://www.google.com/maps/search/La+Rosa+fleuriste+Tlemcen"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Voir les avis sur Google (nouvelle fenêtre)"
              className="flex items-center gap-1 font-jost text-xs text-muted hover:text-noir transition-colors mt-1"
            >
              Voir sur Google <ExternalLink size={10} />
            </a>
          </div>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {AVIS.map((avis, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-white border border-border p-5 hover:border-or/40 transition-colors"
            >
              <Stars n={avis.note} />
              <p className="font-cormorant italic text-muted text-sm leading-relaxed my-3">
                &ldquo;{avis.texte}&rdquo;
              </p>
              <p className="font-playfair text-noir text-sm">— {avis.nom}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
