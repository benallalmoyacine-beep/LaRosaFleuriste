"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

interface ToastData {
  id: number;
  message: string;
}

interface ToastContextValue {
  showToast: (message: string, onView?: () => void) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

let counter = 0;

export function ToastProvider({ children, onViewCart }: { children: ReactNode; onViewCart: () => void }) {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const showToast = useCallback((message: string) => {
    const id = ++counter;
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* Toast portal */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[200] flex flex-col gap-2 items-center pointer-events-none">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: -16, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              transition={{ duration: 0.28, ease: [0.34, 1.2, 0.64, 1] }}
              className="pointer-events-auto flex items-center gap-3 bg-white/80 backdrop-blur-xl border border-white/60 shadow-lg rounded-2xl px-4 py-3 min-w-[220px] max-w-[320px]"
              style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.06)" }}
            >
              {/* Green check */}
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-green-500 flex items-center justify-center">
                <Check size={14} strokeWidth={2.5} className="text-white" />
              </span>

              <div className="flex-1 min-w-0">
                <p className="font-jost text-xs font-medium text-noir truncate">{t.message}</p>
                <p className="font-jost text-[10px] text-muted">Ajouté au panier</p>
              </div>

              <button
                onClick={onViewCart}
                className="flex-shrink-0 font-jost text-[10px] tracking-wider uppercase text-or border-l border-border pl-3 hover:text-noir transition-colors"
              >
                Voir
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
