import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#CCFF00",
          foreground: "#0B192C",
        },
        secondary: {
          DEFAULT: "#FF9F0A",
          foreground: "#0B192C",
        },
        tertiary: {
          DEFAULT: "#00F0FF",
          foreground: "#0B192C",
        },
        neutral: {
          DEFAULT: "#0B192C",
          50: "#F4F6F8",
          100: "#E3E7EC",
          200: "#C4CBD4",
          300: "#9AA5B1",
          400: "#6B7688",
          500: "#4A5568",
          600: "#333F52",
          700: "#212B3D",
          800: "#152036",
          900: "#0B192C",
          950: "#060D18",
        },
      },
      fontFamily: {
        heading: ["var(--font-heading)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        glow: "0 0 40px -10px rgba(204, 255, 0, 0.45)",
        "glow-sm": "0 0 20px -6px rgba(204, 255, 0, 0.5)",
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "40px 40px",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
