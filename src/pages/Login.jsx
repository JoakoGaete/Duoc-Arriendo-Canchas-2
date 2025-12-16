import { useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

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

  const handleSubmit = (e) => {
    e.preventDefault()

    // --- VALIDACIÓN DE CREDENCIALES (OCULTA) ---
    if (formData.email === 'admin@correo.com' && formData.password === '1234!') {
      
      // CASO ADMIN
      const usuarioAdmin = {
        nombre: 'Administrador',
        email: formData.email,
        role: 'admin' 
      }
      
      login(usuarioAdmin) 
      alert("¡Bienvenido Admin! 🔓") 
      navigate('/admin')  
      
    } else {
      
      // CASO CLIENTE
      const usuarioCliente = {
        nombre: 'Cliente',
        email: formData.email,
        role: 'user'
      }
      
      login(usuarioCliente) 
      alert("¡Sesión iniciada correctamente! ⚽") 
      navigate('/')         
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
          {/* Email */}
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

          {/* Password */}
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

          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="form-check">
              <input type="checkbox" className="form-check-input" id="remember" />
              <label className="form-check-label small text-muted" htmlFor="remember">Recordarme</label>
            </div>
            <a href="#" className="small text-decoration-none fw-bold">¿Olvidaste tu clave?</a>
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