import { useReserva } from '../context/ReservaContext'
import { Link, useNavigate } from 'react-router-dom'

export default function Cart(){
  const { seleccion } = useReserva()
  const nav = useNavigate()

  if(!seleccion.cancha){
    return (
      <div className="text-center">
        <p>No tienes canchas en el carrito.</p>
        <Link to="/sedes" className="btn btn-primary">Ver categorías</Link>
      </div>
    )
  }

  return (
    <div>
      <h2 className="mb-3">Carrito</h2>
      <div className="card">
        <div className="card-body d-flex justify-content-between">
          <div>
            <strong>{seleccion.cancha.nombre}</strong>
            <div>{seleccion.fecha} • {seleccion.hora}</div>
          </div>
          <div>${seleccion.cancha.precioHora.toLocaleString('es-CL')}</div>
        </div>
      </div>
      <div className="d-flex gap-2 mt-3">
        <button className="btn btn-outline-secondary" onClick={()=>nav(-1)}>Seguir viendo</button>
        <Link to="/reserva" className="btn btn-primary">Ir a Checkout</Link>
      </div>
    </div>
  )
}
