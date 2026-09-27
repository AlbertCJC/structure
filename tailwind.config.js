/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // "Structural Minimalism" dark scale — low-chroma, deep, layered.
        void: '#07070b',
        abyss: '#0a0a12',
        panel: '#0d0d16',
        surface: '#11111b',
        raise: '#181826',
        line: 'rgba(255,255,255,0.07)',
        mist: '#9ba0b5',
        fog: '#666b82',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
    },
  },
  plugins: [],
}
