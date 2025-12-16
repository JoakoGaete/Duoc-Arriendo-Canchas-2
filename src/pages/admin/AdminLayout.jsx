import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

export default function AdminLayout() {
  const { logout, user } = useContext(AuthContext) // <--- Aquí estaba el error (ahora tiene el =)
  const location = useLocation()
  const nav = useNavigate()

  const handleLogout = () => {
    logout()
    nav('/login')
  }

  // Función helper para saber si un link está activo (lo pinta azul)
  const getLinkClass = (path) => {
    return `nav-link ${location.pathname.includes(path) ? 'active bg-primary border-0 shadow-sm' : 'text-white'}`
  }

  return (
    <div className="d-flex min-vh-100 bg-light">

      {/* --- SIDEBAR IZQUIERDO --- */}
      <div className="bg-dark text-white p-3 d-flex flex-column" style={{ width: '260px', flexShrink: 0 }}>
        
        {/* Título del Panel */}
        <div className="mb-4 px-2 d-flex align-items-center gap-2">
           <div className="bg-primary rounded p-1"><i className="bi bi-shield-lock-fill text-white"></i></div>
           <h4 className="fw-bold m-0">AdminPanel</h4>
        </div>

        <div className="small text-white-50 mb-3 px-2 text-uppercase fw-bold" style={{fontSize: '0.75rem'}}>Menú Principal</div>

        {/* Lista de Enlaces */}
        <ul className="nav nav-pills flex-column mb-auto gap-2">
          
          <li className="nav-item">
            <Link to="/admin" className={`nav-link ${location.pathname === '/admin' ? 'active bg-primary' : 'text-white'}`}>
              <i className="bi bi-speedometer2 me-2"></i> Dashboard
            </Link>
          </li>
          
          <li>
            <Link to="/admin/canchas" className={getLinkClass('/admin/canchas')}>
              <i className="bi bi-geo-alt-fill me-2"></i> Canchas
            </Link>
          </li>
          
          <li>
            <Link to="/admin/reservas" className={getLinkClass('/admin/reservas')}>
              <i className="bi bi-calendar-check-fill me-2"></i> Reservas
            </Link>
          </li>
          
          <li>
            <Link to="/admin/productos" className={getLinkClass('/admin/productos')}>
              <i className="bi bi-box-seam-fill me-2"></i> Productos
            </Link>
          </li>

          {/* --- ENLACE DE USUARIOS --- */}
          <li>
            <Link to="/admin/usuarios" className={getLinkClass('/admin/usuarios')}>
              <i className="bi bi-people-fill me-2"></i> Usuarios
            </Link>
          </li>

        </ul>

        <hr className="border-secondary"/>

        {/* Botón Cerrar Sesión */}
        <div className="dropdown">
          <button className="btn btn-outline-light w-100 text-start d-flex align-items-center gap-2 border-0" onClick={handleLogout}>
             <div className="bg-danger rounded-circle d-flex align-items-center justify-content-center" style={{width:'30px', height:'30px'}}>
                <i className="bi bi-box-arrow-right small"></i>
             </div>
             <div className="overflow-hidden">
                <span className="d-block small fw-bold">Cerrar Sesión</span>
                <span className="d-block text-white-50 text-truncate" style={{fontSize: '0.75rem'}}>
                  {user?.email || 'Admin'}
                </span>
             </div>
          </button>
        </div>
      </div>

      {/* --- CONTENIDO PRINCIPAL --- */}
      <div className="flex-grow-1 overflow-auto bg-light">
        <Outlet />
      </div>

    </div>
  )
}