import Link from "next/link";
import Image from "next/image";
import { MessageCircle, MapPin, Phone, Clock } from "lucide-react";

function IconInstagram({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="2" width="20" height="20" rx="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
    </svg>
  );
}
function IconFacebook({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-blanc border-t border-border pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image src="/logo.jpg" alt="La Rosa Fleuriste" width={48} height={48} className="rounded-full" />
              <p className="font-vibes text-3xl text-noir">La Rosa</p>
            </div>
            <p className="font-cormorant italic text-muted text-base leading-relaxed mb-6">
              Une passion de famille<br />Fleurs, amour &amp; sourires
            </p>
            <div className="flex gap-3">
              {[
                { href: "https://www.instagram.com/la_rosa_fleuriste_tlemcen/", icon: <IconInstagram />, label: "Instagram" },
                { href: "https://www.facebook.com/profile.php?id=100091832552880", icon: <IconFacebook />, label: "Facebook" },
                { href: `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`, icon: <MessageCircle size={16} />, label: "WhatsApp" },
              ].map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-8 h-8 border border-border flex items-center justify-center text-muted hover:text-noir hover:border-noir transition-colors"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-jost text-xs tracking-widest uppercase text-noir mb-5">Navigation</h3>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Accueil" },
                { href: "/catalogue", label: "Catalogue" },
                { href: "/a-propos", label: "À Propos" },
                { href: "/contact", label: "Contact" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="font-jost text-sm text-muted hover:text-noir transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-jost text-xs tracking-widest uppercase text-noir mb-5">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin size={14} className="text-or mt-0.5 shrink-0" />
                <span className="font-jost text-sm text-muted">Tlemcen, Algérie</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={14} className="text-or shrink-0" />
                <a href="https://wa.me/213791112663" className="font-jost text-sm text-muted hover:text-noir transition-colors">
                  +213 791 112 663
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Clock size={14} className="text-or mt-0.5 shrink-0" />
                <span className="font-jost text-sm text-muted">Lun–Sam 8h–20h · Dim 9h–18h</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="divider-light mb-6" />
        <p className="text-center font-jost text-xs text-muted">
          © {year} La Rosa Fleuriste — Tlemcen. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
