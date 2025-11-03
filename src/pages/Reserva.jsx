import { useNavigate } from 'react-router-dom'
import { useReserva } from '../context/ReservaContext'
import { createReserva } from '../data/db'
import { useState } from 'react'

export default function Reserva() {
  const { seleccion, setFecha, setHora, setDatos, clear } = useReserva()
  const nav = useNavigate()
  const [msg, setMsg] = useState('')

  function onSubmit(e) {
    e.preventDefault()
    if (!seleccion.cancha) { setMsg('Elige una cancha desde la sede.'); return }
    if (!seleccion.fecha || !seleccion.hora) { setMsg('Selecciona fecha y hora.'); return }

    try {
      const total = seleccion.cancha.precioHora
      createReserva({
        canchaId: seleccion.cancha.id,
        sedeId: seleccion.sedeId,
        fecha: seleccion.fecha,
        hora: seleccion.hora,
        nombre: seleccion.datos.nombre,
        email: seleccion.datos.email,
        telefono: seleccion.datos.telefono,
        total
      })
      clear()
      nav('/confirmacion')
    } catch {
      nav('/error')
    }
  }

  return (
    <div className="row">
      <div className="col-12 col-md-6">
        <h2>Checkout</h2>

        {seleccion.cancha ? (
          <div className="alert alert-secondary">
            <strong>Cancha:</strong> {seleccion.cancha.nombre} • <strong>Precio:</strong> ${seleccion.cancha.precioHora.toLocaleString('es-CL')}
          </div>
        ) : (
          <div className="alert alert-warning">Primero elige una sede y una cancha.</div>
        )}

        <form className="vstack gap-2" onSubmit={onSubmit}>
          <input type="date" className="form-control" value={seleccion.fecha} onChange={e => setFecha(e.target.value)} required />
          <input type="time" className="form-control" value={seleccion.hora} onChange={e => setHora(e.target.value)} required />
          <input className="form-control" placeholder="Nombre" value={seleccion.datos.nombre} onChange={e => setDatos({ ...seleccion.datos, nombre: e.target.value })} required />
          <input className="form-control" type="email" placeholder="Email" value={seleccion.datos.email} onChange={e => setDatos({ ...seleccion.datos, email: e.target.value })} required />
          <input className="form-control" placeholder="Teléfono" value={seleccion.datos.telefono} onChange={e => setDatos({ ...seleccion.datos, telefono: e.target.value })} required />
          {msg && <div className="text-danger">{msg}</div>}
          <button className="btn btn-primary mt-2" type="submit">Confirmar reserva</button>
        </form>
      </div>
    </div>
  )
}
