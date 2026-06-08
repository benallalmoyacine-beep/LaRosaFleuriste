"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Grid3x3, Flower2, Info, Phone } from "lucide-react";

const links = [
  { href: "/", label: "Accueil", Icon: Home },
  { href: "/sur-mesure", label: "Sur Mesure", Icon: Flower2 },
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
            <li key={href} className="flex-1 relative">
              <Link
                href={href}
                className={`flex flex-col items-center justify-center h-full gap-0.5 transition-colors ${
                  active ? "text-noir" : "text-muted"
                }`}
              >
                <Icon size={17} strokeWidth={active ? 2 : 1.5} />
                <span className="font-jost text-[8px] tracking-wide uppercase leading-tight text-center">
                  {label}
                </span>
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
