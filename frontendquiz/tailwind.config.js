// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Ensure this includes all your component files
  ],
  darkMode: "class", // Enable dark mode using the class strategy
  theme: {
    extend: {
      colors: {
        // Add custom light and dark colors if needed
        lightBackground: "#ffffff",
        darkBackground: "#1a1a1a",
        lightText: "#000000",
        darkText: "#ffffff",
      },
    },
  },
  plugins: [],
};
