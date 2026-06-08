import { createCommande } from "@/lib/airtable";
import { NextRequest, NextResponse } from "next/server";
import type { CommandeInput } from "@/types/airtable";

export async function POST(req: NextRequest) {
  let body: CommandeInput & { wilayaNum: number };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { clientNom, telephone, wilaya, wilayaNum, modeLivraison, note, produits, sousTotal, fraisLivraison, total } =
    body;

  if (!clientNom || !telephone || !wilaya || !modeLivraison || !produits?.length) {
    return NextResponse.json({ error: "Champs manquants" }, { status: 400 });
  }

  try {
    await createCommande({ clientNom, telephone, wilaya, wilayaNum, modeLivraison, note, produits, sousTotal, fraisLivraison, total });
  } catch (err) {
    console.error("Airtable write error:", err);
    return NextResponse.json({ error: "Erreur enregistrement" }, { status: 500 });
  }

  // Build WhatsApp message
  const lignesProduits = produits
    .map((p) => {
      const ext = p as { details?: string; taille?: string; couleur?: string };
      const options = [ext.taille, ext.couleur].filter(Boolean).join(" · ");
      const ligne = `• ${p.nom} × ${p.qty} → ${(p.prix * p.qty).toLocaleString("fr-DZ")} DZD`;
      if (options) return `${ligne}\n  ↳ ${options}`;
      if (ext.details) return `${ligne}\n  ↳ ${ext.details}`;
      return ligne;
    })
    .join("\n");

  const message = `🌹 Nouvelle Commande — La Rosa Fleuriste

👤 Client : ${clientNom}
📞 Téléphone : ${telephone}
📍 Wilaya : ${wilayaNum} - ${wilaya}
🚚 Livraison : ${modeLivraison}

🛒 Commande :
${lignesProduits}

Sous-total : ${sousTotal.toLocaleString("fr-DZ")} DZD
Frais de livraison : ${fraisLivraison.toLocaleString("fr-DZ")} DZD
💰 Total : ${total.toLocaleString("fr-DZ")} DZD${note ? `\n\n📝 Note : ${note}` : ""}`;

  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "213791112663";
  const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;

  return NextResponse.json({ waUrl });
}
