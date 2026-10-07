/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gis: {
          darkest: '#080d1a',
          dark: '#0B132B',
          card: '#111c38',
          border: '#1E2D4A',
          muted: '#243452',
          surface: '#15223e',
          slate: '#475569',
          light: '#94a3b8',
          highlight: '#38bdf8',
        },
        ai: {
          cyan: '#06b6d4',
          blue: '#3b82f6',
          purple: '#8b5cf6',
        },
        status: {
          verified: '#10b981',
          review: '#f59e0b',
          anomaly: '#ef4444',
          candidate: '#3b82f6',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'SFMono-Regular', 'Consolas', 'monospace'],
      }
    },
  },
  plugins: [],
}
