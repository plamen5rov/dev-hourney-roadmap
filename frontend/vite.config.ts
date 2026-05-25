import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  optimizeDeps: {
    include: ['html2canvas'],
  },
  server: {
    proxy: {
      '/api': 'http://localhost:8000',
    },
  },
})
