import { Link } from 'react-router-dom'
import { listSedes } from '../data/db'

export default function Sedes() {
  const sedes = listSedes()
  
  return (
    <div>
      <h2 className="mb-3">Categorías (Sedes)</h2>
      <div className="row g-3">
        {sedes.map(s => (
          <div className="col-12 col-md-4" key={s.id}>
            <div className="card h-100">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{s.nombre}</h5>
                <Link to={`/sedes/${s.id}`} className="btn btn-outline-primary mt-auto">Ver canchas</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}