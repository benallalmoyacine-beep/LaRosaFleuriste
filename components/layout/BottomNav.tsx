"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Grid3x3, Info, Phone } from "lucide-react";

const links = [
  { href: "/", label: "Accueil", Icon: Home },
  { href: "/catalogue", label: "Catalogue", Icon: Grid3x3 },
  { href: "/a-propos", label: "À Propos", Icon: Info },
  { href: "/contact", label: "Contact", Icon: Phone },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-border">
      <ul className="flex items-stretch h-16">
        {links.map(({ href, label, Icon }) => {
          const active = pathname === href || (href !== "/" && pathname.startsWith(href));
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                className={`flex flex-col items-center justify-center h-full gap-1 transition-colors ${
                  active ? "text-noir" : "text-muted"
                }`}
              >
                <Icon size={18} strokeWidth={active ? 2 : 1.5} />
                <span className="font-jost text-[9px] tracking-wide uppercase">{label}</span>
                {active && (
                  <span className="absolute bottom-1 w-1 h-1 rounded-full bg-or" />
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
