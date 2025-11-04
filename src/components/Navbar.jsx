import { Link, NavLink, useNavigate } from 'react-router-dom'
import { getUsuarioActivo, logout } from '../data/db'

export default function Navbar() {
  const navigate = useNavigate()
  const user = getUsuarioActivo()

  const handleLogout = () => {
    logout()
    navigate('/') // vuelve al inicio tras cerrar sesión
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">DUOC Canchas</Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div id="nav" className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto">
            <li className="nav-item"><NavLink className="nav-link" to="/categorias">Categorías</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/ofertas">Ofertas</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/reserva">Checkout</NavLink></li>

            
            {user?.rol === 'admin' && (
              <li className="nav-item"><NavLink className="nav-link" to="/admin">Admin</NavLink></li>
            )}
          </ul>

          <ul className="navbar-nav">
            <li className="nav-item"><NavLink className="nav-link" to="/carrito">🛒</NavLink></li>

            {/* 👇 Si hay sesión iniciada */}
            {user ? (
              <>
                <li className="nav-item">
                  <span className="nav-link">Hola, {user.nombre}</span>
                </li>
                <li className="nav-item">
                  <button onClick={handleLogout} className="btn btn-outline-light ms-2">Cerrar sesión</button>
                </li>
              </>
            ) : (
              // 👇 Si NO hay sesión
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">Iniciar sesión</NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}

  