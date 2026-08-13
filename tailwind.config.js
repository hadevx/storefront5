/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        // legacy families kept for the previous storefront
        manrope: ["Manrope"],
        webschema: ["webschema"],
        arabic: ["arabic"],
        suls: ["Suls"],
        // VERSO bookstore system
        display: ['"Instrument Serif"', "Georgia", '"Times New Roman"', "serif"],
        sans: ['"Inter"', "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
        mono: ['"Inter"', "ui-monospace", "monospace"],
      },
      colors: {
        paper: {
          DEFAULT: "#F3EFE7",
          50: "#FBF9F5",
          100: "#F3EFE7",
          200: "#EAE4D7",
          300: "#DCD4C3",
          400: "#C8BFAB",
        },
        ink: {
          DEFAULT: "#15120E",
          900: "#15120E",
          800: "#221E18",
          700: "#2E2921",
          600: "#4A4338",
          500: "#6F675B",
          400: "#948B7C",
          300: "#B6AD9D",
        },
        wine: {
          DEFAULT: "#7A2231",
          deep: "#4E1520",
          soft: "#A6535F",
          wash: "#F0E2E1",
        },
      },
      letterSpacing: {
        label: "0.22em",
        wider2: "0.32em",
      },
      maxWidth: {
        "8xl": "96rem",
        prose2: "62ch",
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.16, 1, 0.3, 1)",
        ink: "cubic-bezier(0.65, 0, 0.35, 1)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translate3d(0,0,0)" },
          "100%": { transform: "translate3d(-50%,0,0)" },
        },
        floaty: {
          "0%,100%": { transform: "translate3d(0,0,0)" },
          "50%": { transform: "translate3d(0,-10px,0)" },
        },
      },
      animation: {
        marquee: "marquee 42s linear infinite",
        floaty: "floaty 9s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
