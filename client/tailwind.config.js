/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "selector",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        DEFAULT: "var(--ff-noto-sans)",
        sans: "var(--ff-noto-sans)",
        work: "var(--ff-work-sans)",
      },
      colors: {
        "text-primary": "var(--clr-text-primary)",
        "text-secondary": "var(--clr-text-secondary)",
        "bg-primary": "var(--clr-bg-primary)",
        "bg-secondary": "var(--clr-bg-secondary)",
        "border-primary": "var(--clr-border-primary)",
        "border-secondary": "var(--clr-border-secondary)",
        "accent-primary": "var(--clr-accent-primary)",
        "text-accent": "var(--clr-accent-text)",
      },
    },
  },
  plugins: [],
};
