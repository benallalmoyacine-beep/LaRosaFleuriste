export interface AirtablePhoto {
  id: string;
  url: string;
  filename: string;
  width?: number;
  height?: number;
}

export interface Produit {
  id: string;
  nom: string;
  description: string;
  prix: number;
  photos: AirtablePhoto[];
  categorie: string[];       // IDs des catégories liées
  categorieNom?: string;     // résolu après join
  disponibilite: "En stock" | "Sur commande" | "Rupture";
  prixPromo?: number;   // prix promotionnel (optionnel)
  nouveau: boolean;     // badge "Nouveau"
  tailles: string[];
  couleurs: string[];
  vitrine: boolean;
  vitrineOrdre: number;
  ordre: number;
  actif: boolean;
  slug: string;              // généré depuis nom
}

export interface Categorie {
  id: string;
  nom: string;
  slug: string;
  ordre: number;
  actif: boolean;
  image?: AirtablePhoto[];
}

export interface Livraison {
  id: string;
  wilayaNom: string;
  wilayaNum: number;
  prixDomicile: number;
  prixBureau: number;
  actif: boolean;
}

export interface Config {
  telephoneWhatsApp: string;
  slogan: string;
  lienInstagram: string;
  lienFacebook: string;
  lienTikTok: string;
  lienGoogleMaps: string;
  adresse: string;
  horaires: string;
  noteGoogle: number;
  nbAvis: number;
}

export interface Fleur {
  id: string;
  nom: string;
  couleur: string;
  prixUnitaire: number;
  stockDisponible: number;
  photos: AirtablePhoto[];
  actif: boolean;
}

export interface Emballage {
  id: string;
  nom: string;
  prix: number;
  photos: AirtablePhoto[];
  actif: boolean;
}

export interface CommandeInput {
  clientNom: string;
  telephone: string;
  wilaya: string;
  wilayaNum: number;
  modeLivraison: "Domicile" | "Bureau";
  note?: string;
  produits: { nom: string; qty: number; prix: number }[];
  sousTotal: number;
  fraisLivraison: number;
  total: number;
}
