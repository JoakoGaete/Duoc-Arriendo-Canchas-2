import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],server: {
    port: 5173, // tu puerto de React
    proxy: {
      '/users': {
        target: 'http://localhost:8085', // microservicio de usuarios
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
