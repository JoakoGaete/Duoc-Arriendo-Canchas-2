import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function AdminProducts() {
  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    cargarProductos()
  }, [])

  const cargarProductos = () => {
    axios.get('http://localhost:8084/api/products')
      .then(res => {
        setProductos(res.data)
        setCargando(false)
      })
      .catch(err => console.error("Error:", err))
  }

  const eliminarProducto = async (id) => {
    if (!window.confirm("¿Seguro que quieres eliminar este producto?")) return;

    try {
      await axios.delete(`http://localhost:8084/api/products/${id}`)
      alert("Producto eliminado 🗑️")
      cargarProductos()
    } catch (error) {
      alert("Error al eliminar")
    }
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>📦 Gestión de Productos</h2>
        <Link to="/admin/productos/nuevo" className="btn btn-success fw-bold">
          + Nuevo Producto
        </Link>
      </div>

      <div className="card shadow-sm border-0">
        <div className="card-body p-0">
          <table className="table table-hover mb-0">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map(p => (
                <tr key={p.id} className="align-middle">
                  <td>#{p.id}</td>
                  <td>
                    <img src={p.imageUrl} alt="img" width="50" height="50" style={{objectFit:'contain'}} 
                         onError={e => e.target.src='/images/placeholder.png'}/>
                  </td>
                  <td className="fw-bold">{p.name}</td>
                  <td>${p.price?.toLocaleString('es-CL')}</td>
                  <td>
                    <span className={`badge ${p.stock < 5 ? 'bg-danger' : 'bg-success'}`}>
                      {p.stock} u.
                    </span>
                  </td>
                  <td>
                    <Link to={`/admin/productos/editar/${p.id}`} className="btn btn-sm btn-outline-primary me-2">
                      <i className="bi bi-pencil"></i> Editar
                    </Link>
                    <button onClick={() => eliminarProducto(p.id)} className="btn btn-sm btn-outline-danger">
                      <i className="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {productos.length === 0 && !cargando && (
            <div className="text-center p-4">No hay productos registrados.</div>
          )}
        </div>
      </div>
    </div>
  )
}