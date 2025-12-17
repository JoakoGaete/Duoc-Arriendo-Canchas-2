import { useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import axios from 'axios'   

export default function Login() {
  const navigate = useNavigate()
  const { login } = useContext(AuthContext) 

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      // Llamada al microservicio
      const response = await axios.post('http://localhost:8085/api/users/login', formData)

      // La respuesta debería contener los datos completos del usuario
      const userData = response.data

      // Guardamos el usuario en el contexto
      login(userData)

      // Redirigimos según el rol
      if (userData.role === 'admin') {
        alert("¡Bienvenido Admin! 🔓")
        navigate('/admin')
      } else {
        alert("¡Sesión iniciada correctamente! ⚽")
        navigate('/')
      }

    } catch (error) {
      console.error('Error de autenticación:', error)
      alert('Email o contraseña incorrectos')
    }
  }

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="card border-0 shadow-lg p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <div className="text-center mb-4">
          <h2 className="fw-bold text-dark">¡Bienvenido! 👋</h2>
          <p className="text-muted">Ingresa a tu cuenta.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-bold small text-secondary">Correo Electrónico</label>
            <input 
              type="email" 
              name="email"
              className="form-control py-2" 
              placeholder="nombre@correo.com" 
              value={formData.email}
              onChange={handleChange}
              required 
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold small text-secondary">Contraseña</label>
            <input 
              type="password" 
              name="password"
              className="form-control py-2" 
              placeholder="********" 
              value={formData.password}
              onChange={handleChange}
              required 
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 py-2 fw-bold shadow-sm mb-3">
            Iniciar Sesión
          </button>

          <div className="text-center">
            <small className="text-muted">¿No tienes cuenta? </small>
            <Link to="/registro" className="fw-bold text-decoration-none">Regístrate aquí</Link>
          </div>
        </form>
      </div>
    </div>
  )
}
