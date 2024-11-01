/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./public/**/*.html", // Includes all HTML files in the public folder and its subfolders
    "./auth/**/*.{js,html}", // Includes all JS and HTML files in the auth folder (and subfolders like login and register)
    "./post/**/*.{js,html}", // Includes all JS and HTML files in the post folder (and subfolders like create, edit, single-post, and index)
    "./profile/**/*.{js,html}", // Includes all JS and HTML files in the profile folder
    "./src/**/*.{js,html}", // Includes all JS and HTML files in the src folder (and subfolders like components, router, ui, and utilities)
    "./src/js/utilities/**/*.{js,html}", // Includes all JS and HTML files in the src/js/utilities folder
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
