"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
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
            <motion.div
              className="fixed inset-0 z-[60] bg-noir/30 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
            />
            <motion.aside
              className="fixed top-0 right-0 bottom-0 z-[70] w-full max-w-md bg-white border-l border-border flex flex-col shadow-xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-border">
                <div className="flex items-center gap-2">
                  <ShoppingBag size={16} className="text-muted" />
                  <h2 className="font-playfair text-lg text-noir">Mon panier</h2>
                  {items.length > 0 && (
                    <span className="bg-rouge text-white text-xs font-jost px-1.5 py-0.5 rounded-full">
                      {items.reduce((s, i) => s + i.qty, 0)}
                    </span>
                  )}
                </div>
                <button onClick={() => setDrawerOpen(false)} className="p-1 text-muted hover:text-noir transition-colors">
                  <X size={18} />
                </button>
              </div>

              {/* Items */}
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center gap-4 py-16">
                    <span className="text-5xl">🌹</span>
                    <p className="font-cormorant italic text-muted text-xl">Votre panier est vide</p>
                    <Link
                      href="/catalogue"
                      onClick={() => setDrawerOpen(false)}
                      className="border border-noir text-noir font-jost text-xs tracking-widest uppercase px-6 py-2 hover:bg-noir hover:text-white transition-all"
                    >
                      D&eacute;couvrir le catalogue
                    </Link>
                  </div>
                ) : (
                  items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex gap-3 pb-4 border-b border-border"
                    >
                      <div className="relative w-16 h-16 shrink-0 border border-border overflow-hidden bg-blanc">
                        {item.photo ? (
                          <Image src={item.photo} alt={item.nom} fill className="object-cover" sizes="64px" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xl">🌹</div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-playfair text-noir text-sm truncate">{item.nom}</p>
                        <p className="font-jost text-muted text-xs mt-0.5">{item.prix.toLocaleString("fr-DZ")} DZD</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button onClick={() => updateQty(item.id, item.qty - 1)} className="p-1 border border-border text-muted hover:text-noir hover:border-noir transition-colors">
                            <Minus size={10} />
                          </button>
                          <span className="font-jost text-noir text-sm w-5 text-center">{item.qty}</span>
                          <button onClick={() => updateQty(item.id, item.qty + 1)} className="p-1 border border-border text-muted hover:text-noir hover:border-noir transition-colors">
                            <Plus size={10} />
                          </button>
                          <button onClick={() => removeItem(item.id)} className="ml-auto p-1 text-muted hover:text-rouge transition-colors">
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>
                      <p className="font-playfair text-noir text-sm shrink-0">
                        {(item.prix * item.qty).toLocaleString("fr-DZ")}
                      </p>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className="px-6 py-5 border-t border-border space-y-4 bg-blanc">
                  <div className="flex justify-between items-center">
                    <span className="font-jost text-xs text-muted tracking-wider uppercase">Sous-total</span>
                    <span className="font-playfair text-noir text-xl">{totalPrice.toLocaleString("fr-DZ")} DZD</span>
                  </div>
                  <p className="font-jost text-xs text-muted">Frais de livraison calculés à la commande</p>
                  <button
                    onClick={() => { setDrawerOpen(false); setOrderOpen(true); }}
                    className="w-full py-3 bg-noir text-white font-jost text-xs tracking-widest uppercase hover:bg-rouge transition-all"
                  >
                    Confirmer la commande
                  </button>
                  <button
                    onClick={clearCart}
                    className="w-full py-2 text-muted hover:text-noir font-jost text-xs tracking-wider transition-colors"
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
