import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        "Maven Pro": "Maven Pro",
      },
      spacing: {
        "21": "5.5rem",
        "22": "6rem",
        "23": "6.5rem",
        "42": "10.5rem",
        "97": " 25rem",
        "98": "26rem",
        "100": "28rem",
        "102": "40rem",
        "108": "46rem",
        "-97": "-25rem",
      },
      fontSize: {
        xs1: "0.55rem",
      },
      height: {
        screenxs1: "70vh",
        screenxs: "80vh",
        screenxss: "98vh",
        screenxl: "120vh",
        screen1xl: "140vh",
        screen2xl: "160vh",
        screen3xl: "190vh",
      },
      width: {
        "49%": "49%",
        "55%": "55%",
        "58%": "58%",
        "60%": "60%",
        "70%": "70%",
        "86%": "86%",
        "101": "170px",
        "102": "440px",
      },
      screens: {
        "1xl": "1360px",
        "4xl": "1920px",
        "mobile-max": { max: "640px" },
        "19in-max" : {max: "1366px"}
      },
    },
  },
  plugins: [],
};
export default config;
