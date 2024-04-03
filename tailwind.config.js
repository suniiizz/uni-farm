/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        main: "#746A68",
        sub: "#C7C0BC",
        sub2: "#54524F",
        sub3: "#A5A2A0",
        bg: "#E3E3E3",
        bg2: "#E1DFDF",
        line: "#C7C0BC",
        green: "#447135",
        green2: "#B0C642",
        red: "#F41313",
        red2: "#D9CBCB",
        blue: "#38549D",
        yellow: "#D0943A",

        mainButton: "#968978",
      },
    },
  },
  plugins: [],
  mode: "jit",
};
