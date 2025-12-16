import { Link } from 'react-router-dom'

export default function Blog() {
  // Aquí definimos tus noticias. ¡Fácil de editar!
  const blogPosts = [
    {
      id: 1,
      titulo: "🏆 Gran Torneo de Verano 2025",
      fecha: "15 de Diciembre, 2025",
      resumen: "Ya están abiertas las inscripciones para el campeonato más grande de Huechuraba. Premios en efectivo, copas y medallas para los 3 primeros lugares. ¡Arma tu equipo y demuestra quién manda en la cancha!",
      imagen: "/images/home.jpg", // Usamos la foto del home por mientras
      link: "#"
    },
    {
      id: 2,
      titulo: "⚡ Tips: Mejora tu resistencia",
      fecha: "10 de Diciembre, 2025",
      resumen: "Muchos jugadores se cansan a los 20 minutos. El secreto no es solo correr, sino saber cuándo picar. Descubre los mejores ejercicios de cardio y la nutrición adecuada (¡No olvides tu barra de proteína!) para aguantar todo el partido.",
      imagen: "/images/barra.png", // Usamos la foto de la barra
      link: "#"
    },
    {
      id: 3,
      titulo: "📢 Renovación de Iluminación LED",
      fecha: "05 de Diciembre, 2025",
      resumen: "Para que los partidos nocturnos sean de otro nivel, hemos instalado focos LED de última generación en la cancha de futbolito #2. Menos sombras, más visibilidad y mejor ambiente para tus pichangas.",
      imagen: "/images/balon.png", 
      link: "#"
    }
  ]

  return (
    <div className="container my-5">
      
      {/* Encabezado simple como en el mockup */}
      <div className="text-center mb-5">
        <h2 className="fw-bold text-uppercase display-6">Noticias Importantes</h2>
        <div className="bg-primary mx-auto mt-2" style={{ width: '60px', height: '4px' }}></div>
      </div>

      <div className="row g-4">
        {blogPosts.map((post) => (
          <div className="col-12" key={post.id}>
            {/* TARJETA TIPO MOCKUP: GRIS CLARO */}
            <div className="card border-0 shadow-sm overflow-hidden bg-light">
              <div className="row g-0 align-items-center">
                
                {/* COLUMNA IZQUIERDA: TEXTO (Como en tu dibujo) */}
                <div className="col-md-7 p-4 p-md-5 d-flex flex-column justify-content-center">
                  <small className="text-muted fw-bold text-uppercase mb-2">{post.fecha}</small>
                  <h3 className="card-title fw-bold mb-3">{post.titulo}</h3>
                  <p className="card-text text-secondary mb-4" style={{ lineHeight: '1.6' }}>
                    {post.resumen}
                  </p>
                  
                  {/* Botón Estilo "Ver Caso" */}
                  <div>
                    <button className="btn btn-outline-dark text-uppercase fw-bold px-4 py-2" style={{ letterSpacing: '1px' }}>
                      Leer Artículo
                    </button>
                  </div>
                </div>

                {/* COLUMNA DERECHA: IMAGEN (El cuadro con la X en tu dibujo) */}
                <div className="col-md-5">
                  <img 
                    src={post.imagen} 
                    alt={post.titulo} 
                    className="img-fluid w-100 h-100"
                    style={{ objectFit: 'cover', minHeight: '300px' }}
                    onError={(e) => e.target.src = 'https://via.placeholder.com/500x300?text=Noticia+Canchas'}
                  />
                </div>

              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}