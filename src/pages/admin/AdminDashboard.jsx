import { Link } from 'react-router-dom'

export default function AdminDashboard() {
  return (
    <div className="container-fluid p-4">
      <h2 className="fw-bold mb-4">Panel de Control</h2>
      <p className="text-muted mb-5">Resumen de actividad de CanchasDUOC</p>

      {/* --- TARJETAS DE ESTADÍSTICAS --- */}
      <div className="row g-4 mb-5">
        <div className="col-md-4">
          <div className="card bg-primary text-white border-0 shadow h-100 p-3">
            <div className="card-body">
              <h6 className="text-uppercase opacity-75 small fw-bold">Reservas del Mes</h6>
              <h2 className="display-4 fw-bold mb-0">124</h2>
              <small>↗ 20% más que el mes pasado</small>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card bg-success text-white border-0 shadow h-100 p-3">
            <div className="card-body">
              <h6 className="text-uppercase opacity-75 small fw-bold">Ingresos Totales</h6>
              <h2 className="display-4 fw-bold mb-0">$ 2.540.000</h2>
              <small>Incluye arriendos y tienda</small>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card bg-warning text-white border-0 shadow h-100 p-3">
            <div className="card-body">
              <h6 className="text-uppercase opacity-75 small fw-bold">Usuarios Nuevos</h6>
              <h2 className="display-4 fw-bold mb-0">890</h2>
              <small>Registrados este año</small>
            </div>
          </div>
        </div>
      </div>

      {/* --- GESTIÓN RÁPIDA --- */}
      <h4 className="fw-bold mb-3">Gestión Rápida</h4>
      <div className="row g-4">
        
        {/* Canchas */}
        <div className="col-md-3">
          <div className="card border-0 shadow-sm h-100 text-center p-4">
            <div className="card-body">
              <div className="bg-light rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" style={{width: '60px', height: '60px'}}>
                <i className="bi bi-globe fs-3 text-primary"></i>
              </div>
              <h5 className="fw-bold">Canchas</h5>
              <p className="text-muted small">Administrar precios y disponibilidad.</p>
              <Link to="/admin/canchas" className="btn btn-outline-dark w-100 mt-2">Ir a Canchas</Link>
            </div>
          </div>
        </div>

        {/* Reservas */}
        <div className="col-md-3">
          <div className="card border-0 shadow-sm h-100 text-center p-4">
            <div className="card-body">
              <div className="bg-light rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" style={{width: '60px', height: '60px'}}>
                <i className="bi bi-calendar-check fs-3 text-primary"></i>
              </div>
              <h5 className="fw-bold">Reservas</h5>
              <p className="text-muted small">Ver historial y cancelaciones.</p>
              <Link to="/admin/reservas" className="btn btn-outline-dark w-100 mt-2">Ir a Reservas</Link>
            </div>
          </div>
        </div>

        {/* --- TIENDA (ACTIVADO) --- */}
        <div className="col-md-3">
          <div className="card border-0 shadow-sm h-100 text-center p-4">
            <div className="card-body">
              <div className="bg-light rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" style={{width: '60px', height: '60px'}}>
                <i className="bi bi-cart fs-3 text-danger"></i>
              </div>
              <h5 className="fw-bold">Tienda</h5>
              <p className="text-muted small">Gestionar bebidas y snacks.</p>
              {/* AQUÍ ESTÁ EL CAMBIO: LINK A PRODUCTOS */}
              <Link to="/admin/productos" className="btn btn-primary w-100 mt-2 fw-bold">
                Gestionar Productos
              </Link>
            </div>
          </div>
        </div>

        {/* Reportes */}
        <div className="col-md-3">
          <div className="card border-0 shadow-sm h-100 text-center p-4">
            <div className="card-body">
              <div className="bg-light rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" style={{width: '60px', height: '60px'}}>
                <i className="bi bi-graph-up fs-3 text-primary"></i>
              </div>
              <h5 className="fw-bold">Reportes</h5>
              <p className="text-muted small">Descargar Excel de ventas.</p>
              <button className="btn btn-outline-secondary w-100 mt-2" disabled>Ver Reportes</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}