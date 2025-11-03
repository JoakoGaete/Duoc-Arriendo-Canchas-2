import { useState } from 'react'
import { listReservas, deleteReserva } from '../../data/db'

export default function AdminReservas() {
  const [items, setItems] = useState(listReservas())
  function refresh() { setItems(listReservas()) }

  return (
    <div>
      <h3>Reservas</h3>
      {!items.length && <p>No hay reservas aún.</p>}
      <div className="table-responsive">
        <table className="table table-sm">
          <thead><tr><th>ID</th><th>Sede</th><th>Cancha</th><th>Fecha</th><th>Hora</th><th>Nombre</th><th>Total</th><th></th></tr></thead>
          <tbody>
            {items.map(r => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.sedeId}</td>
                <td>{r.canchaId}</td>
                <td>{r.fecha}</td>
                <td>{r.hora}</td>
                <td>{r.nombre}</td>
                <td>${r.total.toLocaleString('es-CL')}</td>
                <td><button className="btn btn-sm btn-outline-danger" onClick={() => { deleteReserva(r.id); refresh() }}>Eliminar</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
