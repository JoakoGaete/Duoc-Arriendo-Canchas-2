import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'

// Público
import Home from './pages/Home'
import Sedes from './pages/Sedes'
import Categories from './pages/Categories' // alias de sedes
import Canchas from './pages/Canchas'
import Offers from './pages/Offers'
import Cart from './pages/Cart' // carrito simple (opcional, pero útil para el anexo)
import Reserva from './pages/Reserva' // Checkout
import Confirmacion from './pages/Confirmacion'
import ErrorPago from './pages/ErrorPago'
import NotFound from './pages/NotFound'

// Admin
import AdminLayout from './pages/admin/AdminLayout'
import AdminCanchas from './pages/admin/AdminCanchas'
import AdminReservas from './pages/admin/AdminReservas'

import { ReservaProvider } from './context/ReservaContext'

export default function App() {
  return (
    <ReservaProvider>
      <Navbar />
      <main className="container py-4">
        <Routes>
          {/* Tienda */}
          <Route path="/" element={<Home />} />
          <Route path="/categorias" element={<Categories />} />
          <Route path="/sedes" element={<Sedes />} />
          <Route path="/sedes/:sedeId" element={<Canchas />} />
          <Route path="/ofertas" element={<Offers />} />
          <Route path="/carrito" element={<Cart />} />
          <Route path="/reserva" element={<Reserva />} />
          <Route path="/confirmacion" element={<Confirmacion />} />
          <Route path="/error" element={<ErrorPago />} />

          {/* Admin */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="canchas" replace />} />
            <Route path="canchas" element={<AdminCanchas />} />
            <Route path="reservas" element={<AdminReservas />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </ReservaProvider>
  )
}
