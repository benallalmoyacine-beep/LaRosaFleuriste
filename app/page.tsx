import { getProduits, getConfig } from "@/lib/airtable";
import HeroSection from "@/components/home/HeroSection";
import VitrineDore from "@/components/home/VitrineDore";
import AvisSection from "@/components/home/AvisSection";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [produits, config] = await Promise.all([
    getProduits().catch(() => []),
    getConfig().catch(() => ({
      slogan: "Une passion de famille • Fleurs, amour & sourires",
      telephoneWhatsApp: "213791112663",
      lienInstagram: "https://www.instagram.com/la_rosa_fleuriste_tlemcen/",
      lienFacebook: "https://www.facebook.com/profile.php?id=100091832552880",
      lienTikTok: "https://www.tiktok.com/@lavieestbelle6581",
      lienGoogleMaps: "https://maps.google.com/?q=La+Rosa+fleuriste+Tlemcen",
      adresse: "Tlemcen, Algérie",
      horaires: "Lun–Sam 8h–20h · Dim 9h–18h",
      noteGoogle: 4.6,
      nbAvis: 24,
    })),
  ]);

  const vitrineProds = produits
    .filter((p) => p.vitrine && p.actif)
    .sort((a, b) => a.vitrineOrdre - b.vitrineOrdre);

  return (
    <>
      <HeroSection slogan={config.slogan} />
      <VitrineDore produits={vitrineProds} />
      <AvisSection />
    </>
  );
}
