import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useReserva } from '../context/ReservaContext'

export default function Offers() {
  const [canchas, setCanchas] = useState([])
  const [productos, setProductos] = useState([])
  const nav = useNavigate()
  const { setSede, setCancha } = useReserva()

  // 1. Cargar Canchas
  useEffect(() => {
    axios.get('/api/fields')
      .then(res => setCanchas(res.data))
      .catch(err => console.error("Error cargando canchas", err))
  }, [])

  // 2. Cargar Productos (Desde el microservicio en puerto 8084)
  useEffect(() => {
    axios.get('http://localhost:8084/api/products')
      .then(res => setProductos(res.data))
      .catch(err => console.error("Error cargando productos", err))
  }, [])

  // Función para arreglar la ruta de la imagen (Igual que en Home)
  const obtenerImagen = (imgDelBackend) => {
    if (!imgDelBackend) return '/images/placeholder.png';
    if (imgDelBackend.includes('/images/')) return imgDelBackend;
    return `/images/${imgDelBackend}.png`;
  }

  const reservar = (c) => {
    setSede(c.location || 'Sede Principal')
    setCancha(c)
    nav('/reserva')
  }

  return (
    <div className="container my-5">
      
      {/* Título Principal */}
      <div className="text-center mb-5">
        <h1 className="fw-bold text-uppercase display-5">🔥 Ofertas Especiales</h1>
        <p className="text-muted lead">Descuentos exclusivos para miembros del club</p>
      </div>

      {/* --- SECCIÓN 1: CANCHAS EN OFERTA --- */}
      <div className="mb-5">
        <h3 className="fw-bold mb-4 text-primary"><i className="bi bi-calendar-check me-2"></i>Canchas Disponibles</h3>
        <div className="row g-4">
          {canchas.map(c => (
            <div className="col-12 col-md-6 col-lg-4" key={c.id}>
              <div className="card h-100 border-0 shadow-sm overflow-hidden">
                {/* IMAGEN DE CANCHA CORREGIDA */}
                <img 
                  src={obtenerImagen(c.img)} 
                  alt={c.nombre} 
                  className="card-img-top"
                  style={{ height: '220px', objectFit: 'cover' }}
                  onError={(e) => e.target.src = '/images/placeholder.png'}
                />
                <div className="card-body">
                  <h5 className="fw-bold">{c.nombre}</h5>
                  <p className="small text-muted mb-2">{c.tipo} - {c.location}</p>
                  
                  {/* Precio Oferta (Simulado visualmente) */}
                  <div className="d-flex align-items-center gap-2 mb-3">
                     <span className="text-decoration-line-through text-muted small">${(c.precioHora * 1.2).toLocaleString('es-CL')}</span>
                     <span className="text-danger fw-bold fs-5">${c.precioHora.toLocaleString('es-CL')}</span>
                  </div>

                  <button onClick={() => reservar(c)} className="btn btn-success w-100 fw-bold">
                    Reservar en Oferta
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- SECCIÓN 2: PRODUCTOS --- */}
      <div className="pt-5 border-top">
        <h3 className="fw-bold mb-4 text-primary"><i className="bi bi-bag-heart me-2"></i>Productos Destacados</h3>
        
        {productos.length === 0 ? (
            <p className="text-muted">Cargando ofertas de productos...</p>
        ) : (
            <div className="row g-4">
            {productos.map(prod => (
                <div className="col-6 col-md-3" key={prod.id}>
                    <div className="card h-100 border-0 shadow-sm hover-effect">
                        {/* IMAGEN DE PRODUCTO CORREGIDA (CONTAIN) */}
                        <div className="p-3 bg-white d-flex align-items-center justify-content-center" style={{height: '180px'}}>
                            <img 
                                src={prod.imageUrl}
                                alt={prod.name} 
                                style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                                onError={(e) => e.target.src = '/images/placeholder.png'}
                            />
                        </div>
                        
                        <div className="card-body text-center bg-light">
                            <h6 className="card-title fw-bold text-truncate">{prod.name}</h6>
                            <div className="mb-2">
                                <span className="badge bg-danger">OFF %</span>
                            </div>
                            <h5 className="text-dark fw-bold">${prod.price?.toLocaleString('es-CL')}</h5>
                            
                            <Link to={`/productos/${prod.id}`} className="btn btn-outline-dark btn-sm w-100 mt-2">
                                Ver Detalle
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
            </div>
        )}
      </div>

    </div>
  )
}