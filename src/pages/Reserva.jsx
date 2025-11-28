// src/pages/Reserva.jsx
import { useNavigate } from 'react-router-dom'
import { useReserva } from '../context/ReservaContext'
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function Reserva() {
  const { seleccion, setFecha, setHora, setDatos, clear } = useReserva()
  const nav = useNavigate()
  const [msg, setMsg] = useState('')
  const [usuarioActivo, setUsuarioActivo] = useState(null)

  // Al cargar la página, obtenemos el usuario activo desde el microservicio
  useEffect(() => {
    const fetchUsuarioActivo = async () => {
      try {
        const res = await axios.get('http://localhost:8085/users/activo', { withCredentials: true })
        setUsuarioActivo(res.data)
      } catch (err) {
        console.error('No hay usuario activo', err)
        setUsuarioActivo(null)
      }
    }
    fetchUsuarioActivo()
  }, [])

  const onSubmit = async (e) => {
    e.preventDefault()

    if (!seleccion.cancha) { setMsg('Elige una cancha desde la sede.'); return }
    if (!seleccion.fecha || !seleccion.hora) { setMsg('Selecciona fecha y hora.'); return }
    if (!/^\d+$/.test(seleccion.datos.telefono)) { setMsg('El teléfono debe contener solo números'); return }
    if (seleccion.datos.telefono.length < 8 || seleccion.datos.telefono.length > 10) {
      setMsg('verifique el largo de su numero celular'); return
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@(duocuc\.cl|profesorduoc\.cl)$/i
    if (!emailRegex.test(seleccion.datos.email)) { setMsg('El email debe ser @duocuc.cl o @profesorduoc.cl'); return }

    if (!usuarioActivo) {
      setMsg('Debes iniciar sesión antes de reservar')
      return
    }

    try {
      // Enviamos la reserva al microservicio de bookings
      await axios.post(
        'http://localhost:8083/api/bookings',
        {
          userId: usuarioActivo.id,
          fieldId: seleccion.cancha.id,
          date: seleccion.fecha,
          startTime: seleccion.hora
        },
        { withCredentials: true }
      )

      clear()
      nav('/confirmacion', { state: { email: usuarioActivo.email } })
    } catch (err) {
      console.error('Error al crear reserva', err)
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
          <input
            type="date"
            className="form-control"
            value={seleccion.fecha}
            onChange={e => setFecha(e.target.value)}
            required
          />
          <input
            type="time"
            className="form-control"
            value={seleccion.hora}
            onChange={e => setHora(e.target.value)}
            required
          />
          <input
            className="form-control"
            placeholder="Nombre"
            value={seleccion.datos.nombre}
            onChange={e => setDatos({ ...seleccion.datos, nombre: e.target.value })}
            required
          />
          <input
            className="form-control"
            type="email"
            placeholder="Email"
            value={seleccion.datos.email}
            onChange={e => setDatos({ ...seleccion.datos, email: e.target.value })}
            required
          />
          <input
            className="form-control"
            placeholder="Teléfono"
            value={seleccion.datos.telefono}
            onChange={e => setDatos({ ...seleccion.datos, telefono: e.target.value })}
            required
          />

          {msg && <div className="text-danger">{msg}</div>}

          <button className="btn btn-primary mt-2" type="submit">Confirmar reserva</button>
        </form>
      </div>
    </div>
  )
}
