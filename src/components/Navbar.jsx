import { Link, NavLink } from 'react-router-dom'

export default function Navbar() {
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
            <li className="nav-item"><NavLink className="nav-link" to="/admin">Admin</NavLink></li>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item"><NavLink className="nav-link" to="/carrito">🛒</NavLink></li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
  