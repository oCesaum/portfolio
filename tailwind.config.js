/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    backgroundSize: {
      auto: "auto",
      cover: "cover",
      contain: "contain",
      "200%": "200%",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#ff5a5f",
        secondary: "#00b6ba",
        tertiary: "#ff7f50",
      },
      animation: {
        "customize-1": "customize-1 40s linear infinite",
        "customize-2": "customize-2 50s linear infinite",
        "horizontal-move": "horizontal-move 15s linear infinite",
        "background-pan": "background-pan 3s linear infinite",
      },
      keyframes: {
        "customize-1": {
          "0%": {
            transform: "rotate(0.0deg) scaleX(1) scaleY(1)",
          },
          "50%": {
            transform: "rotate(360deg) scaleX(1.5) scaleY(2)",
          },
          "100%": {
            transform: "rotate(0.0deg) scaleX(1) scaleY(1)",
          },
        },
        "customize-2": {
          "0%": {
            transform: "rotate(0.0deg) scaleX(1) scaleY(1)",
          },
          "50%": {
            transform: "rotate(-360deg) scaleX(1.5) scaleY(2)",
          },
          "100%": {
            transform: "rotate(0.0deg) scaleX(1) scaleY(1)",
          },
        },
        "horizontal-move": {
          to: { transform: "translateX(-120%)" },
        },
        "background-pan": {
          from: {
            "background-position": "0% center",
          },
          to: {
            "background-position": "-200% center",
          },
        },
      },
    },
  },
  plugins: [],
};
