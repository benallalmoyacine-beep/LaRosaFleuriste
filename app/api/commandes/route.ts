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

  let recordId: string;
  try {
    recordId = await createCommande({ clientNom, telephone, wilaya, wilayaNum, modeLivraison, note, produits, sousTotal, fraisLivraison, total });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("Airtable write error:", msg);
    return NextResponse.json({ error: "Erreur enregistrement", detail: msg }, { status: 500 });
  }

  // Référence courte lisible (6 derniers chars de l'ID Airtable)
  const ref = recordId.slice(-6).toUpperCase();

  // Message court — les détails réels sont dans Airtable, pas dans ce message
  // Le client ne peut rien manipuler d'utile : la commande est déjà enregistrée
  const message = `🌹 Nouvelle commande — La Rosa Fleuriste
Réf. #${ref}

👤 ${clientNom}
📞 ${telephone}
📍 ${wilayaNum} - ${wilaya} (${modeLivraison})
💰 Total : ${total.toLocaleString("fr-DZ")} DZD${note ? `\n📝 ${note}` : ""}

✅ Commande enregistrée — voir Airtable pour le détail complet.`;

  const encoded = encodeURIComponent(message);
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "213791112663";
  const waUrl = `https://wa.me/${number}?text=${encoded}`;

  return NextResponse.json({ waUrl, ref });
}
