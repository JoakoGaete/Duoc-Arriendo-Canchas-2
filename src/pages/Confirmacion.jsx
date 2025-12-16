import { useLocation, Link } from 'react-router-dom'

export default function Confirmacion() {
  const location = useLocation()
  const email = location.state?.email

  return (
    <div className="container mt-5">
      <div className="card shadow-sm p-5 border-0 text-center" style={{ maxWidth: '600px', margin: '0 auto' }}>
        
        {/* Círculo verde de éxito */}
        <div className="mb-3 text-success">
          <svg width="80" height="80" fill="currentColor" className="bi bi-check-circle-fill" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
          </svg>
        </div>

        <h2 className="fw-bold text-dark">¡Reserva confirmada!</h2>
        
        <div className="mt-3">
          {email ? (
            <p className="lead fs-6">
              Te enviamos el detalle de tu reserva al correo:<br/>
              <strong className="text-primary">{email}</strong>
            </p>
          ) : (
            <p>Te enviamos el detalle a tu correo.</p>
          )}
        </div>

        <hr className="my-4" />

        <div className="d-grid gap-2 col-md-8 mx-auto">
          <Link to="/historial" className="btn btn-primary fw-bold">
            Ver mis reservas
          </Link>
          <Link to="/" className="btn btn-outline-secondary">
            Volver al inicio
          </Link>
        </div>

      </div>
    </div>
  )
}