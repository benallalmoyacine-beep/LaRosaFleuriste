import { getProduits, getCategories } from "@/lib/airtable";
import HomeClient from "@/components/home/HomeClient";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [produits, categories] = await Promise.all([
    getProduits().catch(() => []),
    getCategories().catch(() => []),
  ]);

  const vitrineProds = produits
    .filter((p) => p.vitrine && p.actif)
    .sort((a, b) => a.vitrineOrdre - b.vitrineOrdre);

  return (
    <div className="min-h-screen bg-blanc pt-14 md:pt-20">
      <HomeClient
        produits={produits}
        categories={categories}
        vitrineProds={vitrineProds}
      />
    </div>
  );
}
