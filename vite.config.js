import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // tu puerto de React
    proxy: {
      // Proxy para el microservicio de Usuarios (ya existía)
      '/users': {
        target: 'http://localhost:8085', 
        changeOrigin: true,
        secure: false,
      },
      // Proxy para el microservicio de Canchas (Field-Service)
      '/api/fields': {
        target: 'http://localhost:8082', // Puerto del Field-Service
        changeOrigin: true,
        secure: false,
      },
      // Proxy para el microservicio de Reservas (Booking-Service)
      '/api/bookings': {
        target: 'http://localhost:8083', // Puerto del Booking-Service
        changeOrigin: true,
        secure: false,
      },
    },
  },
})