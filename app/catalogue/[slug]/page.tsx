export const runtime = "edge";
export const dynamic = "force-dynamic";

import { getProduitBySlug } from "@/lib/airtable";
import ProductDetail from "@/components/catalogue/ProductDetail";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const produit = await getProduitBySlug(slug).catch(() => null);
  if (!produit) return { title: "Produit introuvable — La Rosa Fleuriste" };
  return {
    title: `${produit.nom} — La Rosa Fleuriste`,
    description: produit.description || `Découvrez ${produit.nom} chez La Rosa Fleuriste à Tlemcen.`,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const produit = await getProduitBySlug(slug).catch(() => null);
  if (!produit) notFound();
  return <ProductDetail produit={produit} />;
}
