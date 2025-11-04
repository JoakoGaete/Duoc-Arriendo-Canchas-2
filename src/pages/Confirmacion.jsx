import { useLocation } from 'react-router-dom'

export default function Confirmacion() {
  const location = useLocation()
  const email = location.state?.email

  return (
    <div className="text-center">
      <h2 className="text-success">¡Reserva confirmada!</h2>
      {email ? (
        <p>Te enviamos el detalle a tu correo: <strong>{email}</strong></p>
      ) : (
        <p>Te enviamos el detalle a tu correo.</p>
      )}
    </div>
  )
}

