import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        accent: "var(--color-accent)",
        page: "var(--color-background)",
        ink: "var(--color-text)"
      },
      borderRadius: {
        theme: "var(--radius-theme)"
      }
    }
  },
  plugins: []
};

export default config;
