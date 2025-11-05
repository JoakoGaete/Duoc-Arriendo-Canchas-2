import { getUsuarioActivo, getReservasByUser } from "../data/db"

export default function Historial() {
  const usuario = getUsuarioActivo()

  if (!usuario) {
    return (
      <div className="text-center mt-5">
        <img
          src="/images/error.jpg"
          alt="Sin sesión iniciada"
          style={{ maxWidth: "400px", width: "100%", marginBottom: "20px" }}
        />
        <h3>¡Oops! Parece que no has iniciado sesión 😅</h3>
        <p>Inicia sesión para ver el historial de tus reservas.</p>
      </div>
    )
  }

  const reservas = getReservasByUser(usuario.email)

  if (reservas.length === 0) {
    return (
      <div className="text-center mt-5">
        <img
          src="/images/404.png"
          alt="Sin reservas"
          style={{ maxWidth: "350px", width: "100%", marginBottom: "20px" }}
        />
        <h4>Aún no tienes reservas registradas ⚽</h4>
        <p>¡Haz tu primera reserva y aparecerá aquí!</p>
      </div>
    )
  }

  return (
    <div className="container mt-4">
      <h2>Historial de reservas</h2>
      <div className="list-group mt-3">
        {reservas.map((r, i) => (
          <div key={i} className="list-group-item">
            <strong>{r.nombre}</strong> — {r.fecha} a las {r.hora}<br />
            <small>{r.canchaId} • Total: ${r.total.toLocaleString('es-CL')}</small>
          </div>
        ))}
      </div>
    </div>
  )
}

