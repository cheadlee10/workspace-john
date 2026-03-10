import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          900: '#14532d',
        },
        earth: {
          50: '#faf9f7',
          100: '#f5f2ed',
          200: '#e8e1d5',
          700: '#6b5d4f',
          800: '#4a3f35',
          900: '#2d241c',
        }
      },
    },
  },
  plugins: [],
}
export default config
