/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        base: '#FAFAF8',
        card: '#FFFFFF',
        ink: '#111111',
        muted: '#666666',
        accent: '#D8B46A',
        line: 'rgba(17,17,17,0.10)',
      },
      fontFamily: {
        display: ['"Canela"', '"PP Editorial New"', '"Playfair Display"', 'Georgia', 'serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
        num: ['"Space Grotesk"', '"Inter"', 'sans-serif'],
      },
      letterSpacing: {
        luxe: '0.18em',
        tightish: '-0.02em',
      },
      backdropBlur: {
        glass: '18px',
      },
      transitionTimingFunction: {
        luxe: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      maxWidth: {
        shell: '1600px',
      },
    },
  },
  plugins: [],
};
