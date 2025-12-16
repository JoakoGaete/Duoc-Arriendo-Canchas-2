import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { CartContext } from '../context/CartContext'

export default function Navbar() {
  const { user, logout } = useContext(AuthContext)
  const { totalItems } = useContext(CartContext)
  const nav = useNavigate()

  const handleLogout = () => {
    logout()
    nav('/login')
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm py-3" style={{ zIndex: 1000 }}>
      <div className="container">
        
        {/* LOGO */}
        <Link className="navbar-brand fw-bold fs-4 d-flex align-items-center gap-2" to="/">
          <span className="text-warning">Canchas</span>DUOC
        </Link>

        {/* BOTÓN MÓVIL */}
        <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          
          {/* ENLACES CENTRALES */}
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-3 fw-semibold">
            <li className="nav-item"><Link className="nav-link text-white" to="/">Inicio</Link></li>
            <li className="nav-item"><Link className="nav-link text-white-50 hover-text-white" to="/categorias">Catálogo</Link></li>
            <li className="nav-item"><Link className="nav-link text-white-50 hover-text-white" to="/ofertas">Ofertas</Link></li>
            <li className="nav-item"><Link className="nav-link text-white-50 hover-text-white" to="/contacto">Nosotros</Link></li>
            <li className="nav-item"><Link className="nav-link text-white-50 hover-text-white" to="/blog">Blog</Link></li>
          </ul>

          <div className="d-flex gap-3 align-items-center">
            
            {/* --- ÍCONO DEL CARRITO (CORREGIDO PARA VERSE BIEN) --- */}
            {/* Usamos 'btn-warning' (amarillo) para que contraste con el fondo negro */}
            <Link to="/carrito" className="btn btn-warning position-relative border-0 d-flex align-items-center justify-content-center" style={{ width: '45px', height: '45px', borderRadius: '50%' }}>
              <i className="bi bi-cart-fill fs-5 text-dark"></i>
              {totalItems > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger border border-light">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* ZONA DE USUARIO */}
            {user ? (
              <div className="dropdown">
                <button 
                  className="btn btn-outline-light dropdown-toggle d-flex align-items-center gap-2 border-0" 
                  type="button" data-bs-toggle="dropdown" aria-expanded="false"
                >
                  <div className="bg-light text-dark rounded-circle d-flex align-items-center justify-content-center fw-bold" 
                       style={{width: '35px', height: '35px'}}>
                    {user.nombre ? user.nombre.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div className="text-start lh-1 d-none d-lg-block">
                    <span className="d-block small text-white-50">Hola,</span>
                    <span className="fw-bold">{user.nombre || 'Usuario'}</span>
                  </div>
                </button>
                <ul className="dropdown-menu dropdown-menu-end shadow-lg border-0 mt-2">
                  <li><h6 className="dropdown-header">Mi Cuenta</h6></li>
                  {user.role === 'admin' && (
                     <li><Link className="dropdown-item" to="/admin"><i className="bi bi-speedometer2 me-2"></i>Panel Admin</Link></li>
                  )}
                  <li><Link className="dropdown-item" to="/historial"><i className="bi bi-calendar-check me-2"></i>Mis Reservas</Link></li>
                  <li><hr className="dropdown-divider"/></li>
                  <li>
                    <button className="dropdown-item text-danger fw-bold" onClick={handleLogout}>
                      <i className="bi bi-box-arrow-right me-2"></i>Cerrar Sesión
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="d-flex gap-2">
                <Link to="/login" className="btn btn-outline-light fw-bold px-3 rounded-pill btn-sm">Ingresar</Link>
                <Link to="/registro" className="btn btn-primary fw-bold px-3 rounded-pill btn-sm">Registro</Link>
              </div>
            )}
          </div>

        </div>
      </div>
    </nav>
  )
}