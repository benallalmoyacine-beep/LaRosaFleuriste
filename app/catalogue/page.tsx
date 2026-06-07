import { getProduits, getCategories } from "@/lib/airtable";
import CatalogueClient from "@/components/catalogue/CatalogueClient";

export const dynamic = "force-dynamic";

export default async function CataloguePage() {
  const [produits, categories] = await Promise.all([
    getProduits().catch(() => []),
    getCategories().catch(() => []),
  ]);

  return (
    <div className="min-h-screen bg-noir pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-cormorant italic text-or/60 text-base tracking-widest uppercase mb-2">
            Notre collection
          </p>
          <h1 className="font-playfair text-5xl md:text-6xl text-blanc mb-4">
            Catalogue
          </h1>
          <div className="divider-or max-w-[160px] mx-auto" />
        </div>

        <CatalogueClient produits={produits} categories={categories} />
      </div>
    </div>
  );
}
