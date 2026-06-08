"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, Home, Building2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import type { Livraison } from "@/types/airtable";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

type Mode = "Domicile" | "Bureau";

export default function OrderModal({ isOpen, onClose }: Props) {
  const { items, totalPrice, clearCart } = useCart();

  const [nom, setNom] = useState("");
  const [telephone, setTelephone] = useState("");
  const [wilayaId, setWilayaId] = useState<string>("");
  const [mode, setMode] = useState<Mode>("Domicile");
  const [note, setNote] = useState("");
  const [livraisons, setLivraisons] = useState<Livraison[]>([]);
  const [loadingWilayas, setLoadingWilayas] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [waUrls, setWaUrls] = useState<string[]>([]);
  const [error, setError] = useState("");

  // Chargement des wilayas depuis Airtable (via /api/livraison)
  useEffect(() => {
    if (!isOpen || livraisons.length > 0) return;
    setLoadingWilayas(true);
    fetch("/api/livraison")
      .then((r) => r.json())
      .then((data: Livraison[]) => setLivraisons(data))
      .catch(() => {})
      .finally(() => setLoadingWilayas(false));
  }, [isOpen, livraisons.length]);

  // Wilaya sélectionnée
  const selectedLivraison = livraisons.find((l) => l.id === wilayaId) ?? null;
  const frais = selectedLivraison
    ? mode === "Domicile"
      ? selectedLivraison.prixDomicile
      : selectedLivraison.prixBureau
    : 0;
  const total = totalPrice + frais;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nom || !telephone || !wilayaId || !selectedLivraison) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/commandes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientNom: nom,
          telephone,
          wilaya: selectedLivraison.wilayaNom,
          wilayaNum: selectedLivraison.wilayaNum,
          modeLivraison: mode,
          note,
          produits: items.map((i) => ({ nom: i.nom, qty: i.qty, prix: i.prix, taille: i.taille, couleur: i.couleur, details: i.details })),
          sousTotal: totalPrice,
          fraisLivraison: frais,
          total,
        }),
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({})) as { error?: string; detail?: string };
        throw new Error(errData.detail || errData.error || `HTTP ${res.status}`);
      }
      const data = (await res.json()) as { waUrls: string[] };
      clearCart();
      setWaUrls(data.waUrls);
      setSuccess(true);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Erreur inconnue";
      setError(`Erreur : ${msg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[80] bg-noir/30 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.25 }}
          >
            <div
              className="relative w-full max-w-lg bg-white border border-border max-h-[90vh] overflow-y-auto shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="sticky top-0 bg-white flex items-center justify-between px-6 py-4 border-b border-border z-10">
                <h2 className="font-playfair text-xl text-noir">Confirmer la commande</h2>
                <button onClick={onClose} className="p-1 text-muted hover:text-noir transition-colors">
                  <X size={18} />
                </button>
              </div>

              {success ? (
                <div className="flex flex-col items-center justify-center py-12 px-6 gap-5 text-center">
                  <span className="text-5xl">🌹</span>
                  <p className="font-playfair text-2xl text-noir">Commande enregistrée !</p>
                  <p className="font-cormorant italic text-muted text-base">
                    Envoyez votre commande sur WhatsApp pour la confirmer.
                  </p>
                  <div className="flex flex-col gap-3 w-full mt-2">
                    {waUrls.map((url, i) => (
                      <a
                        key={i}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-3 w-full py-3.5 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-jost text-xs tracking-widest uppercase transition-all"
                      >
                        <svg viewBox="0 0 24 24" fill="white" width={16} height={16}>
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                        </svg>
                        Envoyer sur WhatsApp {i + 1}
                      </a>
                    ))}
                  </div>
                  <button
                    onClick={() => { setSuccess(false); setWaUrls([]); onClose(); }}
                    className="font-jost text-xs text-muted hover:text-noir transition-colors tracking-wider"
                  >
                    Fermer
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="px-6 py-6 space-y-5">
                  {/* Récap */}
                  <div className="bg-blanc border border-border p-4 space-y-2">
                    <p className="font-jost text-xs tracking-widest uppercase text-muted mb-3">Récapitulatif</p>
                    {items.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm gap-2">
                        <div className="min-w-0">
                          <span className="font-cormorant italic text-muted">{item.nom} × {item.qty}</span>
                          {(item.taille || item.couleur) && (
                            <p className="font-jost text-[10px] text-muted">
                              {[item.taille, item.couleur].filter(Boolean).join(" · ")}
                            </p>
                          )}
                        </div>
                        <span className="font-jost text-noir shrink-0">{(item.prix * item.qty).toLocaleString("fr-DZ")} DZD</span>
                      </div>
                    ))}
                    <div className="divider-light my-2" />
                    <div className="flex justify-between text-sm">
                      <span className="font-jost text-muted">Sous-total</span>
                      <span className="font-jost text-noir">{totalPrice.toLocaleString("fr-DZ")} DZD</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="font-jost text-muted">Frais de livraison</span>
                      <span className="font-jost text-noir">{frais.toLocaleString("fr-DZ")} DZD</span>
                    </div>
                    <div className="flex justify-between font-playfair text-lg pt-1">
                      <span className="text-noir">Total</span>
                      <span className="text-noir">{total.toLocaleString("fr-DZ")} DZD</span>
                    </div>
                  </div>

                  {/* Champs */}
                  <div className="space-y-4">
                    <label className="block">
                      <span className="font-jost text-xs tracking-widest uppercase text-muted mb-1.5 block">
                        Prénom &amp; Nom *
                      </span>
                      <input
                        required
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                        autoComplete="name"
                        className="w-full border border-border bg-blanc px-4 py-3 font-jost text-sm text-noir outline-none focus:border-noir transition-colors"
                        placeholder="Votre nom complet"
                      />
                    </label>

                    <label className="block">
                      <span className="font-jost text-xs tracking-widest uppercase text-muted mb-1.5 block">
                        Téléphone *
                      </span>
                      <input
                        required
                        type="tel"
                        value={telephone}
                        onChange={(e) => setTelephone(e.target.value)}
                        autoComplete="tel"
                        className="w-full border border-border bg-blanc px-4 py-3 font-jost text-sm text-noir outline-none focus:border-noir transition-colors"
                        placeholder="0791 112 663"
                      />
                      <p className="font-jost text-xs text-muted mt-1">Ex : 0791 112 663</p>
                    </label>

                    <label className="block">
                      <span className="font-jost text-xs tracking-widest uppercase text-muted mb-1.5 block">
                        Wilaya *
                      </span>
                      <select
                        required
                        value={wilayaId}
                        onChange={(e) => setWilayaId(e.target.value)}
                        className="w-full border border-border bg-blanc px-4 py-3 font-jost text-sm text-noir outline-none focus:border-noir transition-colors"
                        disabled={loadingWilayas}
                      >
                        <option value="">
                          {loadingWilayas ? "Chargement…" : "Choisir une wilaya…"}
                        </option>
                        {livraisons.map((l) => (
                          <option key={l.id} value={l.id}>
                            {l.wilayaNum} - {l.wilayaNom}
                          </option>
                        ))}
                      </select>
                      {selectedLivraison && (
                        <p className="font-jost text-xs text-muted mt-1">
                          Domicile : {selectedLivraison.prixDomicile.toLocaleString("fr-DZ")} DZD
                          {" · "}
                          Bureau : {selectedLivraison.prixBureau.toLocaleString("fr-DZ")} DZD
                        </p>
                      )}
                    </label>

                    <div>
                      <span className="font-jost text-xs tracking-widest uppercase text-muted mb-2 block">
                        Mode de livraison *
                      </span>
                      <div className="flex gap-3">
                        {(["Domicile", "Bureau"] as Mode[]).map((m) => (
                          <button
                            key={m}
                            type="button"
                            onClick={() => setMode(m)}
                            className={`flex-1 flex items-center justify-center gap-2 py-3 font-jost text-sm border transition-all ${
                              mode === m
                                ? "border-noir bg-noir text-white"
                                : "border-border text-muted hover:border-noir"
                            }`}
                          >
                            {m === "Domicile" ? <Home size={14} /> : <Building2 size={14} />}
                            {m}
                          </button>
                        ))}
                      </div>
                      {selectedLivraison && (
                        <p className="font-jost text-xs text-muted mt-1.5">
                          Frais sélectionnés : <span className="text-noir font-medium">{frais.toLocaleString("fr-DZ")} DZD</span>
                        </p>
                      )}
                    </div>

                    <label className="block">
                      <span className="font-jost text-xs tracking-widest uppercase text-muted mb-1.5 block">
                        Note (optionnel)
                      </span>
                      <textarea
                        rows={3}
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        className="w-full border border-border bg-blanc px-4 py-3 font-jost text-sm text-noir outline-none focus:border-noir transition-colors resize-none"
                        placeholder="Instructions de livraison, occasion spéciale…"
                      />
                    </label>
                  </div>

                  {error && (
                    <p className="font-jost text-sm text-rouge text-center">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={loading || loadingWilayas}
                    className="w-full py-3 bg-noir text-white font-jost text-xs tracking-widest uppercase hover:bg-rouge transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <><Loader2 size={14} className="animate-spin" />Envoi en cours…</>
                    ) : (
                      "Envoyer sur WhatsApp 🌹"
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
