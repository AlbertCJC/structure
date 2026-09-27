import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Host binding is required so the preview proxy can reach the dev server.
// `allowedHosts: true` whitelists the preview subdomain that proxies here.
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    allowedHosts: true,
  },
  build: {
    rollupOptions: {
      output: {
        // Split long-lived vendor code from the catalog so library edits
        // never invalidate the framework chunk in the browser cache.
        manualChunks: {
          vendor: ['react', 'react-dom', 'framer-motion', 'gsap', 'zustand'],
        },
      },
    },
  },
})
