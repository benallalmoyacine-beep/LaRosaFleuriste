"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import OrderModal from "@/components/order/OrderModal";

export default function CartDrawer() {
  const { items, drawerOpen, setDrawerOpen, removeItem, updateQty, totalPrice, clearCart } = useCart();
  const [orderOpen, setOrderOpen] = useState(false);

  return (
    <>
      <AnimatePresence>
        {drawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-[60] bg-noir/70 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
            />

            {/* Drawer */}
            <motion.aside
              className="fixed top-0 right-0 bottom-0 z-[70] w-full max-w-md bg-[#0f0f0f] border-l border-or/20 flex flex-col shadow-2xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-or/10">
                <div className="flex items-center gap-3">
                  <ShoppingBag size={18} className="text-or" />
                  <h2 className="font-playfair text-xl text-blanc">Mon panier</h2>
                  {items.length > 0 && (
                    <span className="bg-rouge text-blanc text-xs font-jost px-2 py-0.5 rounded-full">
                      {items.reduce((s, i) => s + i.qty, 0)}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="p-1.5 text-blanc/40 hover:text-or transition-colors"
                  aria-label="Fermer"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Items */}
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center gap-4 py-20">
                    <span className="text-6xl">🌹</span>
                    <p className="font-cormorant italic text-blanc/40 text-xl">Votre panier est vide</p>
                    <button
                      onClick={() => setDrawerOpen(false)}
                      className="border border-or/40 text-or font-jost text-xs tracking-widest uppercase px-6 py-2 hover:bg-or hover:text-noir transition-all"
                    >
                      Découvrir le catalogue
                    </button>
                  </div>
                ) : (
                  items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex gap-3 pb-4 border-b border-or/10"
                    >
                      {/* Photo */}
                      <div className="relative w-16 h-16 shrink-0 border border-or/20 overflow-hidden">
                        {item.photo ? (
                          <Image src={item.photo} alt={item.nom} fill className="object-cover" sizes="64px" />
                        ) : (
                          <div className="w-full h-full bg-rose/10 flex items-center justify-center text-2xl">🌹</div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="font-playfair text-blanc text-sm leading-tight truncate">{item.nom}</p>
                        <p className="font-jost text-or text-sm mt-0.5">{item.prix.toLocaleString("fr-DZ")} DZD</p>

                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => updateQty(item.id, item.qty - 1)}
                            className="p-1 border border-or/20 text-or/60 hover:text-or hover:border-or transition-colors"
                          >
                            <Minus size={11} />
                          </button>
                          <span className="font-jost text-blanc text-sm w-5 text-center">{item.qty}</span>
                          <button
                            onClick={() => updateQty(item.id, item.qty + 1)}
                            className="p-1 border border-or/20 text-or/60 hover:text-or hover:border-or transition-colors"
                          >
                            <Plus size={11} />
                          </button>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="ml-auto p-1 text-blanc/20 hover:text-rouge transition-colors"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>

                      <p className="font-playfair text-or text-sm shrink-0">
                        {(item.prix * item.qty).toLocaleString("fr-DZ")}
                      </p>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className="px-6 py-5 border-t border-or/10 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-jost text-sm text-blanc/50 tracking-wider uppercase">Sous-total</span>
                    <span className="font-playfair text-or text-xl">{totalPrice.toLocaleString("fr-DZ")} DZD</span>
                  </div>
                  <p className="font-jost text-xs text-blanc/30">Frais de livraison calculés à la commande</p>
                  <button
                    onClick={() => { setDrawerOpen(false); setOrderOpen(true); }}
                    className="w-full py-3 bg-rouge text-blanc font-jost text-sm tracking-widest uppercase hover:bg-rouge/80 transition-all"
                  >
                    Confirmer la commande
                  </button>
                  <button
                    onClick={clearCart}
                    className="w-full py-2 text-blanc/20 hover:text-blanc/50 font-jost text-xs tracking-wider transition-colors"
                  >
                    Vider le panier
                  </button>
                </div>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <OrderModal isOpen={orderOpen} onClose={() => setOrderOpen(false)} />
    </>
  );
}
