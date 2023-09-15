/**
 * @type {import('@types/tailwindcss/tailwind-config').TailwindConfig}
 */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{ts,tsx}",
  ],
  plugins: [
    require('@tailwindcss/forms'),
  ],
  theme: {},
};