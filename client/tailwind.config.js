/** @type {import('tailwindcss').Config} */
import containerQueriesPlugin from "@tailwindcss/container-queries";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [containerQueriesPlugin],
};
