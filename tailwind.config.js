/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'jukebox': {
          'dark': '#0a0a0a',
          'panel': '#1a1a1a',
          'amber': '#ff9500',
          'amber-glow': '#ffb340',
          'amber-dim': '#996600',
        }
      },
      fontFamily: {
        'lcd': ['DSEG7Classic', 'monospace'],
      },
      boxShadow: {
        'glow-amber': '0 0 20px rgba(255, 149, 0, 0.5), 0 0 40px rgba(255, 149, 0, 0.3)',
        'glow-amber-sm': '0 0 10px rgba(255, 149, 0, 0.4)',
      }
    },
  },
  plugins: [],
}
