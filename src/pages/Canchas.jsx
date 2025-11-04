import { useParams, useNavigate } from 'react-router-dom'
import { listCanchas, listCanchasBySede } from '../data/db'
import { useReserva } from '../context/ReservaContext'
import { useMemo, useState } from 'react'

export default function Canchas() {
  const { sedeId } = useParams()
  const nav = useNavigate()
  const { setSede, setCancha } = useReserva()
  const todas = listCanchas() // todas las canchas
  const base = sedeId ? todas.filter(c => c.sedeId === sedeId) : todas



  const [texto, setTexto] = useState('')
  const [tipo, setTipo] = useState('')

  const filtradas = useMemo(() => {
    let arr = listCanchas()
    if (tipo) arr = arr.filter(c => c.tipo === tipo)
    if (texto) {
      const q = texto.toLowerCase()
      arr = arr.filter(c => c.nombre.toLowerCase().includes(q))
    }
    return arr
  }, [base, texto, tipo])

  function seleccionar(c) {
    setSede(sedeId); setCancha(c); nav('/reserva')
  }

  return (
    <div>
      <h2 className="mb-3">Canchas disponibles</h2>

      <div className="row g-2 mb-3">
        <div className="col-12 col-md-6">
          <input className="form-control" placeholder="Buscar cancha..." value={texto} onChange={e=>setTexto(e.target.value)} />
        </div>
        <div className="col-12 col-md-3">
          <select className="form-select" value={tipo} onChange={e=>setTipo(e.target.value)}>
            <option value="">Todos los tipos</option>
            <option value="futbolito">Futbolito</option>
            <option value="baby">Baby</option>
            <option value="futbol">Fútbol 11</option>
          </select>
        </div>
      </div>

      {!filtradas.length && <p>No hay canchas registradas con ese filtro.</p>}

      <div className="row g-3">
        {filtradas.map(c => (
          <div className="col-12 col-md-4" key={c.id}>
            <div className="card h-100">
              <img src={c.img} alt={c.nombre} className="thumb-400x200" />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{c.nombre}</h5>
                <p className="card-text">Tipo: {c.tipo} • Precio por hora: ${c.precioHora.toLocaleString('es-CL')}</p>
                <button className="btn btn-primary mt-auto" onClick={()=>seleccionar(c)}>Reservar</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
