import { getProduits, getCategories } from "@/lib/airtable";
import CatalogueClient from "@/components/catalogue/CatalogueClient";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [produits, categories] = await Promise.all([
    getProduits().catch(() => []),
    getCategories().catch(() => []),
  ]);

  return (
    <div className="min-h-screen bg-blanc pt-14 md:pt-20">
      <CatalogueClient produits={produits} categories={categories} />
    </div>
  );
}
