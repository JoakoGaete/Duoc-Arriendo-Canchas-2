import { createContext, useContext, useMemo, useState } from 'react'

const Ctx = createContext()
export const useReserva = () => useContext(Ctx)

export function ReservaProvider({ children }) {
  const [seleccion, setSeleccion] = useState({
    sedeId: '',
    cancha: null,
    fecha: '',
    hora: '',
    datos: { nombre: '', email: '', telefono: '' }
  })

  const api = useMemo(() => ({
    seleccion,
    setSede: (sedeId) => setSeleccion(s => ({ ...s, sedeId })),
    setCancha: (cancha) => setSeleccion(s => ({ ...s, cancha })),
    setFecha: (fecha) => setSeleccion(s => ({ ...s, fecha })),
    setHora: (hora) => setSeleccion(s => ({ ...s, hora })),
    setDatos: (datos) => setSeleccion(s => ({ ...s, datos })),
    clear: () => setSeleccion({
      sedeId: '', cancha: null, fecha: '', hora: '',
      datos: { nombre: '', email: '', telefono: '' }
    })
  }), [seleccion])

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>
}
