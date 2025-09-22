import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // local dev server
  },
  build: {
    outDir: 'dist',
  },
  base: '/myexpense/', // 👈 set to WAR context path
})
