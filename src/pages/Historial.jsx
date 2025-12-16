import { useEffect, useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Link } from 'react-router-dom'

export default function Historial() {
  const { user } = useContext(AuthContext)
  const [compras, setCompras] = useState([])

  useEffect(() => {
    // Cargar historial del LocalStorage
    const historialGuardado = JSON.parse(localStorage.getItem('historial_compras')) || []
    
    // Filtrar solo las compras de ESTE usuario
    if (user) {
      const misCompras = historialGuardado.filter(pedido => pedido.cliente === user.email)
      // Ordenar por fecha (las más nuevas primero)
      setCompras(misCompras.reverse())
    }
  }, [user])

  if (!user) {
    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Cargando...</span>
            </div>
        </div>
    )
  }

  return (
    <div className="container my-5">
      
      {/* --- ENCABEZADO DE PÁGINA --- */}
      <div className="row mb-5 align-items-center">
        <div className="col-md-8">
            <h2 className="fw-bold display-6 text-dark">
                <i className="bi bi-clock-history me-3 text-primary"></i>Historial de Compras
            </h2>
            <p className="text-muted lead mb-0">Revisa el estado de tus reservas y pedidos recientes.</p>
        </div>
        <div className="col-md-4 text-md-end mt-3 mt-md-0">
            <Link to="/" className="btn btn-outline-dark rounded-pill px-4 fw-bold">
                <i className="bi bi-arrow-left me-2"></i>Volver al Inicio
            </Link>
        </div>
      </div>

      {compras.length === 0 ? (
        <div className="card border-0 shadow-sm rounded-4 text-center py-5 bg-light">
          <div className="card-body">
            <div className="mb-3 text-muted opacity-50">
                <i className="bi bi-bag-x display-1"></i>
            </div>
            <h3 className="fw-bold text-dark">Aún no tienes movimientos</h3>
            <p className="text-muted">Parece que no has realizado ninguna compra o reserva todavía.</p>
            <Link to="/ofertas" className="btn btn-primary btn-lg rounded-pill px-5 shadow mt-3 fw-bold">
                Explorar Ofertas
            </Link>
          </div>
        </div>
      ) : (
        <div className="row g-4">
          {compras.map((pedido) => (
            <div className="col-12" key={pedido.id}>
              <div className="card border-0 shadow rounded-4 overflow-hidden">
                
                {/* --- CABECERA DE LA ORDEN --- */}
                <div className="card-header bg-white border-bottom p-4">
                  <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                    <div className="d-flex align-items-center gap-3">
                        {/* Ícono según tipo */}
                        <div className={`p-3 rounded-circle d-flex align-items-center justify-content-center ${pedido.tipo === 'Reserva Cancha' ? 'bg-primary-subtle text-primary' : 'bg-warning-subtle text-warning-emphasis'}`} style={{width: '55px', height: '55px'}}>
                            <i className={`bi ${pedido.tipo === 'Reserva Cancha' ? 'bi-calendar-event' : 'bi-bag-check'} fs-4`}></i>
                        </div>
                        <div>
                            <h5 className="fw-bold mb-0 text-dark">Orden #{pedido.id}</h5>
                            <div className="text-muted small">
                                <i className="bi bi-calendar3 me-1"></i> {pedido.fecha} &bull; <i className="bi bi-clock me-1"></i> {pedido.hora}
                            </div>
                        </div>
                    </div>
                    <div>
                        <span className="badge bg-success rounded-pill px-3 py-2 text-uppercase fw-bold shadow-sm">
                            {pedido.estado || 'Pagado'} <i className="bi bi-check-lg ms-1"></i>
                        </span>
                    </div>
                  </div>
                </div>
                
                {/* --- LISTA DE PRODUCTOS --- */}
                <div className="card-body p-0">
                  <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                      <thead className="table-light small text-uppercase text-muted">
                        <tr>
                            <th className="ps-4 py-3">Producto / Servicio</th>
                            <th className="text-center">Cant.</th>
                            <th className="text-end pe-4">Precio</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pedido.productos.map((prod, index) => (
                          <tr key={index}>
                            <td className="ps-4 py-3">
                              <div className="d-flex align-items-center gap-3">
                                {/* IMAGEN MEJORADA (Cuadrada y con borde) */}
                                <div className="bg-light rounded-3 shadow-sm border p-1" style={{width: '70px', height: '70px'}}>
                                    <img 
                                        src={prod.imageUrl} 
                                        alt={prod.name} 
                                        className="w-100 h-100 object-fit-cover rounded-2"
                                        onError={e=>e.target.src='/images/placeholder.png'}
                                    />
                                </div>
                                <div>
                                    <h6 className="fw-bold mb-1 text-dark">{prod.name}</h6>
                                    <small className="text-muted">{pedido.sede || 'Tienda Online'}</small>
                                </div>
                              </div>
                            </td>
                            <td className="text-center fw-semibold text-secondary">x{prod.quantity}</td>
                            <td className="text-end pe-4 fw-bold text-dark">
                              ${prod.price?.toLocaleString('es-CL')}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                
                {/* --- FOOTER CON TOTAL --- */}
                <div className="card-footer bg-light p-4">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="text-muted small d-none d-md-block">
                        <i className="bi bi-credit-card me-2"></i>Pago realizado con <strong>WebPay</strong>
                    </div>
                    <div className="d-flex align-items-center gap-3">
                        <span className="text-muted fs-5">Total Pagado:</span>
                        <span className="fs-2 fw-bold text-primary">${pedido.total?.toLocaleString('es-CL')}</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}