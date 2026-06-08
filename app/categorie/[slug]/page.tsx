import { getProduits, getCategories } from "@/lib/airtable";
import ProductCard from "@/components/catalogue/ProductCard";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const categories = await getCategories().catch(() => []);
  const cat = categories.find((c) => c.slug === slug);
  if (!cat) return { title: "Catégorie introuvable — La Rosa Fleuriste" };
  return {
    title: `${cat.nom} — La Rosa Fleuriste`,
    description: `Découvrez notre collection ${cat.nom} chez La Rosa Fleuriste à Tlemcen.`,
  };
}

export default async function CategoriePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [produits, categories] = await Promise.all([
    getProduits().catch(() => []),
    getCategories().catch(() => []),
  ]);

  const cat = categories.find((c) => c.slug === slug);
  if (!cat) notFound();

  const filtered = produits.filter((p) => p.categorie.includes(cat.id));

  return (
    <div className="min-h-screen bg-blanc pt-14 md:pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10">

        {/* Header */}
        <div className="flex items-center gap-3 mb-6 sm:mb-10 border-b border-border pb-4">
          <Link
            href="/"
            className="flex items-center gap-1 text-muted hover:text-noir font-jost text-xs tracking-wider uppercase transition-colors shrink-0"
          >
            <ChevronLeft size={14} />
            Accueil
          </Link>
          <div className="h-4 w-px bg-border" />
          <h1 className="font-playfair text-xl sm:text-3xl text-noir truncate">{cat.nom}</h1>
          <span className="font-jost text-[10px] text-muted ml-auto shrink-0">
            {filtered.length} article{filtered.length > 1 ? "s" : ""}
          </span>
        </div>

        {/* Grille */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
            {filtered.map((p) => (
              <ProductCard key={p.id} produit={p} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="font-cormorant italic text-muted text-xl">
              Aucun produit dans cette catégorie pour le moment.
            </p>
            <Link
              href="/"
              className="inline-block mt-6 border border-noir text-noir font-jost text-xs tracking-widest uppercase px-6 py-2 hover:bg-noir hover:text-white transition-all"
            >
              Retour à l&apos;accueil
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}
