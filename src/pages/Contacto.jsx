import { useState } from 'react'

export default function Contacto() {
  const [formData, setFormData] = useState({ nombre: '', email: '', mensaje: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('¡Mensaje enviado! Nos pondremos en contacto pronto.')
    setFormData({ nombre: '', email: '', mensaje: '' })
  }

  return (
    <div className="min-vh-100 d-flex flex-column">
      
      {/* --- SECCIÓN HERO (FONDO LLAMATIVO) --- */}
      <div 
        className="position-relative d-flex align-items-center justify-content-center text-white"
        style={{
          // REEMPLAZA '/images/home.jpg' por tu mejor foto de cancha o la imagen de contacto que tengas
          backgroundImage: "url('/images/home.jpg')", 
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '400px'
        }}
      >
        {/* Capa oscura para que el texto resalte (Overlay) */}
        <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-75"></div>
        
        <div className="position-relative z-1 text-center px-3">
          <h1 className="display-3 fw-bold text-uppercase">Contáctanos</h1>
          <p className="lead fs-4">¿Dudas? ¿Torneos? Estamos aquí para ayudarte.</p>
        </div>
      </div>

      {/* --- SECCIÓN FORMULARIO Y DATOS --- */}
      <div className="container" style={{ marginTop: '-80px', position: 'relative', zIndex: 2 }}>
        <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
          <div className="row g-0">
            
            {/* COLUMNA IZQUIERDA: INFORMACIÓN */}
            <div className="col-lg-5 bg-primary text-white p-5 d-flex flex-column justify-content-center">
              <h3 className="fw-bold mb-4">Información de Contacto</h3>
              <p className="mb-5 opacity-75">Llámanos o visítanos en nuestra sede principal.</p>

              <div className="d-flex align-items-center mb-4">
                <div className="bg-white text-primary rounded-circle p-3 me-3 d-flex justify-content-center align-items-center" style={{width: '50px', height: '50px'}}>
                  <i className="bi bi-geo-alt-fill fs-5"></i>
                </div>
                <div>
                  <h6 className="fw-bold mb-0">Ubicación</h6>
                  <small>Av. El Salto 1234, Huechuraba</small>
                </div>
              </div>

              <div className="d-flex align-items-center mb-4">
                <div className="bg-white text-primary rounded-circle p-3 me-3 d-flex justify-content-center align-items-center" style={{width: '50px', height: '50px'}}>
                  <i className="bi bi-telephone-fill fs-5"></i>
                </div>
                <div>
                  <h6 className="fw-bold mb-0">Teléfono</h6>
                  <small>+56 9 1234 5678</small>
                </div>
              </div>

              <div className="d-flex align-items-center mb-4">
                <div className="bg-white text-primary rounded-circle p-3 me-3 d-flex justify-content-center align-items-center" style={{width: '50px', height: '50px'}}>
                  <i className="bi bi-envelope-fill fs-5"></i>
                </div>
                <div>
                  <h6 className="fw-bold mb-0">Email</h6>
                  <small>contacto@canchasduoc.cl</small>
                </div>
              </div>

              {/* Redes Sociales */}
              <div className="mt-auto pt-4 d-flex gap-3">
                <i className="bi bi-facebook fs-4 cursor-pointer hover-scale"></i>
                <i className="bi bi-instagram fs-4 cursor-pointer hover-scale"></i>
                <i className="bi bi-whatsapp fs-4 cursor-pointer hover-scale"></i>
              </div>
            </div>

            {/* COLUMNA DERECHA: FORMULARIO */}
            <div className="col-lg-7 p-5 bg-white">
              <h3 className="fw-bold text-dark mb-4">Envíanos un mensaje</h3>
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label fw-bold small text-muted">Nombre</label>
                    <input type="text" className="form-control bg-light border-0 py-3" placeholder="Tu nombre" required 
                      value={formData.nombre} onChange={e => setFormData({...formData, nombre: e.target.value})}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold small text-muted">Email</label>
                    <input type="email" className="form-control bg-light border-0 py-3" placeholder="tucorreo@ejemplo.com" required 
                      value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-bold small text-muted">Mensaje</label>
                    <textarea className="form-control bg-light border-0 py-3" rows="5" placeholder="¿En qué podemos ayudarte?" required
                      value={formData.mensaje} onChange={e => setFormData({...formData, mensaje: e.target.value})}
                    ></textarea>
                  </div>
                  <div className="col-12 mt-4">
                    <button type="submit" className="btn btn-dark w-100 py-3 fw-bold text-uppercase">
                      Enviar Mensaje 🚀
                    </button>
                  </div>
                </div>
              </form>
            </div>

          </div>
        </div>
      </div>

      {/* Espacio extra abajo */}
      <div className="mb-5"></div>
    </div>
  )
}