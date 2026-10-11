/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: {
          DEFAULT: '#101315',
          dark: '#0B0D0E',
          surface: '#14181B',
          panel: '#161B1E',
        },
        graphite: {
          DEFAULT: '#191D20',
          light: '#22272B',
          elevated: '#282E33',
        },
        warmWhite: {
          DEFAULT: '#F3F1EB',
          dimmed: '#D9D7D0',
          muted: '#C1BFB9',
        },
        bronze: {
          DEFAULT: '#C49A62',
          light: '#D6AF79',
          dark: '#A57E49',
          glow: 'rgba(196, 154, 98, 0.15)',
        },
        coolGray: {
          DEFAULT: '#A7ACAE',
          light: '#C8CDCF',
          dark: '#686F72',
        },
        borderDark: {
          DEFAULT: '#232A2F',
          subtle: 'rgba(255, 255, 255, 0.08)',
          prominent: '#2F383F',
        }
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        technical: ['"Space Grotesk"', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        architectural: '0.22em',
        widest: '0.2em',
      },
      backgroundImage: {
        'blueprint-grid': 'radial-gradient(circle, rgba(196, 154, 98, 0.08) 1px, transparent 1px)',
        'linear-overlay': 'linear-gradient(180deg, rgba(16, 19, 21, 0.4) 0%, rgba(16, 19, 21, 0.95) 100%)',
      },
      animation: {
        'pulse-subtle': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
