import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb",
        secondary: "#1e40af",
        brand: {
          DEFAULT: "#0D9488",
          light: "#14B8A6",
          dark: "#0F766E",
        },
      },
      fontFamily: {
        sans: ["var(--font-plus-jakarta-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-plus-jakarta-sans)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
