"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus } from "lucide-react";

function IconWhatsApp() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={18} height={18}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
    </svg>
  );
}
function IconInstagram() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width={18} height={18}>
      <rect x="2" y="2" width="20" height="20" rx="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
    </svg>
  );
}
function IconFacebook() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={18} height={18}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  );
}
function IconTikTok() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={18} height={18}>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
    </svg>
  );
}

const socials = [
  {
    key: "whatsapp",
    href: "https://wa.me/213791112663",
    label: "WhatsApp",
    icon: <IconWhatsApp />,
    color: "bg-[#25D366] text-white",
  },
  {
    key: "instagram",
    href: "https://www.instagram.com/la_rosa_fleuriste_tlemcen/",
    label: "Instagram",
    icon: <IconInstagram />,
    color: "bg-gradient-to-br from-purple-500 to-pink-500 text-white",
  },
  {
    key: "facebook",
    href: "https://www.facebook.com/profile.php?id=100091832552880",
    label: "Facebook",
    icon: <IconFacebook />,
    color: "bg-[#1877F2] text-white",
  },
  {
    key: "tiktok",
    href: "https://www.tiktok.com/@lavieestbelle6581",
    label: "TikTok",
    icon: <IconTikTok />,
    color: "bg-noir text-white",
  },
];

export default function FloatingMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-50 flex flex-col items-end gap-3">
      {/* Social buttons */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-[-1]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            {socials.map((s, i) => (
              <motion.div
                key={s.key}
                initial={{ opacity: 0, y: 16, scale: 0.85 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.9 }}
                transition={{ duration: 0.22, delay: i * 0.04, ease: [0.34, 1.2, 0.64, 1] }}
                className="flex items-center gap-2"
              >
                <span className="bg-white/80 backdrop-blur-xl border border-white/60 shadow-sm rounded-xl px-3 py-1.5 font-jost text-xs text-noir whitespace-nowrap"
                  style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
                  {s.label}
                </span>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className={`w-11 h-11 rounded-full flex items-center justify-center shadow-md ${s.color}`}
                  style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.15)" }}
                >
                  {s.icon}
                </a>
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Main FAB — Apple style glassmorphism */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Fermer" : "Nous contacter"}
        className="w-13 h-13 rounded-full flex items-center justify-center"
        style={{
          width: 52,
          height: 52,
          background: "rgba(255,255,255,0.75)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.6)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08)",
        }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        animate={{ rotate: open ? 45 : 0 }}
        transition={{ duration: 0.25, ease: [0.34, 1.2, 0.64, 1] }}
      >
        {open ? <X size={20} className="text-noir" /> : <Plus size={20} className="text-noir" />}
      </motion.button>
    </div>
  );
}
