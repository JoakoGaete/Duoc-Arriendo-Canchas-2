import { useState, useEffect } from 'react'
import axios from 'axios'

export default function AdminCanchas() {
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  
  // Formulario inicial
  const [form, setForm] = useState({
    nombre: '',
    tipo: 'Fútbol 7 vs 7 - Techada', // Valor por defecto válido
    precioHora: 15000,
    img: '/images/canchas/placeholder.png', // Ruta por defecto
    location: 'Sede Principal'
  })

  // Cargar canchas desde el microservicio
  const refresh = async () => {
    setError(null)
    try {
      const res = await axios.get('/api/fields')
      setItems(res.data)
    } catch (err) {
      console.error('Error al cargar canchas:', err)
      setError('No se pudieron cargar las canchas. Verifica que el Field Service esté corriendo.')
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

  // CREAR CANCHA
  const add = async (e) => {
    e.preventDefault()
    setError(null)
    try {
      // Enviamos al backend
      await axios.post('/api/fields', {
        nombre: form.nombre,
        tipo: form.tipo,
        precioHora: Number(form.precioHora),
        img: form.img,
        location: form.location
      })
      
      // Limpiamos form y recargamos
      setForm({ ...form, nombre: '', precioHora: 15000 })
      await refresh()
    } catch (err) {
      console.error('Error al crear cancha:', err)
      setError('No se pudo crear la cancha.')
    }
  }

  // ELIMINAR CANCHA
  const handleDelete = async (id) => {
    if (!confirm('¿Estás seguro de eliminar esta cancha?')) return
    try {
      await axios.delete(`/api/fields/${id}`)
      await refresh()
    } catch (err) {
      console.error('Error al eliminar:', err)
      setError('No se pudo eliminar la cancha.')
    }
  }

  // ACTUALIZAR CANCHA (Edición rápida)
  const handleUpdate = async (id, field, value) => {
    // 1. Buscamos la cancha actual en la lista para no perder los otros datos
    const canchaActual = items.find(c => c.id === id);
    if (!canchaActual) return;

    // 2. Preparamos el objeto con el cambio
    const updatedCancha = {
        ...canchaActual,
        [field]: field === 'precioHora' ? Number(value) : value
    };

    try {
      // NOTA: Tu FieldController debe tener un PUT mapeado a /{id}
      await axios.put(`/api/fields/${id}`, updatedCancha)
      await refresh() // Recargamos para ver cambios confirmados
    } catch (err) {
      console.error('Error al actualizar:', err)
      // setError('No se pudo actualizar. Verifica que tu backend soporte PUT.')
    }
  }

  if (isLoading) return <div>Cargando panel de administración...</div>

  return (
    <div>
      <h3>Administrar Canchas</h3>
      {error && <div className="alert alert-danger">{error}</div>}

      {/* FORMULARIO DE CREACIÓN */}
      <div className="card p-3 mb-4 bg-light">
        <h5>Nueva Cancha</h5>
        <form className="row g-2" onSubmit={add}>
          <div className="col-md-3">
            <input 
              className="form-control" 
              placeholder="Nombre (ej: Cancha 5)" 
              value={form.nombre} 
              onChange={e => setForm({ ...form, nombre: e.target.value })} 
              required 
            />
          </div>
          <div className="col-md-3">
            <select 
              className="form-select" 
              value={form.tipo} 
              onChange={e => setForm({ ...form, tipo: e.target.value })}
            >
              <option value="Fútbol 7 vs 7 - Techada">Futbolito Techado</option>
              <option value="Futbolito 7 vs 7 - Sintético">Futbolito Sintético</option>
              <option value="Fútbol 11 vs 11 - Pasto Natural">Fútbol 11</option>
            </select>
          </div>
          <div className="col-md-2">
            <input 
              className="form-control" 
              type="number" 
              placeholder="Precio"
              value={form.precioHora} 
              onChange={e => setForm({ ...form, precioHora: e.target.value })} 
              required
            />
          </div>
          <div className="col-md-3">
             <input 
              className="form-control" 
              placeholder="Ruta Imagen (ej: /images/cancha1.png)" 
              value={form.img} 
              onChange={e => setForm({ ...form, img: e.target.value })} 
            />
          </div>
          <div className="col-md-1">
            <button className="btn btn-success w-100" type="submit">Crear</button>
          </div>
        </form>
      </div>

      {/* TABLA DE EDICIÓN */}
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Tipo</th>
              <th>Precio</th>
              <th>Imagen</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {items.map(c => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>
                    <input 
                        className="form-control form-control-sm" 
                        defaultValue={c.nombre}
                        onBlur={(e) => handleUpdate(c.id, 'nombre', e.target.value)}
                    />
                </td>
                <td>{c.tipo}</td>
                <td>
                    <input 
                        className="form-control form-control-sm" 
                        type="number"
                        defaultValue={c.precioHora}
                        onBlur={(e) => handleUpdate(c.id, 'precioHora', e.target.value)}
                    />
                </td>
                <td>
                    <small className="text-muted">{c.img}</small>
                </td>
                <td>
                  <button 
                    className="btn btn-sm btn-danger" 
                    onClick={() => handleDelete(c.id)}
                  >
                    Eliminar
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