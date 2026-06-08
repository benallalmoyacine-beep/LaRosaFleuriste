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
  const [orderRef, setOrderRef] = useState("");
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
      const data = (await res.json()) as { waUrl: string; ref: string };
      clearCart();
      setOrderRef(data.ref ?? "");
      setSuccess(true);
      // Redirect immédiat vers WhatsApp — window.location.href n'est jamais bloqué
      window.location.href = data.waUrl;
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
                <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
                  <span className="text-5xl">🌹</span>
                  <p className="font-playfair text-2xl text-noir">Commande enregistrée !</p>
                  {orderRef && (
                    <div className="border border-or/40 bg-or/5 px-6 py-3">
                      <p className="font-jost text-[10px] tracking-widest uppercase text-muted mb-1">Référence</p>
                      <p className="font-playfair text-2xl text-noir tracking-widest">#{orderRef}</p>
                    </div>
                  )}
                  <p className="font-cormorant italic text-muted text-base">Redirection vers WhatsApp…</p>
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
