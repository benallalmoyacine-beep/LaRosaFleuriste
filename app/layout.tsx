import type { Metadata } from "next";
import { Cormorant_Garamond, Playfair_Display, Jost, Great_Vibes } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import BottomNav from "@/components/layout/BottomNav";
import Footer from "@/components/layout/Footer";
import FloatingMenu from "@/components/ui/FloatingMenu";
import GlobalPetals from "@/components/ui/GlobalPetals";
import LoadingScreen from "@/components/ui/LoadingScreen";
import Providers from "@/components/layout/Providers";
import CartDrawer from "@/components/cart/CartDrawer";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin", "latin-ext"],
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
  icons: {
    icon: "/logo.jpg",
    apple: "/logo.jpg",
    shortcut: "/logo.jpg",
  },
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
      <head>
        <meta charSet="utf-8" />
      </head>
      <body className="bg-blanc text-noir font-jost min-h-screen antialiased">
        <Providers>
          <GlobalPetals />
          <LoadingScreen />
          <Navbar />
          <CartDrawer />
          <main className="pb-16 md:pb-0">{children}</main>
          <Footer />
          <BottomNav />
          <FloatingMenu />
        </Providers>
      </body>
    </html>
  );
}
