/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Anderson-style color palette
        'navy-darkest': '#0a192f',
        'navy-dark': '#112240',
        'slate-card': '#1e293b',
        'cyan-bright': '#00d9ff',
        'cyan-glow': '#0ea5e9',
      },
    },
  },
  plugins: [],
}
