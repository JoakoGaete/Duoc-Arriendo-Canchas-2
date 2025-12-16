import { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

export default function Registro() {
  const nav = useNavigate()
  
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    run: '',
    region: 'Metropolitana',
    comuna: '',
    direccion: '',
    role: 'user' // Por defecto, todos se registran como clientes
  })

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validaciones simples antes de enviar
    if (!form.email.includes('@')) {
      alert("Correo inválido")
      return
    }

    try {
      // CONEXIÓN AL BACKEND (Asegúrate que el puerto 8084 sea el correcto)
      await axios.post('http://localhost:8084/api/users', form)
      
      alert("¡Cuenta creada con éxito! Ahora puedes iniciar sesión. 🚀")
      nav('/login')
    } catch (error) {
      console.error(error)
      alert("Hubo un error al registrarse. Revisa la consola.")
    }
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card border-0 shadow-lg p-4">
            <h2 className="text-center fw-bold mb-4">Crear Cuenta</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-6">
                   <label className="form-label">Nombre</label>
                   <input name="nombre" className="form-control" onChange={handleChange} required />
                </div>
                <div className="col-6">
                   <label className="form-label">Apellido</label>
                   <input name="apellido" className="form-control" onChange={handleChange} required />
                </div>
                
                <div className="col-12">
                   <label className="form-label">RUT</label>
                   <input name="run" className="form-control" placeholder="12345678-9" onChange={handleChange} required />
                </div>

                <div className="col-12">
                   <label className="form-label">Correo Electrónico</label>
                   <input type="email" name="email" className="form-control" onChange={handleChange} required />
                </div>
                
                <div className="col-12">
                   <label className="form-label">Contraseña</label>
                   <input type="password" name="password" className="form-control" onChange={handleChange} required />
                </div>

                <div className="col-6">
                   <label className="form-label">Región</label>
                   <select name="region" className="form-select" onChange={handleChange}>
                     <option value="Metropolitana">Metropolitana</option>
                     <option value="Valparaiso">Valparaíso</option>
                     <option value="BioBio">BioBío</option>
                   </select>
                </div>
                <div className="col-6">
                   <label className="form-label">Comuna</label>
                   <input name="comuna" className="form-control" onChange={handleChange} />
                </div>
              </div>

              <button type="submit" className="btn btn-primary w-100 fw-bold mt-4 py-2">
                Registrarse
              </button>
            </form>

            <div className="text-center mt-3">
              ¿Ya tienes cuenta? <Link to="/login" className="fw-bold">Ingresa aquí</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}