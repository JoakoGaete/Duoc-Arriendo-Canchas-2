import { Link } from 'react-router-dom'

export default function PagoFallo() {
  return (
    <div className="container py-5 text-center">
      <div className="mb-4 text-danger">
        <i className="bi bi-x-circle-fill display-1"></i>
      </div>
      <h1 className="fw-bold mb-3">El pago ha fallado 😢</h1>
      <p className="lead text-muted">Hubo un problema al procesar tu tarjeta. No se ha realizado ningún cargo.</p>
      <div className="mt-5">
        <Link to="/carrito" className="btn btn-warning fw-bold me-2">Intentar de nuevo</Link>
        <Link to="/contacto" className="btn btn-outline-dark fw-bold">Contactar Soporte</Link>
      </div>
    </div>
  )
}