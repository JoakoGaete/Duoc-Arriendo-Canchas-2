import { Link, useLocation } from 'react-router-dom'

export default function PagoExito() {
  const location = useLocation()
  const nroOrden = location.state?.nroOrden || '0000'

  return (
    <div className="container py-5 text-center">
      <div className="mb-4 text-success">
        <i className="bi bi-check-circle-fill display-1"></i>
      </div>
      <h1 className="fw-bold mb-3">¡Pago Exitoso! 🎉</h1>
      <p className="lead text-muted">Tu pedido ha sido procesado correctamente.</p>
      <div className="alert alert-success d-inline-block px-5">
        <strong>Nro. de Orden: #{nroOrden}</strong>
      </div>
      <div className="mt-5">
        <Link to="/" className="btn btn-primary fw-bold me-2">Volver al Inicio</Link>
        <Link to="/historial" className="btn btn-outline-dark fw-bold">Ver mis Compras</Link>
      </div>
    </div>
  )
}