import { listCanchasPromo } from '../data/db'
import { useReserva } from '../context/ReservaContext'
import { useNavigate } from 'react-router-dom'

export default function Offers(){
  const items = listCanchasPromo()
  const { setSede, setCancha } = useReserva()
  const nav = useNavigate()

  function reservar(c){
    setSede(c.sedeId); setCancha(c); nav('/reserva')
  }

  return (
    <div>
      <h2 className="mb-3">Ofertas</h2>
      {!items.length && <p>No hay canchas en promoción por ahora.</p>}
      <div className="row g-3">
        {items.map(c => (
          <div className="col-12 col-md-4" key={c.id}>
            <div className="card h-100 border-success">
              <img src={c.img} alt={c.nombre} className="thumb-400x200" />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{c.nombre}</h5>
                <p className="card-text">Tipo: {c.tipo} • Precio: ${c.precioHora.toLocaleString('es-CL')}</p>
                <button className="btn btn-success mt-auto" onClick={()=>reservar(c)}>Reservar en oferta</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
