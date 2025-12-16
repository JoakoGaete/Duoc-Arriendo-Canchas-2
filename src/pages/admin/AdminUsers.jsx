import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function AdminUsers() {
  const [usuarios, setUsuarios] = useState([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    cargarUsuarios()
  }, [])

  const cargarUsuarios = () => {
    // Ajusta el puerto si tu microservicio de usuarios corre en otro (ej: 8081 o 8084)
    axios.get('http://localhost:8084/api/users') 
      .then(res => {
        setUsuarios(res.data)
        setCargando(false)
      })
      .catch(err => {
        console.error("Error cargando usuarios", err)
        setCargando(false)
      })
  }

  const eliminarUsuario = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar este usuario?")) return;
    try {
      await axios.delete(`http://localhost:8084/api/users/${id}`)
      alert("Usuario eliminado correctamente 🗑️")
      cargarUsuarios()
    } catch (error) {
      alert("Error al eliminar usuario")
    }
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>👥 Gestión de Usuarios</h2>
        <Link to="/admin/usuarios/nuevo" className="btn btn-primary fw-bold">
          + Nuevo Usuario
        </Link>
      </div>

      <div className="card shadow-sm border-0">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0 align-middle">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Correo</th>
                  <th>Rol</th>
                  <th>RUT</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map(u => (
                  <tr key={u.id}>
                    <td>#{u.id}</td>
                    <td className="fw-bold">{u.nombre} {u.apellido}</td>
                    <td>{u.email}</td>
                    <td>
                      <span className={`badge ${u.role === 'admin' ? 'bg-danger' : 'bg-secondary'}`}>
                        {u.role || 'user'}
                      </span>
                    </td>
                    <td>{u.run || '-'}</td>
                    <td>
                      <Link to={`/admin/usuarios/editar/${u.id}`} className="btn btn-sm btn-outline-primary me-2">
                        <i className="bi bi-pencil"></i>
                      </Link>
                      <button onClick={() => eliminarUsuario(u.id)} className="btn btn-sm btn-outline-danger">
                        <i className="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {usuarios.length === 0 && !cargando && (
            <div className="text-center p-4">No hay usuarios registrados.</div>
          )}
        </div>
      </div>
    </div>
  )
}