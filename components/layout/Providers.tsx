"use client";

import { ReactNode } from "react";
import { CartProvider, useCart } from "@/context/CartContext";
import { ToastProvider } from "@/context/ToastContext";

function ToastWithCart({ children }: { children: ReactNode }) {
  const { setDrawerOpen } = useCart();
  return (
    <ToastProvider onViewCart={() => setDrawerOpen(true)}>
      {children}
    </ToastProvider>
  );
}

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      <ToastWithCart>{children}</ToastWithCart>
    </CartProvider>
  );
}
