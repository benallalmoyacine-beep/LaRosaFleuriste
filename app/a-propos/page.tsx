import type { Metadata } from "next";
import { Heart, Users, Star } from "lucide-react";

export const metadata: Metadata = {
  title: "A Propos — La Rosa Fleuriste",
  description: "La Rosa Fleuriste, boutique florale familiale a Tlemcen, Algerie.",
};

const valeurs = [
  { icon: Heart, titre: "Passion", texte: "Chaque bouquet est créé avec amour et dévouement, reflétant notre passion pour l'art floral." },
  { icon: Users, titre: "Famille", texte: "Une boutique familiale où chaque client est accueilli comme un membre de notre famille." },
  { icon: Star, titre: "Qualité", texte: "Nous sélectionnons les plus belles fleurs fraîches pour vous offrir ce qu'il y a de meilleur." },
];

export default function AProposPage() {
  return (
    <div className="min-h-screen bg-blanc pt-20 md:pt-24 pb-8">

      {/* Header */}
      <section className="py-14 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="font-jost text-xs tracking-[0.3em] uppercase text-muted mb-3">
            Qui sommes-nous
          </p>
          <h1 className="font-playfair text-4xl md:text-6xl text-noir mb-4">Notre Histoire</h1>
          <div className="divider-or max-w-[160px] mx-auto" />
        </div>
      </section>

      {/* Story */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-12">
        <div className="border border-border bg-white p-8 md:p-12 relative shadow-sm">
          {/* Quote decoration */}
          <span className="absolute top-4 left-6 font-vibes text-6xl text-or/20 leading-none select-none">&ldquo;</span>

          <div className="relative z-10 text-center space-y-5">
            <p className="font-cormorant italic text-noir text-2xl md:text-3xl leading-relaxed">
              Fleuriste à Tlemcen — depuis toujours.
            </p>
            <p className="font-cormorant italic text-muted text-lg md:text-xl leading-relaxed">
              Une passion de famille · Fleurs, amour &amp; sourires.
            </p>
            <div className="divider-or max-w-[120px] mx-auto" />
            <p className="font-jost text-muted text-xs tracking-widest uppercase">
              Livraison disponible dans 69 wilayas
            </p>
          </div>

          <span className="absolute bottom-4 right-6 font-vibes text-6xl text-or/20 leading-none select-none rotate-180">&rdquo;</span>

          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-or/40" />
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-or/40" />
        </div>
      </section>

      {/* Values */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-10 md:py-16">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="font-playfair text-3xl md:text-4xl text-noir mb-4">Nos Valeurs</h2>
          <div className="divider-or max-w-[100px] mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {valeurs.map(({ icon: Icon, titre, texte }) => (
            <div key={titre} className="border border-border bg-white p-6 md:p-8 text-center group hover:border-or/40 transition-colors shadow-sm">
              <div className="w-11 h-11 border border-border flex items-center justify-center mx-auto mb-4 group-hover:border-or group-hover:bg-or/5 transition-colors">
                <Icon size={20} className="text-or" />
              </div>
              <h3 className="font-playfair text-noir text-lg md:text-xl mb-2">{titre}</h3>
              <p className="font-cormorant italic text-muted text-sm md:text-base leading-relaxed">{texte}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Signature */}
      <div className="text-center py-6">
        <p className="font-vibes text-4xl text-or/50">La Rosa</p>
      </div>
    </div>
  );
}
