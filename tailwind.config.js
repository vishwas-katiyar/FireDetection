const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"], // Update paths to your components
  theme: {
    extend: {}, // Add custom Tailwind theme configurations here (optional)
  },
  plugins: [], // Add any additional Tailwind plugins here (optional)
});