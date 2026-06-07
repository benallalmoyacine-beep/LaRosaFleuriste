import type { Metadata } from "next";
import { Cormorant_Garamond, Playfair_Display, Jost, Great_Vibes } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import LoadingScreen from "@/components/ui/LoadingScreen";
import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/cart/CartDrawer";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const vibes = Great_Vibes({
  variable: "--font-vibes",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "La Rosa Fleuriste — Tlemcen",
  description:
    "Boutique florale à Tlemcen, Algérie. Livraison de fleurs, bouquets sur mesure, arrangements floraux. Une passion de famille.",
  openGraph: {
    title: "La Rosa Fleuriste — Tlemcen",
    description: "Boutique florale à Tlemcen. Livraison de fleurs & bouquets sur mesure.",
    type: "website",
    locale: "fr_DZ",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${cormorant.variable} ${playfair.variable} ${jost.variable} ${vibes.variable}`}
    >
      <body className="bg-noir text-blanc font-jost min-h-screen antialiased">
        <CartProvider>
          <LoadingScreen />
          <Navbar />
          <CartDrawer />
          <main>{children}</main>
          <Footer />
          <WhatsAppButton />
        </CartProvider>
      </body>
    </html>
  );
}
