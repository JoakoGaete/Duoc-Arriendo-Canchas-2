import { Link, useNavigate } from 'react-router-dom'
import { useReserva } from '../context/ReservaContext'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Home() {
  const { setSede, setCancha } = useReserva()
  const nav = useNavigate()
  const [canchas, setCanchas] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchCanchas() {
      try {
        const res = await axios.get('http://localhost:8082/api/fields')
        setCanchas(res.data)
      } catch (err) {
        console.error('Error cargando canchas:', err)
        setError('No se pudieron cargar las canchas.')
      }
    }
    fetchCanchas()
  }, [])

  function reservarRapido(c) {
    setSede(c.location || 'default-sede')
    setCancha(c)
    nav('/reserva')
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Hero */}
      <div className="hero mb-4 shadow-sm">
        <img
          src="/images/home.jpg"
          alt="Canchas DUOC UC"
          className="rounded"
          style={{ display: 'block', margin: '0 auto', maxWidth: '100%', height: 'auto' }}
        />
      </div>

      {/* Navegación */}
      <div className="d-flex justify-content-between align-items-center mb-2">
        <nav className="nav">
          <Link className="nav-link px-0 me-3" to="/categorias">Categorías</Link>
          <Link className="nav-link px-0 me-3" to="/ofertas">Ofertas</Link>
          <Link className="nav-link px-0 me-3" to="/blog">Blog</Link>
          <Link className="nav-link px-0 me-3" to="/contacto">Contacto</Link>
        </nav>
        <Link to="/historial" className="btn btn-success">Historial de reservas 📋</Link>
      </div>

      <h2 className="mb-3 text-center">Canchas disponibles</h2>

      {error && <div className="alert alert-danger text-center">{error}</div>}

      <div className="row g-3 flex-grow-1">
        {canchas.map(c => {
          
          const imgSrc = c.imageUrl 
            ?  `/images/${c.imageUrl}.png`
            : `/images/placeholder.png` 
          
          return (
            <div className="col-12 col-sm-6 col-md-4" key={c.id}>
              <div className="card h-100 shadow-sm">
                <img
                  src={imgSrc}
                  alt={c.name}
                  className="thumb-400x200"
                  onError={(e) => { e.target.src = '/images/placeholder.jpg' }} // fallback
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{c.name}</h5>
                  <p className="card-text mb-1">
                    Tipo: {c.type || 'N/A'} • Precio: ${c.pricePerHour?.toLocaleString('es-CL') || '0'}
                  </p>
                  <small className="text-muted">Sede: {c.location || 'Desconocida'}</small>
                  <div className="mt-auto d-flex gap-2">
                    <button className="btn btn-primary" onClick={() => reservarRapido(c)}>
                      Reservar
                    </button>
                    <Link to={`/sedes/${c.location || 'default'}`} className="btn btn-outline-secondary">
                      Ver más
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="text-center mt-4">
        <Link to="/sedes" className="btn btn-primary">Ver todas las categorías (sedes)</Link>
      </div>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-4 mt-4">
        <h5>CanchasDUOC</h5>
        <p>Síguenos en nuestras redes:</p>
        <div className="d-flex justify-content-center gap-3 mb-2">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white">Facebook</a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white">Instagram</a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white">Twitter</a>
        </div>
        <small>© {new Date().getFullYear()} CanchasDUOC. Todos los derechos reservados.</small>
      </footer>

      
    </div>
  )
}




