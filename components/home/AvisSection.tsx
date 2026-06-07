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
        <Star key={i} size={14} className={i <= n ? "text-or fill-or" : "text-or/20"} />
      ))}
    </div>
  );
}

export default function AvisSection() {
  return (
    <section className="py-24 bg-noir">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-cormorant italic text-or/60 text-base tracking-widest uppercase mb-2">
            Ce que disent nos clients
          </p>
          <h2 className="font-playfair text-5xl text-blanc mb-4">Avis</h2>
          <div className="divider-or max-w-[120px] mx-auto mb-8" />

          {/* Google rating */}
          <div className="inline-flex flex-col items-center gap-2 border border-or/30 px-8 py-5 bg-or/5">
            <Stars n={5} />
            <p className="font-playfair text-4xl text-or">4.6 / 5</p>
            <p className="font-jost text-xs text-blanc/40 tracking-widest uppercase">24 avis Google</p>
            <a
              href="https://www.google.com/maps/search/La+Rosa+fleuriste+Tlemcen"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 font-jost text-xs text-or/60 hover:text-or transition-colors mt-1"
            >
              Voir sur Google <ExternalLink size={11} />
            </a>
          </div>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {AVIS.map((avis, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="border border-or/15 p-5 bg-blanc/[0.02] hover:border-or/30 transition-colors"
            >
              <Stars n={avis.note} />
              <p className="font-cormorant italic text-blanc/60 text-sm leading-relaxed my-3">
                &ldquo;{avis.texte}&rdquo;
              </p>
              <p className="font-playfair text-or text-sm">— {avis.nom}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
