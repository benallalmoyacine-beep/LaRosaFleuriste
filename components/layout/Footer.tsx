import Link from "next/link";
import Image from "next/image";
import { MessageCircle, MapPin, Phone, Clock } from "lucide-react";

function IconInstagram({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
    </svg>
  );
}
function IconFacebook({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-noir border-t border-or/20 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <Image src="/logo.png" alt="La Rosa Fleuriste" width={64} height={64} className="rounded-full mb-2" />
            <p className="font-cormorant italic text-blanc/60 text-lg leading-relaxed">
              Une passion de famille<br />Fleurs, amour &amp; sourires
            </p>
            <div className="flex gap-4 mt-6">
              <a
                href="https://www.instagram.com/la_rosa_fleuriste_tlemcen/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full border border-or/30 text-or/60 hover:text-or hover:border-or transition-colors"
                aria-label="Instagram"
              >
                <IconInstagram size={18} />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=100091832552880"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full border border-or/30 text-or/60 hover:text-or hover:border-or transition-colors"
                aria-label="Facebook"
              >
                <IconFacebook size={18} />
              </a>
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full border border-or/30 text-or/60 hover:text-or hover:border-or transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle size={18} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-playfair text-or text-sm tracking-widest uppercase mb-4">Navigation</h3>
            <ul className="space-y-2">
              {[
                { href: "/", label: "Accueil" },
                { href: "/catalogue", label: "Catalogue" },
                { href: "/a-propos", label: "À Propos" },
                { href: "/contact", label: "Contact" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="font-jost text-sm text-blanc/50 hover:text-or transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-playfair text-or text-sm tracking-widest uppercase mb-4">Contact</h3>
            <ul className="space-y-3 text-sm font-jost text-blanc/50">
              <li className="flex items-start gap-2">
                <MapPin size={15} className="text-or mt-0.5 shrink-0" />
                <span>Tlemcen, Algérie</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={15} className="text-or shrink-0" />
                <a href="https://wa.me/213791112663" className="hover:text-or transition-colors">
                  +213 791 112 663
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Clock size={15} className="text-or mt-0.5 shrink-0" />
                <span>Lun–Sam 8h–20h · Dim 9h–18h</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="divider-or mb-6" />

        <p className="text-center font-jost text-xs text-blanc/30">
          © {year} La Rosa Fleuriste — Tlemcen. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
