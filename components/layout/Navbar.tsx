"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/catalogue", label: "Catalogue" },
  { href: "/a-propos", label: "À Propos" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { totalItems, setDrawerOpen } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-sm shadow-sm border-b border-border"
          : "bg-white border-b border-border"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14 md:h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Image
            src="/logo.jpg"
            alt="La Rosa Fleuriste"
            width={38}
            height={38}
            className="rounded-full"
            priority
          />
          {/* Nom visible desktop uniquement */}
          <span className="font-vibes text-2xl text-noir hidden md:block">La Rosa</span>
        </Link>

        {/* Desktop links — masqués sur mobile */}
        <ul className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="font-jost text-xs tracking-widest uppercase text-muted hover:text-noir transition-colors duration-200"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Panier — visible partout, toujours en haut à droite */}
        <button
          onClick={() => setDrawerOpen(true)}
          className="relative p-2 text-muted hover:text-noir transition-colors"
          aria-label="Ouvrir le panier"
        >
          <ShoppingCart size={20} />
          {totalItems > 0 && (
            <span className="absolute -top-0.5 -right-0.5 bg-rouge text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
              {totalItems > 9 ? "9+" : totalItems}
            </span>
          )}
        </button>
      </nav>
    </header>
  );
}
