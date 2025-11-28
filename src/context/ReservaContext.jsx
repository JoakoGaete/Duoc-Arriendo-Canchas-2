import { createContext, useContext, useState } from 'react'

const ReservaContext = createContext()

export function ReservaProvider({ children }) {
  const [seleccion, setSeleccion] = useState({
    cancha: null,
    sedeId: '',
    fecha: '',
    hora: '',
    datos: { nombre: '', email: '', telefono: '' }
  })
  const [usuarioActivo, setUsuarioActivo] = useState(null)
  const [canchas, setCanchas] = useState([])

  const setSede = (sedeId) => setSeleccion(prev => ({ ...prev, sedeId }))
  const setCancha = (cancha) => setSeleccion(prev => ({ ...prev, cancha }))
  const setFecha = (fecha) => setSeleccion(prev => ({ ...prev, fecha }))
  const setHora = (hora) => setSeleccion(prev => ({ ...prev, hora }))
  const setDatos = (datos) => setSeleccion(prev => ({ ...prev, datos }))
  const clear = () => setSeleccion({
    cancha: null,
    sedeId: '',
    fecha: '',
    hora: '',
    datos: { nombre: '', email: '', telefono: '' }
  })

  return (
    <ReservaContext.Provider value={{
      seleccion,
      setSede,
      setCancha,
      setFecha,
      setHora,
      setDatos,
      clear,
      usuarioActivo,
      setUsuarioActivo,
      canchas,
      setCanchas
    }}>
      {children}
    </ReservaContext.Provider>
  )
}

export const useReserva = () => useContext(ReservaContext)

