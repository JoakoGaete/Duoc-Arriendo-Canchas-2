import { Link, useNavigate } from 'react-router-dom'
import { listCanchas } from '../data/db'
import { useReserva } from '../context/ReservaContext'

export default function Home() {
  const { setSede, setCancha } = useReserva()
  const nav = useNavigate()
  const canchas = listCanchas() 

  function reservarRapido(c) {
    setSede(c.sedeId)
    setCancha(c)
    nav('/reserva')
  }

  return (
    <div>
      <div className="hero mb-4 shadow-sm">
        <img src="/images/home.jpg" alt="Canchas DUOC UC" className="rounded" style={{ display: 'block', margin: '0 auto', maxWidth: '100%', height: 'auto' }} />
      </div>

  
      <div className="d-flex justify-content-between align-items-center mb-2">
        <nav className="nav">
          <Link className="nav-link px-0 me-3" to="/categorias">Categorías</Link>
          <Link className="nav-link px-0 me-3" to="/ofertas">Ofertas</Link>
          <Link className="nav-link px-0 me-3" to="/blog">Blog</Link>
          <Link className="nav-link px-0" to="/contacto">Contacto</Link>
        </nav>
        <Link to="/historial" className="btn btn-success">Historial de reservas 📋</Link>
      </div>

      <h2 className="mb-3 text-center">Categorías</h2>

      
      <div className="row g-3">
        {canchas.map(c => (
          <div className="col-12 col-sm-6 col-md-4" key={c.id}>
            <div className="card h-100 shadow-sm">
              <img src={c.img} alt={c.nombre} className="thumb-400x200" />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{c.nombre}</h5>
                <p className="card-text mb-1">
                  Tipo: {c.tipo} • Precio: ${c.precioHora.toLocaleString('es-CL')}
                </p>
                <small className="text-muted">Sede: {c.sedeId.replaceAll('-', ' ')}</small>
                <div className="mt-auto d-flex gap-2">
                  <button className="btn btn-primary" onClick={() => reservarRapido(c)}>Reservar</button>
                  <Link to={`/sedes/${c.sedeId}`} className="btn btn-outline-secondary">Ver más</Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-4">
        <Link to="/sedes" className="btn btn-primary">Ver todas las categorías (sedes)</Link>
      </div>
    </div>
  )
}
