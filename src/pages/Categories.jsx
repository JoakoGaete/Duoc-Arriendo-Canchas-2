import { Link } from 'react-router-dom'

export default function Categories() {
  // Datos "quemados" para las categorías (puedes conectarlo a BD después)
  const categorias = [
    {
      id: 1,
      titulo: "Fútbol 7 vs 7",
      descripcion: "Canchas de pasto sintético ideales para partidos rápidos.",
      img: "/images/cancha1.png", // Asegúrate de tener estas imágenes o usa placeholder
      link: "/canchas" 
    },
    {
      id: 2,
      titulo: "Fútbol 11 Profesional",
      descripcion: "Canchas de tamaño oficial con pasto natural o sintético.",
      img: "/images/cancha3.png",
      link: "/canchas"
    },
    {
      id: 3,
      titulo: "Baby Fútbol",
      descripcion: "Canchas techadas de superficie dura para máxima velocidad.",
      img: "/images/cancha2.png",
      link: "/canchas"
    }
  ]

  return (
    <div className="container mt-5 mb-5">
      <div className="text-center mb-5">
        <h1 className="fw-bold text-primary">Categorías de Canchas</h1>
        <p className="text-muted">Encuentra el tipo de cancha perfecto para tu partido</p>
      </div>

      <div className="row g-4 justify-content-center">
        {categorias.map((cat) => (
          <div className="col-12 col-md-4" key={cat.id}>
            <div className="card h-100 shadow-sm border-0 hover-effect">
              {/* Imagen con efecto de oscurecido */}
              <div className="position-relative">
                <img 
                  src={cat.img} 
                  alt={cat.titulo} 
                  className="card-img-top"
                  style={{ height: '200px', objectFit: 'cover' }}
                  onError={(e) => e.target.src = '/images/placeholder.png'}
                />
                <div className="card-img-overlay d-flex align-items-end" style={{background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)'}}>
                  <h4 className="text-white fw-bold mb-0">{cat.titulo}</h4>
                </div>
              </div>

              <div className="card-body">
                <p className="card-text text-secondary">{cat.descripcion}</p>
                <Link to={cat.link} className="btn btn-outline-primary w-100 fw-bold">
                  Ver Disponibilidad
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}