/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        surface: {
          950: "#080a0f", // Deep background
          900: "#0d1117", // Primary container
          850: "#121722", // Card background
          800: "#182030", // Elevated card / border
          700: "#222c42", // Hover border
        },
        accent: {
          cyan: "#00E5FF",
          "cyan-glow": "rgba(0, 229, 255, 0.12)",
          mint: "#10B981",
          "mint-glow": "rgba(16, 185, 129, 0.12)",
          amber: "#F59E0B",
          "amber-glow": "rgba(245, 158, 11, 0.12)",
        },
        border: {
          subtle: "#1b2234",
          highlight: "#2d3752",
        },
      },
      fontFamily: {
        sans: ["Plus Jakarta Sans", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};
