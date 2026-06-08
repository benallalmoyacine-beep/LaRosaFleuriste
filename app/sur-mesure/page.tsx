import { getFleurs, getEmballages } from "@/lib/airtable";
import BouquetBuilder from "@/components/sur-mesure/BouquetBuilder";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bouquet Sur Mesure — La Rosa Fleuriste",
  description: "Composez votre bouquet personnalisé fleur par fleur.",
};

export const dynamic = "force-dynamic";

export default async function SurMesurePage() {
  const [fleurs, emballages] = await Promise.all([
    getFleurs().catch(() => []),
    getEmballages().catch(() => []),
  ]);

  return (
    <div className="min-h-screen bg-blanc pt-14 md:pt-20 pb-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 md:pt-14">

        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <p className="font-jost text-xs tracking-[0.3em] uppercase text-muted mb-3">
            Cr&eacute;ation personnalis&eacute;e
          </p>
          <h1 className="font-playfair text-4xl md:text-6xl text-noir mb-4">
            Votre Bouquet Sur Mesure
          </h1>
          <div className="divider-or max-w-[160px] mx-auto mb-4" />
          <p className="font-cormorant italic text-muted text-lg max-w-lg mx-auto">
            Choisissez vos fleurs, ajustez les quantit&eacute;s et composez le bouquet de vos r&ecirc;ves.
          </p>
        </div>

        <BouquetBuilder fleurs={fleurs} emballages={emballages} />
      </div>
    </div>
  );
}
