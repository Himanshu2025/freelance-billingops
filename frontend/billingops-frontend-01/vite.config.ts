import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      // In dev, all /api requests are proxied to the backend.
      // This avoids browser CORS restrictions entirely.
      '/api': {
        target: 'https://freelance-billingops-1.onrender.com',
        changeOrigin: true,
        secure: true,
      },
    },
  },
})
