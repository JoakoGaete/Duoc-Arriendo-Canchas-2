import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

export default function AdminUserForm() {
  const { id } = useParams()
  const nav = useNavigate()
  
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    run: '',
    email: '',
    password: '',
    role: 'user',
    region: 'Metropolitana',
    comuna: 'Santiago',
    direccion: '',
    telefono: ''
  })

  // Cargar datos si estamos editando
  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:8084/api/users/${id}`)
        .then(res => setForm(res.data))
        .catch(err => console.error(err))
    }
  }, [id])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // --- VALIDACIONES DEL PDF ---
  const validarFormulario = () => {
    // 1. Validar RUT (Formato simple sin puntos ni guion, largo 7-9)
    if (form.run.length < 7 || form.run.length > 9) {
      alert("El RUT debe tener entre 7 y 9 caracteres (sin puntos ni guion).")
      return false
    }

    // 2. Validar Correo (Dominios permitidos)
    const dominiosValidos = ['@duoc.cl', '@profesor.duoc.cl', '@gmail.com']
    const esValido = dominiosValidos.some(d => form.email.endsWith(d))
    
    if (!esValido) {
      alert("El correo debe ser @duoc.cl, @profesor.duoc.cl o @gmail.com")
      return false
    }

    // 3. Validar Password (solo al crear)
    if (!id && (form.password.length < 4 || form.password.length > 10)) {
      alert("La contraseña debe tener entre 4 y 10 caracteres.")
      return false
    }

    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validarFormulario()) return; // Si falla la validación, no guardamos

    try {
      if (id) {
        await axios.put(`http://localhost:8084/api/users/${id}`, form)
        alert("Usuario actualizado ✅")
      } else {
        await axios.post('http://localhost:8084/api/users', form)
        alert("Usuario creado correctamente 🎉")
      }
      nav('/admin/usuarios')
    } catch (error) {
      console.error(error)
      alert("Error al guardar usuario")
    }
  }

  return (
    <div className="container mt-4">
      <div className="card shadow border-0 p-4 mx-auto" style={{ maxWidth: '800px' }}>
        <h3 className="mb-4 text-center">{id ? '✏️ Editar Usuario' : '👤 Nuevo Usuario'}</h3>
        
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            
            {/* Datos Personales */}
            <div className="col-md-6">
              <label className="form-label">Nombre</label>
              <input name="nombre" className="form-control" value={form.nombre} onChange={handleChange} required />
            </div>
            <div className="col-md-6">
              <label className="form-label">Apellidos</label>
              <input name="apellido" className="form-control" value={form.apellido} onChange={handleChange} required />
            </div>

            <div className="col-md-6">
              <label className="form-label">RUT (sin puntos/guion)</label>
              <input name="run" className="form-control" value={form.run} onChange={handleChange} placeholder="Ej: 12345678K" required />
            </div>
            <div className="col-md-6">
              <label className="form-label">Teléfono</label>
              <input name="telefono" className="form-control" value={form.telefono} onChange={handleChange} />
            </div>

            {/* Datos Cuenta */}
            <div className="col-md-6">
              <label className="form-label">Correo Electrónico</label>
              <input type="email" name="email" className="form-control" value={form.email} onChange={handleChange} placeholder="@duoc.cl / @gmail.com" required />
            </div>
            <div className="col-md-3">
              <label className="form-label">Contraseña</label>
              <input type="password" name="password" className="form-control" value={form.password} onChange={handleChange} disabled={!!id} placeholder={id ? "(Oculta)" : "4-10 caracteres"} />
            </div>
            <div className="col-md-3">
              <label className="form-label">Rol</label>
              <select name="role" className="form-select" value={form.role} onChange={handleChange}>
                <option value="user">Cliente</option>
                <option value="admin">Administrador</option>
                <option value="vendedor">Vendedor</option>
              </select>
            </div>

            {/* Dirección */}
            <h5 className="mt-4 border-bottom pb-2">Dirección</h5>
            <div className="col-md-6">
              <label className="form-label">Región</label>
              <select name="region" className="form-select" value={form.region} onChange={handleChange}>
                <option value="Metropolitana">Metropolitana</option>
                <option value="Valparaiso">Valparaíso</option>
                <option value="BioBio">BioBío</option>
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label">Comuna</label>
              <input name="comuna" className="form-control" value={form.comuna} onChange={handleChange} />
            </div>
            <div className="col-12">
              <label className="form-label">Dirección / Calle</label>
              <input name="direccion" className="form-control" value={form.direccion} onChange={handleChange} />
            </div>

          </div>

          <div className="d-grid gap-2 mt-4">
            <button type="submit" className="btn btn-primary fw-bold">Guardar Usuario</button>
            <button type="button" className="btn btn-secondary" onClick={() => nav('/admin/usuarios')}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  )
}