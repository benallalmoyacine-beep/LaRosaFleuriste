"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "213791112663";
  return (
    <motion.a
      href={`https://wa.me/${number}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Commander sur WhatsApp — La Rosa Fleuriste"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] text-white shadow-lg px-4 py-3 font-jost text-xs font-medium"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.8, type: "spring", stiffness: 300 }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      <MessageCircle size={18} fill="white" />
      <span className="hidden sm:inline">Commander</span>
    </motion.a>
  );
}
