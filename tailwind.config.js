/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--color-background)",
        "background-weak": "var(--color-background-weak)",
        "background-weak-hover": "var(--color-background-weak-hover)",
        "background-strong": "var(--color-background-strong)",
        "background-strong-hover": "var(--color-background-strong-hover)",
        "background-interactive": "var(--color-background-interactive)",
        "background-interactive-weaker":
          "var(--color-background-interactive-weaker)",
        text: "var(--color-text)",
        "text-weak": "var(--color-text-weak)",
        "text-weaker": "var(--color-text-weaker)",
        "text-strong": "var(--color-text-strong)",
        "text-inverted": "var(--color-text-inverted)",
        border: "var(--color-border)",
        "border-weak": "var(--color-border-weak)",
        icon: "var(--color-icon)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Arial", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};
