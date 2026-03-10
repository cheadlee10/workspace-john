import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        eagle: {
          navy: '#1a2332',
          gold: '#c9a84c',
          green: '#2d5a27',
          brown: '#5c3d2e',
          cream: '#f5f0e8',
          stone: '#8b7d6b',
        }
      },
      fontFamily: {
        heading: ['Georgia', 'serif'],
        body: ['system-ui', '-apple-system', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
export default config
