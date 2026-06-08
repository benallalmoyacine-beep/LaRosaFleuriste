import { getProduits } from "@/lib/airtable";
import HeroSection from "@/components/home/HeroSection";
import VitrineDore from "@/components/home/VitrineDore";
import AvisSection from "@/components/home/AvisSection";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const produits = await getProduits().catch(() => []);

  const vitrineProds = produits
    .filter((p) => p.vitrine && p.actif)
    .sort((a, b) => a.vitrineOrdre - b.vitrineOrdre);

  return (
    <>
      <HeroSection />
      <VitrineDore produits={vitrineProds} />
      <AvisSection />
    </>
  );
}
