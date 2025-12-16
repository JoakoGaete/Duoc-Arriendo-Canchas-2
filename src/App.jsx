import { Routes, Route } from 'react-router-dom'

// --- Contextos (Proveedores de datos) ---
import { ReservaProvider } from './context/ReservaContext'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'

// --- Componentes Globales ---
import Navbar from './components/Navbar'

// --- Páginas Públicas ---
import Home from './pages/Home'
import Login from './pages/Login'
import Registro from './pages/Registro'
import Canchas from './pages/Canchas'
import Historial from './pages/Historial'
import Reserva from './pages/Reserva'
import Sedes from './pages/Sedes'
import NotFound from './pages/NotFound'
import Confirmacion from './pages/Confirmacion'
import Categories from './pages/Categories'
import Offers from './pages/Offers'
import Contacto from './pages/Contacto'
import Blog from './pages/Blog'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'

// --- Páginas de Pago ---
import Checkout from './pages/Checkout'
import PagoExito from './pages/PagoExito'
import PagoFallo from './pages/PagoFallo'

// --- Páginas de Admin ---
import AdminLayout from './pages/admin/AdminLayout'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminCanchas from './pages/admin/AdminCanchas'
import AdminReservas from './pages/admin/AdminReservas'
import AdminProducts from './pages/admin/AdminProducts'
import AdminProductForm from './pages/admin/AdminProductForm'

// --- GESTIÓN DE USUARIOS (NUEVO) ---
import AdminUsers from './pages/admin/AdminUsers'
import AdminUserForm from './pages/admin/AdminUserForm'

function App() {
  return (
    <AuthProvider>
      <ReservaProvider>
        <CartProvider>

          <div className="App d-flex flex-column min-vh-100">
            <Navbar />

            <div className="flex-grow-1">
              <Routes>
                {/* ================= RUTAS PÚBLICAS ================= */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/registro" element={<Registro />} />
                <Route path="/canchas" element={<Canchas />} />
                <Route path="/historial" element={<Historial />} />
                <Route path="/reserva" element={<Reserva />} />
                <Route path="/confirmacion" element={<Confirmacion />} />
                <Route path="/sedes" element={<Sedes />} />
                <Route path="/sedes/:sedeId" element={<Canchas />} />
                <Route path="/categorias" element={<Categories />} />
                <Route path="/ofertas" element={<Offers />} />
                <Route path="/contacto" element={<Contacto />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/productos/:id" element={<ProductDetail />} />

                {/* --- FLUJO DE COMPRA --- */}
                <Route path="/carrito" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/pago-exito" element={<PagoExito />} />
                <Route path="/pago-fallo" element={<PagoFallo />} />

                {/* ================= RUTAS ADMIN ================= */}
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="canchas" element={<AdminCanchas />} />
                  <Route path="reservas" element={<AdminReservas />} />

                  {/* Gestión de Productos */}
                  <Route path="productos" element={<AdminProducts />} />
                  <Route path="productos/nuevo" element={<AdminProductForm />} />
                  <Route path="productos/editar/:id" element={<AdminProductForm />} />

                  {/* Gestión de Usuarios (NUEVO) */}
                  <Route path="usuarios" element={<AdminUsers />} />
                  <Route path="usuarios/nuevo" element={<AdminUserForm />} />
                  <Route path="usuarios/editar/:id" element={<AdminUserForm />} />
                </Route>

                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </div>

        </CartProvider>
      </ReservaProvider>
    </AuthProvider>
  )
}

export default App