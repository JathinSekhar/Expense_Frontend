import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // local dev port
  },
  build: {
    outDir: 'dist', // default build folder for Docker/Nginx
  },
  base: '/', // 👈 important for correct asset paths in production
})
