/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
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
      animation: {
        rotate: "rotate .5s linear",
        "horizontal-move": "horizontal-move 15s linear infinite",
        "background-pan": "background-pan 3s linear infinite",
      },
      keyframes: {
        rotate: {
          to: { transform: "rotate(360deg)" },
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
