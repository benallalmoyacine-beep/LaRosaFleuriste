import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        noir: "#1c1c1c",
        or: "#c9a84c",
        rouge: "#c4564a",
        rose: "#e8a4b8",
        vert: "#2d5016",
        blanc: "#f9f7f5",
        surface: "#ffffff",
        muted: "#767676",
        border: "#e5ddd5",
      },
      fontFamily: {
        cormorant: ["var(--font-cormorant)", "serif"],
        playfair: ["var(--font-playfair)", "serif"],
        jost: ["var(--font-jost)", "sans-serif"],
        vibes: ["var(--font-vibes)", "cursive"],
      },
      animation: {
        "petal-fall": "petalFall linear infinite",
        "fade-in": "fadeIn 0.6s ease forwards",
      },
      keyframes: {
        petalFall: {
          "0%": { transform: "translateY(-10px) rotate(0deg)", opacity: "0" },
          "10%": { opacity: "0.6" },
          "90%": { opacity: "0.2" },
          "100%": { transform: "translateY(100vh) rotate(360deg)", opacity: "0" },
        },
        fadeIn: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
