/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        main: "#746A68",
        sub: "#C7C0BC",
        bg: "#E3E3E3",
        line: "#C7C0BC",
        green: "#447135",
        green2: "#B0C642",
        red: "#F41313",
        blue: "#38549D",
        yellow: "#D0943A",

        mainButton: "#968978",
      },
    },
  },
  plugins: [],
};
