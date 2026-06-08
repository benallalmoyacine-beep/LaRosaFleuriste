import type { Produit, Categorie, Livraison, Config, CommandeInput } from "@/types/airtable";

const TOKEN = process.env.AIRTABLE_TOKEN!;
const BASE = process.env.AIRTABLE_BASE_ID || "appYbWQmjMVB7riZT";
const API = "https://api.airtable.com/v0";

const T_PRODUITS = process.env.AIRTABLE_T_PRODUITS || "Produits";
const T_CATEGORIES = process.env.AIRTABLE_T_CATEGORIES || "Categories";
const T_LIVRAISON = process.env.AIRTABLE_T_LIVRAISON || "Livraison";
const T_CONFIG = process.env.AIRTABLE_T_CONFIG || "Config";
const T_COMMANDES = process.env.AIRTABLE_T_COMMANDES || "Commandes";

function headers() {
  return { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" };
}

function slugify(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

async function fetchAll(table: string, params?: string): Promise<Record<string, unknown>[]> {
  const records: Record<string, unknown>[] = [];
  let offset: string | undefined;

  do {
    const url = new URL(`${API}/${BASE}/${encodeURIComponent(table)}`);
    if (params) url.search = params;
    if (offset) url.searchParams.set("offset", offset);

    const res = await fetch(url.toString(), {
      headers: headers(),
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Airtable error [${table}]: ${err}`);
    }

    const data = (await res.json()) as { records: { id: string; fields: Record<string, unknown> }[]; offset?: string };
    records.push(...data.records.map((r) => ({ id: r.id, ...r.fields })));
    offset = data.offset;
  } while (offset);

  return records;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function field<T>(obj: Record<string, unknown>, key: string, fallback: T): T {
  return (key in obj ? obj[key] : fallback) as T;
}

export async function getProduits(): Promise<Produit[]> {
  const params = new URLSearchParams({
    filterByFormula: "AND({Actif}=1)",
    "sort[0][field]": "Ordre",
    "sort[0][direction]": "asc",
  }).toString();

  const raw = await fetchAll(T_PRODUITS, `?${params}`);
  return raw.map((r) => ({
    id: field(r, "id", ""),
    nom: field(r, "Nom", ""),
    description: field(r, "Description", ""),
    prix: field(r, "Prix", 0),
    photos: (field(r, "Photos", []) as { id: string; url: string; filename: string }[]).map((p) => ({
      id: p.id,
      url: p.url,
      filename: p.filename,
    })),
    categorie: field(r, "Categorie", []),
    disponibilite: (field(r, "Disponibilite", "En stock") || "En stock") as Produit["disponibilite"],
    vitrine: field(r, "Vitrine", false),
    vitrineOrdre: field(r, "Vitrine_Ordre", 99),
    ordre: field(r, "Ordre", 99),
    actif: field(r, "Actif", false),
    slug: slugify(field(r, "Nom", field(r, "id", ""))),
  }));
}

export async function getProduitBySlug(slug: string): Promise<Produit | null> {
  const all = await getProduits();
  return all.find((p) => p.slug === slug) ?? null;
}

export async function getCategories(): Promise<Categorie[]> {
  const params = new URLSearchParams({
    filterByFormula: "AND({Actif}=1)",
    "sort[0][field]": "Ordre",
    "sort[0][direction]": "asc",
  }).toString();

  const raw = await fetchAll(T_CATEGORIES, `?${params}`);
  return raw.map((r) => ({
    id: field(r, "id", ""),
    nom: field(r, "Nom", ""),
    ordre: field(r, "Ordre", 99),
    actif: field(r, "Actif", false),
    image: field(r, "Image", undefined),
  }));
}

export async function getLivraison(): Promise<Livraison[]> {
  const params = new URLSearchParams({
    filterByFormula: "AND({Actif}=1)",
    "sort[0][field]": "Wilaya_Num",
    "sort[0][direction]": "asc",
  }).toString();

  const raw = await fetchAll(T_LIVRAISON, `?${params}`);
  return raw.map((r) => ({
    id: field(r, "id", ""),
    wilayaNom: field(r, "Wilaya_Nom", ""),
    wilayaNum: field(r, "Wilaya_Num", 0),
    prixDomicile: field(r, "Prix_Domicile", 0),
    prixBureau: field(r, "Prix_Bureau", 0),
    actif: field(r, "Actif", false),
  }));
}

export async function getConfig(): Promise<Config> {
  const raw = await fetchAll(T_CONFIG);
  const r = raw[0] ?? {};
  return {
    telephoneWhatsApp: field(r, "Telephone_WhatsApp", "213791112663"),
    slogan: field(r, "Slogan", "Une passion de famille"),
    lienInstagram: field(r, "Lien_Instagram", "https://www.instagram.com/la_rosa_fleuriste_tlemcen/"),
    lienFacebook: field(r, "Lien_Facebook", "https://www.facebook.com/profile.php?id=100091832552880"),
    lienTikTok: field(r, "Lien_TikTok", "https://www.tiktok.com/@lavieestbelle6581"),
    lienGoogleMaps: field(r, "Lien_GoogleMaps", "https://maps.google.com/?q=La+Rosa+fleuriste+Tlemcen"),
    adresse: field(r, "Adresse", "Tlemcen, Algérie"),
    horaires: field(r, "Horaires", "Lun–Sam 8h–20h · Dim 9h–18h"),
    noteGoogle: field(r, "Note_Google", 4.6),
    nbAvis: field(r, "Nb_Avis", 24),
  };
}

export async function createCommande(data: CommandeInput): Promise<string> {
  const detailsCommande = data.produits
    .map((p) => `${p.nom} × ${p.qty} → ${p.prix * p.qty} DZD`)
    .join("\n");

  const body = {
    records: [
      {
        fields: {
          Client_Nom: data.clientNom,
          Telephone: data.telephone,
          Wilaya: `${data.wilayaNum} - ${data.wilaya}`,
          Mode_Livraison: data.modeLivraison,
          Details_Commande: detailsCommande,
          Sous_Total: data.sousTotal,
          Frais_Livraison: data.fraisLivraison,
          Total: data.total,
          Note: data.note ?? "",
          Statut: "Nouvelle",
        },
      },
    ],
  };

  const res = await fetch(`${API}/${BASE}/${encodeURIComponent(T_COMMANDES)}`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(body),
    cache: "no-store",
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Airtable write error: ${err}`);
  }

  const json = (await res.json()) as { records: { id: string }[] };
  return json.records[0].id;
}
