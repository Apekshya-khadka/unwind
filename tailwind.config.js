/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0d1310",
        forest: "#13251e",
        navy: "#1b2333",
        mint: "#bdeede",
        sage: "#e8f3ef",
        gold: "#f0b15e",
        slate: "#5b6472",
      },
      fontFamily: {
        display: ["Playfair Display", "Georgia", "serif"],
        body: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
