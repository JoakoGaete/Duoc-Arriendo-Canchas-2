import { useParams, useNavigate, Link } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react' // <--- IMPORTAR useContext
import axios from 'axios'
import { CartContext } from '../context/CartContext' // <--- IMPORTAR EL CONTEXTO

export default function ProductDetail() {
  const { id } = useParams()
  const nav = useNavigate()
  const { addToCart } = useContext(CartContext) // <--- SACAMOS LA FUNCIÓN
  
  const [producto, setProducto] = useState(null)
  const [loading, setLoading] = useState(true)
  const [cantidad, setCantidad] = useState(1)
  const [imagenActiva, setImagenActiva] = useState(null)

  useEffect(() => {
    axios.get(`http://localhost:8084/api/products/${id}`)
      .then(res => {
        setProducto(res.data)
        setImagenActiva(res.data.imageUrl)
        setLoading(false)
      })
      .catch(err => {
        console.error("Error al cargar producto", err)
        setLoading(false)
      })
  }, [id])

  if (loading) return <div className="container mt-5 text-center py-5"><h3>Cargando...</h3></div>

  if (!producto) {
    return (
        <div className="container mt-5 text-center py-5">
            <h2>Producto no encontrado 😢</h2>
            <button onClick={() => nav('/')} className="btn btn-outline-primary mt-3">Volver al Home</button>
        </div>
    )
  }

  // --- FUNCIÓN REAL PARA AGREGAR ---
  const handleAddToCart = () => {
    addToCart(producto, cantidad) // Guardamos en el contexto
    // Pequeña alerta nativa para confirmar (o podrías usar Swal si lo instalas)
    alert(`¡Listo! Agregaste ${cantidad} ${producto.name} al carrito 🛒`)
  }

  return (
    <div className="container mt-4 mb-5">
      {/* Breadcrumbs */}
      <nav aria-label="breadcrumb" className="mb-4 bg-light p-3 rounded">
        <ol className="breadcrumb mb-0">
          <li className="breadcrumb-item"><Link to="/" className="text-decoration-none">Home</Link></li>
          <li className="breadcrumb-item"><Link to="/ofertas" className="text-decoration-none">Tienda</Link></li>
          <li className="breadcrumb-item active" aria-current="page">{producto.name}</li>
        </ol>
      </nav>

      <div className="row g-5">
        
        {/* COLUMNA IZQUIERDA: FOTO */}
        <div className="col-md-7 mb-4">
          <div className="card border-0 shadow-lg rounded-4 overflow-hidden p-4 bg-white d-flex align-items-center justify-content-center" style={{ height: '500px' }}>
            <img 
              src={imagenActiva} 
              alt={producto.name} 
              className="img-fluid"
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              onError={(e) => e.target.src = '/images/placeholder.png'}
            />
          </div>
        </div>

        {/* COLUMNA DERECHA: INFO */}
        <div className="col-md-5 align-self-center">
            <h6 className="text-primary fw-bold text-uppercase mb-2">{producto.category || 'Producto'}</h6>
            <h1 className="fw-bold display-6 mb-3">{producto.name}</h1>
            <h2 className="text-dark fw-bold mb-4">${producto.price?.toLocaleString('es-CL')}</h2>
            
            <p className="text-muted mb-4 lead" style={{ fontSize: '1.1rem' }}>
                {producto.description || 'Sin descripción disponible.'}
            </p>
            
            <hr className="my-4 opacity-25"/>

            <div className="d-flex align-items-center gap-3 mb-4">
              <div style={{width: '100px'}}>
                  <label className="form-label fw-bold small mb-1">Cantidad</label>
                  <select 
                      className="form-select fw-bold text-center py-2" 
                      value={cantidad} 
                      onChange={(e) => setCantidad(Number(e.target.value))}
                  >
                      {[1,2,3,4,5,10].map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
              </div>
              
              <button 
                  onClick={handleAddToCart}
                  className="btn btn-primary flex-grow-1 py-3 fw-bold text-uppercase shadow-sm rounded-3 mt-3"
              >
                  Añadir al carrito 🛒
              </button>
            </div>
            
            <div className="alert alert-success d-flex align-items-center" role="alert">
              <i className="bi bi-truck me-2"></i>
              <div>Envío disponible para <strong>Huechuraba</strong></div>
            </div>
        </div>
      </div>
    </div>
  )
}