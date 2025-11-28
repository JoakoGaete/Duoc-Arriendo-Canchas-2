import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useReserva } from '../context/ReservaContext' // usamos contexto

export default function Navbar() {
  const navigate = useNavigate()
  const { usuarioActivo, setUsuarioActivo } = useReserva() // obtenemos usuario activo del contexto

  const handleLogout = () => {
    setUsuarioActivo(null) // limpiamos el usuario activo en el contexto
    navigate('/')           // vuelve al inicio tras cerrar sesión
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">⚽️DUOC Canchas⚽️</Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div id="nav" className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto">
            <li className="nav-item"><NavLink className="nav-link" to="/categorias">Categorías</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/ofertas">Ofertas</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/contacto">Contacto</NavLink></li>

            {usuarioActivo?.isAdmin && (
              <li className="nav-item"><NavLink className="nav-link" to="/admin">Admin</NavLink></li>
            )}
          </ul>

          <ul className="navbar-nav">
            <li className="nav-item"><NavLink className="nav-link" to="/Historial">📋</NavLink></li>

            {/* 👇 Si hay sesión iniciada */}
            {usuarioActivo ? (
              <>
                <li className="nav-item">
                  <span className="nav-link">Hola, {usuarioActivo.name}</span>
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
