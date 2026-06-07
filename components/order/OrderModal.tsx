"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { WILAYAS } from "@/data/wilayas";
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
  const [wilayaCode, setWilayaCode] = useState<number | "">("");
  const [mode, setMode] = useState<Mode>("Domicile");
  const [note, setNote] = useState("");
  const [livraisons, setLivraisons] = useState<Livraison[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // Fetch livraison data once
  useEffect(() => {
    if (!isOpen) return;
    fetch("/api/livraison")
      .then((r) => r.json())
      .then(setLivraisons)
      .catch(() => {});
  }, [isOpen]);

  const selectedWilaya = wilayaCode ? WILAYAS.find((w) => w.code === wilayaCode) : null;
  const livraisonRow = livraisons.find(
    (l) => l.wilayaNom.toLowerCase() === selectedWilaya?.nom.toLowerCase()
  );
  const frais = livraisonRow
    ? mode === "Domicile"
      ? livraisonRow.prixDomicile
      : livraisonRow.prixBureau
    : 0;
  const total = totalPrice + frais;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nom || !telephone || !wilayaCode) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/commandes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientNom: nom,
          telephone,
          wilaya: selectedWilaya?.nom ?? "",
          wilayaNum: wilayaCode,
          modeLivraison: mode,
          note,
          produits: items.map((i) => ({ nom: i.nom, qty: i.qty, prix: i.prix })),
          sousTotal: totalPrice,
          fraisLivraison: frais,
          total,
        }),
      });

      if (!res.ok) throw new Error("Erreur serveur");
      const data = (await res.json()) as { waUrl: string };
      clearCart();
      setSuccess(true);
      setTimeout(() => {
        window.open(data.waUrl, "_blank");
        onClose();
        setSuccess(false);
      }, 800);
    } catch {
      setError("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[80] bg-noir/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className="relative w-full max-w-lg bg-[#0f0f0f] border border-or/30 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="sticky top-0 bg-[#0f0f0f] flex items-center justify-between px-6 py-4 border-b border-or/10 z-10">
                <h2 className="font-playfair text-xl text-blanc">Confirmer la commande</h2>
                <button onClick={onClose} className="p-1 text-blanc/40 hover:text-or transition-colors">
                  <X size={20} />
                </button>
              </div>

              {success ? (
                <div className="flex flex-col items-center justify-center py-16 gap-4">
                  <span className="text-6xl">🌹</span>
                  <p className="font-playfair text-2xl text-or">Commande envoyée !</p>
                  <p className="font-cormorant italic text-blanc/50 text-center">
                    Redirection vers WhatsApp…
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="px-6 py-6 space-y-5">
                  {/* Récap */}
                  <div className="bg-blanc/[0.03] border border-or/10 p-4 space-y-2">
                    <p className="font-jost text-xs tracking-widest uppercase text-or/60 mb-3">Récapitulatif</p>
                    {items.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="font-cormorant italic text-blanc/70">
                          {item.nom} × {item.qty}
                        </span>
                        <span className="font-jost text-or/80">
                          {(item.prix * item.qty).toLocaleString("fr-DZ")} DZD
                        </span>
                      </div>
                    ))}
                    <div className="divider-or my-2" />
                    <div className="flex justify-between text-sm">
                      <span className="font-jost text-blanc/50">Sous-total</span>
                      <span className="font-jost text-blanc/70">{totalPrice.toLocaleString("fr-DZ")} DZD</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="font-jost text-blanc/50">Frais de livraison</span>
                      <span className="font-jost text-blanc/70">{frais.toLocaleString("fr-DZ")} DZD</span>
                    </div>
                    <div className="flex justify-between font-playfair text-lg pt-1">
                      <span className="text-blanc">Total</span>
                      <span className="text-or">{total.toLocaleString("fr-DZ")} DZD</span>
                    </div>
                  </div>

                  {/* Form fields */}
                  <div className="space-y-4">
                    <label className="block">
                      <span className="font-jost text-xs tracking-widest uppercase text-blanc/50 mb-1.5 block">
                        Prénom &amp; Nom *
                      </span>
                      <input
                        required
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                        className="w-full bg-transparent border border-or/20 focus:border-or px-4 py-2.5 font-jost text-sm text-blanc outline-none transition-colors"
                        placeholder="Votre nom complet"
                      />
                    </label>

                    <label className="block">
                      <span className="font-jost text-xs tracking-widest uppercase text-blanc/50 mb-1.5 block">
                        Téléphone *
                      </span>
                      <input
                        required
                        type="tel"
                        value={telephone}
                        onChange={(e) => setTelephone(e.target.value)}
                        className="w-full bg-transparent border border-or/20 focus:border-or px-4 py-2.5 font-jost text-sm text-blanc outline-none transition-colors"
                        placeholder="0791 112 663"
                      />
                    </label>

                    <label className="block">
                      <span className="font-jost text-xs tracking-widest uppercase text-blanc/50 mb-1.5 block">
                        Wilaya *
                      </span>
                      <select
                        required
                        value={wilayaCode}
                        onChange={(e) => setWilayaCode(Number(e.target.value) || "")}
                        className="w-full bg-[#0f0f0f] border border-or/20 focus:border-or px-4 py-2.5 font-jost text-sm text-blanc outline-none transition-colors"
                      >
                        <option value="">Choisir une wilaya…</option>
                        {WILAYAS.map((w) => (
                          <option key={w.code} value={w.code}>
                            {w.code} — {w.nom}
                          </option>
                        ))}
                      </select>
                    </label>

                    <div>
                      <span className="font-jost text-xs tracking-widest uppercase text-blanc/50 mb-2 block">
                        Mode de livraison *
                      </span>
                      <div className="flex gap-3">
                        {(["Domicile", "Bureau"] as Mode[]).map((m) => (
                          <button
                            key={m}
                            type="button"
                            onClick={() => setMode(m)}
                            className={`flex-1 py-2.5 font-jost text-sm tracking-wider border transition-all ${
                              mode === m
                                ? "border-or bg-or/10 text-or"
                                : "border-or/20 text-blanc/40 hover:border-or/50"
                            }`}
                          >
                            {m === "Domicile" ? "🏠 Domicile" : "🏢 Bureau"}
                          </button>
                        ))}
                      </div>
                      {livraisonRow && (
                        <p className="font-jost text-xs text-or/60 mt-2">
                          Frais : {frais.toLocaleString("fr-DZ")} DZD
                          {!livraisonRow && wilayaCode && " (wilaya non desservie)"}
                        </p>
                      )}
                    </div>

                    <label className="block">
                      <span className="font-jost text-xs tracking-widest uppercase text-blanc/50 mb-1.5 block">
                        Note / message (optionnel)
                      </span>
                      <textarea
                        rows={3}
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        className="w-full bg-transparent border border-or/20 focus:border-or px-4 py-2.5 font-jost text-sm text-blanc outline-none transition-colors resize-none"
                        placeholder="Instructions de livraison, occasion spéciale…"
                      />
                    </label>
                  </div>

                  {error && (
                    <p className="font-jost text-sm text-rouge text-center">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-rouge text-blanc font-jost text-sm tracking-widest uppercase hover:bg-rouge/80 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Envoi en cours…
                      </>
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
