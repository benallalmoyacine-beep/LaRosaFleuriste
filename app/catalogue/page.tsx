import { getProduits, getCategories } from "@/lib/airtable";
import CatalogueClient from "@/components/catalogue/CatalogueClient";
import VitrineDore from "@/components/home/VitrineDore";

export const dynamic = "force-dynamic";

export default async function CataloguePage() {
  const [produits, categories] = await Promise.all([
    getProduits().catch(() => []),
    getCategories().catch(() => []),
  ]);

  const vitrineProds = produits
    .filter((p) => p.vitrine && p.actif)
    .sort((a, b) => a.vitrineOrdre - b.vitrineOrdre);

  return (
    <div className="min-h-screen bg-blanc pt-14 md:pt-20">

      {/* Vitrine Dorée en haut du catalogue */}
      {vitrineProds.length > 0 && <VitrineDore produits={vitrineProds} />}

      {/* Grille catalogue */}
      <div className="pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 md:pt-16">
          <div className="text-center mb-10 md:mb-14">
            <p className="font-jost text-xs tracking-[0.3em] uppercase text-muted mb-3">
              Notre collection
            </p>
            <h1 className="font-playfair text-4xl md:text-6xl text-noir mb-4">Catalogue</h1>
            <div className="divider-or max-w-[100px] mx-auto" />
          </div>
          <CatalogueClient produits={produits} categories={categories} />
        </div>
      </div>
    </div>
  );
}
