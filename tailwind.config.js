/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // All React source files
     "./node_modules/@radix-ui/react-tabs/**/*",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
