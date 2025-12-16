import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

export default function AdminProductForm() {
  const { id } = useParams() // Si hay ID, estamos editando
  const nav = useNavigate()
  
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: 'Bebidas', // Categoría por defecto
    imageUrl: ''
  })

  useEffect(() => {
    if (id) {
      // Modo Edición: Cargar datos del producto
      axios.get(`http://localhost:8084/api/products/${id}`)
        .then(res => setForm(res.data))
        .catch(err => console.error("Error cargando producto", err))
    }
  }, [id])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (id) {
        await axios.put(`http://localhost:8084/api/products/${id}`, form)
        alert("¡Producto actualizado correctamente! ✅")
      } else {
        await axios.post('http://localhost:8084/api/products', form)
        alert("¡Producto creado correctamente! 🎉")
      }
      nav('/admin/productos') // Volver a la lista
    } catch (error) {
      console.error(error)
      alert("Error al guardar el producto")
    }
  }

  return (
    <div className="container mt-4">
      <div className="card shadow border-0 p-4 mx-auto" style={{ maxWidth: '600px' }}>
        <h3 className="mb-4 text-center">{id ? '✏️ Editar Producto' : '✨ Nuevo Producto'}</h3>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input name="name" className="form-control" value={form.name} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Descripción</label>
            <textarea name="description" className="form-control" value={form.description} onChange={handleChange} />
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Precio</label>
              <input type="number" name="price" className="form-control" value={form.price} onChange={handleChange} required />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Stock</label>
              <input type="number" name="stock" className="form-control" value={form.stock} onChange={handleChange} required />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Categoría</label>
            <select name="category" className="form-select" value={form.category} onChange={handleChange}>
              <option value="Bebidas">Bebidas</option>
              <option value="Snacks">Snacks</option>
              <option value="Deportes">Deportes</option>
              <option value="Ropa">Ropa</option>
              <option value="Otros">Otros</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">URL de Imagen</label>
            <input name="imageUrl" className="form-control" value={form.imageUrl} onChange={handleChange} placeholder="Ej: /images/gatorade.png" />
            {form.imageUrl && <div className="mt-2 text-center"><img src={form.imageUrl} alt="Vista previa" height="100" /></div>}
          </div>

          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary fw-bold">Guardar Producto</button>
            <button type="button" className="btn btn-secondary" onClick={() => nav('/admin/productos')}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  )
}