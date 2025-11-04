import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../data/db'
import { Link } from "react-router-dom";


export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const user = login(email, password)

    if (!user) {
      setError('Credenciales inválidas. Intenta nuevamente.')
      return
    }

    
    if (user.rol === 'admin') {
      navigate('/admin')
    } else {
      navigate('/')
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
        <Link to="/registro" className="btn btn-primary">¿No tienes cuenta? Registrate</Link>
      </div>
    
      </div>
    
      
    </div>
  )
}
