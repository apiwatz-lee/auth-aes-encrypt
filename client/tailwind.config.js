/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      boxShadow: {
        "bottom-only": "0 4px 4px -2px rgb(250, 154, 0)",
      },
      backgroundImage: {
        shopping: "url('./assets/img/Shopping.jpg')",
      },
    },
  },
  plugins: [],
};
