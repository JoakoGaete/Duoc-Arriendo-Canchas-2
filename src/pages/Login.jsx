// src/pages/Login.jsx
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { useReserva } from '../context/ReservaContext'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { setUsuarioActivo } = useReserva() // contexto para guardar usuario activo

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('') // limpiar error anterior

    try {
      // Llamada al microservicio de usuarios
      const res = await axios.post(
        '/users/login',
        { email, password },
        { withCredentials: true } // importante si el backend usa HttpSession
      )

      const user = res.data

      if (!user || !user.id) {
        setError('Credenciales inválidas. Intenta nuevamente.')
        return
      }

      // Guardamos el usuario activo en el contexto
      setUsuarioActivo(user)

      // Redirigimos según rol
      if (user.isAdmin) {
        navigate('/admin')
      } else {
        navigate('/')
      }

    } catch (err) {
      console.error('Error login:', err)
      // Mostrar mensaje de error según respuesta del backend
      if (err.response?.status === 404) {
        setError('Usuario no encontrado.')
      } else if (err.response?.status === 401) {
        setError('Contraseña incorrecta.')
      } else {
        setError('Error de conexión al servidor.')
      }
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <div className="card p-4" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 className="text-center mb-4">Iniciar sesión</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            className="form-control mb-3"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="form-control mb-3"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <div className="text-danger mb-3">{error}</div>}

          <button type="submit" className="btn btn-primary w-100">Ingresar</button>
        </form>

        <div className="text-center mt-4">
          <Link to="/registro" className="btn btn-primary">¿No tienes cuenta? Regístrate</Link>
        </div>
      </div>
    </div>
  )
}

