import { createContext, useState, useEffect } from 'react'

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('usuario_canchas')
    return savedUser ? JSON.parse(savedUser) : null
  })

  // Guardar en localStorage cada vez que cambie el user
  useEffect(() => {
    if (user) {
      localStorage.setItem('usuario_canchas', JSON.stringify(user))
    } else {
      localStorage.removeItem('usuario_canchas')
    }
  }, [user])

  const login = (userData) => {
    setUser(userData)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('usuario_canchas')
    window.location.href = '/login' // Forzar recarga limpia
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}