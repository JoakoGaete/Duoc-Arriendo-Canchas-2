import { createContext, useState, useContext, useMemo } from 'react'

export const ReservaContext = createContext()

export const useReserva = () => useContext(ReservaContext)

export function ReservaProvider({ children }) {
  const [sede, setSede] = useState(null)
  const [cancha, setCancha] = useState(null)

  const value = useMemo(() => ({
    sede, 
    setSede, 
    cancha, 
    setCancha
  }), [sede, cancha])

  return (
    <ReservaContext.Provider value={value}>
      {children}
    </ReservaContext.Provider>
  )
}