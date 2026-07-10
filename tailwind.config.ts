import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: { center: true, padding: "1.5rem", screens: { "2xl": "1280px" } },
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0B2A4A",
          50: "#EAF2FA",
          100: "#D2E4F5",
          200: "#A6C8EB",
          400: "#3E7CB8",
          500: "#1E5FA8",
          700: "#123A63",
          900: "#0B2A4A",
          950: "#071B30",
        },
        accent: {
          DEFAULT: "#1E5FA8",
          soft: "#EAF2FA",
        },
        success: "#1F9D6C",
        warning: "#E0A526",
        danger: "#D2483C",
        info: "#3E7CB8",
        surface: "#F7FAFD",
        border: "#E3EBF3",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        sans: ["var(--font-sans)", "sans-serif"],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
      },
      boxShadow: {
        card: "0 1px 2px rgba(11,42,74,0.04), 0 4px 16px rgba(11,42,74,0.06)",
        elevated: "0 8px 30px rgba(11,42,74,0.12)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
