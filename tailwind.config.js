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
        // Add colors inside the colors object
        backgroundDark: "#121212", // Dark main background
        backgroundCard: "#1E1E1E", // Secondary background for cards
        hoverGray: "#252525", // Hover effect on buttons and links
        textPrimary: "#E0E0E0", // Primary text
        textSecondary: "#A0A0A0", // Secondary text
        linkColor: "#BB86FC", // Link color
        errorRed: "#CF6679", // Error message color
        successTeal: "#03DAC6", // Success color (same as teal color)
      },
    },
    fontFamily: {
      sans: ["Roboto", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
  },
  plugins: [],
};
