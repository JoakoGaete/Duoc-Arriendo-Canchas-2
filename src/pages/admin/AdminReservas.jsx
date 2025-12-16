import { useState, useEffect } from 'react'
import axios from 'axios'

export default function AdminReservas() {
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  
  const refresh = async () => {
    setError(null)
    try {
      // Intentamos cargar TODAS las reservas.
      // NOTA: Asegúrate de que tu BookingController tenga un método findAll()
      // mapeado a GET /api/bookings (sin ID de usuario).
      const res = await axios.get('/api/bookings') 
      setItems(res.data)
    } catch (err) {
      console.error('Error al cargar reservas:', err)
      setError('Error al cargar reservas. (¿Tienes el endpoint GET /api/bookings habilitado?)')
    }
  }

  useEffect(() => {
    async function init() {
      setIsLoading(true)
      await refresh()
      setIsLoading(false)
    }
    init()
  }, [])

  const handleDelete = async (id) => {
    if (!confirm('¿Seguro que quieres cancelar esta reserva?')) return
    try {
      await axios.delete(`/api/bookings/${id}`)
      await refresh()
    } catch (err) {
      console.error('Error al eliminar reserva:', err)
      setError('No se pudo eliminar la reserva.')
    }
  }

  if (isLoading) return <div>Cargando reservas...</div>

  return (
    <div>
      <h3>Administrar Reservas</h3>
      {error && <div className="alert alert-warning">{error}</div>}

      {!items.length && <div className="alert alert-info">No hay reservas registradas en el sistema.</div>}

      <div className="table-responsive">
        <table className="table table-striped">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Cancha ID</th>
              <th>Usuario ID</th>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {items.map(r => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.fieldId}</td>
                <td>{r.userId}</td>
                <td>{r.date}</td>
                <td>{r.startTime}</td>
                <td>
                  <button 
                    className="btn btn-sm btn-danger" 
                    onClick={() => handleDelete(r.id)}
                  >
                    Cancelar / Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}