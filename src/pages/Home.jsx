import { Link, useNavigate } from 'react-router-dom'
import { useReserva } from '../context/ReservaContext'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Home() {
  const { setSede, setCancha } = useReserva()
  const nav = useNavigate()
  
  const [canchas, setCanchas] = useState([])
  const [productos, setProductos] = useState([])
  const [error, setError] = useState('')

  // 1. Cargar Canchas
  useEffect(() => {
    axios.get('/api/fields')
      .then(res => setCanchas(res.data))
      .catch(err => {
        console.error('Error cargando canchas:', err)
        setError('No se pudieron cargar las canchas.')
      })
  }, [])

  // 2. Cargar Productos
  useEffect(() => {
    axios.get('http://localhost:8084/api/products') 
      .then(res => setProductos(res.data))
      .catch(err => console.error("Error cargando productos:", err))
  }, [])

  function reservarRapido(c) {
    setSede(c.location || 'Sede Principal')
    setCancha(c)
    nav('/reserva', { state: { canchaSeleccionada: c } })
  }

  const obtenerImagen = (imgDelBackend) => {
    if (!imgDelBackend) return '/images/placeholder.png';
    if (imgDelBackend.includes('/images/')) return imgDelBackend;
    return `/images/${imgDelBackend}.png`;
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      
      <div className="container flex-grow-1 mt-4">

        {/* HERO */}
        <div className="hero mb-5 shadow-sm">
          <img
            src="/images/home.jpg"
            alt="Canchas DUOC UC"
            className="rounded w-100" 
            style={{ height: 'auto', objectFit: 'cover' }}
            onError={(e) => e.target.style.display = 'none'} 
          />
        </div>

        {/* --- SECCIÓN 1: CANCHAS --- */}
        <div className="mb-5">
            <h2 className="text-center fw-bold text-primary mb-4">Canchas Disponibles</h2>
            {error && <div className="alert alert-danger text-center">{error}</div>}
            
            <div className="row g-4 justify-content-center">
            {canchas.map(c => {
                const rutaFinal = obtenerImagen(c.img);
                return (
                <div className="col-12 col-sm-6 col-md-4" key={c.id}>
                    <div className="card h-100 shadow-sm border-0 overflow-hidden">
                    <img
                        src={rutaFinal} 
                        alt={c.nombre}
                        className="card-img-top"
                        style={{ height: '220px', objectFit: 'cover' }} 
                        onError={(e) => e.target.src = '/images/placeholder.png'} 
                    />
                    <div className="card-body d-flex flex-column">
                        <h5 className="card-title fw-bold text-dark">{c.nombre || 'Cancha sin nombre'}</h5>
                        <p className="card-text mb-2 text-muted small">{c.tipo || 'Fútbol'}</p>
                        <h6 className="text-primary fw-bold mb-3">${c.precioHora ? c.precioHora.toLocaleString('es-CL') : '0'} / hora</h6>
                        
                        <div className="mt-auto d-grid gap-2">
                        {/* BOTÓN ÚNICO: RESERVAR AHORA */}
                        <button className="btn btn-primary fw-bold py-2" onClick={() => reservarRapido(c)}>Reservar Ahora</button>
                        {/* Se eliminó el botón "Ver Detalles" */}
                        </div>
                    </div>
                    </div>
                </div>
                )
            })}
            </div>
        </div>

        {/* --- SECCIÓN 2: TIENDA --- */}
        <div className="py-5 border-top">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold text-dark">Nuestros Productos ⚡</h2>
                <Link to="/ofertas" className="text-primary text-decoration-none fw-bold">Ver todo &rarr;</Link>
            </div>

            {productos.length === 0 ? (
                <p className="text-center text-muted">Cargando productos...</p>
            ) : (
                <div className="row g-4">
                    {productos.map(prod => (
                        <div className="col-6 col-md-3" key={prod.id}>
                            <div className="card h-100 border-0 shadow-sm hover-effect">
                                <div className="p-3" style={{
                                    height: '200px', 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center',
                                    backgroundColor: '#fff' 
                                }}>
                                    <img 
                                        src={prod.imageUrl}
                                        alt={prod.name} 
                                        style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                                        onError={(e) => e.target.src = '/images/placeholder.png'}
                                    />
                                </div>
                                
                                <div className="card-body p-3 text-center bg-light">
                                    <h6 className="card-title fw-bold mb-1 text-truncate">{prod.name}</h6>
                                    <p className="text-primary fw-bold mb-2">${prod.price?.toLocaleString('es-CL')}</p>
                                    
                                    <Link to={`/productos/${prod.id}`} className="btn btn-sm btn-outline-dark w-100">
                                        Ver +
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>

      </div>

      <footer className="bg-dark text-white text-center py-4 mt-auto">
        <div className="container">
            <h5 className="mb-1">CanchasDUOC</h5>
            <small className="text-white-50">© {new Date().getFullYear()} Todos los derechos reservados.</small>
        </div>
      </footer>
    </div>
  )
}