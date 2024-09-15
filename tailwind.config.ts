import type { Config } from 'tailwindcss'

const withMT = require("@material-tailwind/react/utils/withMT")

const config: Config = withMT({
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        anton: ['Anton', 'sans-serif'],
        raleway: ['Raleway', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
      },
      keyframes:{
        move: {
          // move in all directions like circle smoothly
          '0%': { transform: 'translate(0, 0)' },
          '25%': { transform: 'translate(20px, 0)' },
          '50%': { transform: 'translate(20px, 20px)' },
          '75%': { transform: 'translate(0, 20px)' },
          '100%': { transform: 'translate(0, 0)' },
        }
      },
      animation: {
        // move : 'move 2s linear infinite',
        "movingY": 'move 2s linear infinite',
      }
    },
  },
  plugins: [],
})

export default config