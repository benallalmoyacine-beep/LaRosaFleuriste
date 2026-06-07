import type { Metadata } from "next";
import { Heart, Users, Star } from "lucide-react";

export const metadata: Metadata = {
  title: "À Propos — La Rosa Fleuriste",
  description: "L'histoire de La Rosa Fleuriste, boutique florale familiale à Tlemcen, Algérie.",
};

const valeurs = [
  { icon: Heart, titre: "Passion", texte: "Chaque bouquet est créé avec amour et dévouement, reflétant notre passion pour l'art floral." },
  { icon: Users, titre: "Famille", texte: "Une boutique familiale où chaque client est accueilli comme un membre de notre famille." },
  { icon: Star, titre: "Qualité", texte: "Nous sélectionnons les plus belles fleurs fraîches pour vous offrir ce qu'il y a de meilleur." },
];

export default function AProposPage() {
  return (
    <div className="min-h-screen bg-noir pt-24 pb-20">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-rouge/10 to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <p className="font-cormorant italic text-or/60 text-base tracking-widest uppercase mb-3">
            Qui sommes-nous
          </p>
          <h1 className="font-vibes text-7xl md:text-8xl text-or mb-4">Notre Histoire</h1>
          <div className="divider-or max-w-[200px] mx-auto" />
        </div>
      </section>

      {/* Story */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <div className="border border-or/20 p-8 md:p-12 bg-blanc/[0.02] relative">
          {/* Quote decoration */}
          <span className="absolute top-6 left-8 font-vibes text-6xl text-or/20 leading-none select-none">"</span>
          <p className="font-cormorant italic text-blanc/70 text-xl md:text-2xl leading-relaxed text-center relative z-10">
            La Rosa Fleuriste, c&apos;est une passion de famille ancrée au cœur de Tlemcen. Depuis nos débuts,
            nous mettons toute notre âme dans chaque bouquet, chaque arrangement, chaque sourire que nos fleurs
            apportent. Fleurs d&apos;amour, de célébration, de condoléances — nous sommes là pour chaque moment
            de votre vie.
          </p>
          <span className="absolute bottom-4 right-8 font-vibes text-6xl text-or/20 leading-none select-none rotate-180">"</span>

          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-or/50" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-or/50" />
        </div>
      </section>

      {/* Values */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl text-blanc">Nos Valeurs</h2>
          <div className="divider-or max-w-[120px] mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {valeurs.map(({ icon: Icon, titre, texte }) => (
            <div key={titre} className="border border-or/20 p-8 bg-blanc/[0.02] text-center group hover:border-or/40 transition-colors">
              <div className="w-12 h-12 border border-or/40 flex items-center justify-center mx-auto mb-5 group-hover:bg-or/10 transition-colors">
                <Icon size={22} className="text-or" />
              </div>
              <h3 className="font-playfair text-or text-xl mb-3">{titre}</h3>
              <p className="font-cormorant italic text-blanc/50 text-base leading-relaxed">{texte}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Decorative rose */}
      <div className="text-center py-8">
        <p className="font-vibes text-5xl text-or/30">La Rosa</p>
      </div>
    </div>
  );
}
