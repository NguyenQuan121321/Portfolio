/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        surface: {
          950: "rgb(var(--bg-surface-950-rgb, 8 10 15) / <alpha-value>)",
          900: "rgb(var(--bg-surface-900-rgb, 13 17 23) / <alpha-value>)",
          850: "rgb(var(--bg-surface-850-rgb, 18 23 34) / <alpha-value>)",
          800: "rgb(var(--bg-surface-800-rgb, 24 32 48) / <alpha-value>)",
          700: "rgb(var(--bg-surface-700-rgb, 34 44 66) / <alpha-value>)",
        },
        accent: {
          cyan: "var(--accent-cyan)",
          "cyan-glow": "var(--accent-cyan-glow)",
          mint: "var(--accent-mint)",
          "mint-glow": "var(--accent-mint-glow)",
          amber: "var(--accent-amber)",
          "amber-glow": "var(--accent-amber-glow)",
        },
        border: {
          subtle: "rgb(var(--border-subtle-rgb, 27 34 52) / <alpha-value>)",
          highlight: "rgb(var(--border-highlight-rgb, 45 55 82) / <alpha-value>)",
        },
      },
      fontFamily: {
        sans: ["Be Vietnam Pro", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};
