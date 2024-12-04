/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./public/**/*.html",
    "./auth/**/*.{js,html}",
    "./post/**/*.{js,html}",
    "./profile/**/*.{js,html}",
    "./src/**/*.{js,html}",
    "./src/js/utilities/**/*.{js,html}",
  ],
  theme: {
    extend: {
      colors: {
        backgroundDark: "#121212",
        backgroundCard: "#1E1E1E",
        hoverGray: "#252525",
        textPrimary: "#E0E0E0",
        textSecondary: "#A0A0A0",
        linkColor: "#BB86FC",
        errorRed: "#CF6679",
        successTeal: "#03DAC6",
      },
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
        serif: ["Merriweather", "serif"],
      },
      animation: {
        fadeIn: "fadeIn 0.3s ease-out forwards",
        fadeOut: "fadeOut 0.3s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        fadeOut: {
          "0%": { opacity: "1", transform: "scale(1)" },
          "100%": { opacity: "0", transform: "scale(0.95)" },
        },
      },
    },
  },
  plugins: [],
};
