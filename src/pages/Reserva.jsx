import { useState, useEffect, useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ReservaContext } from '../context/ReservaContext'
import { AuthContext } from '../context/AuthContext' 

export default function Reserva() {
  // PROTECCIÓN: Si el contexto falla, usamos objetos vacíos para que no explote
  const { cancha, sede } = useContext(ReservaContext) || {}
  const { user } = useContext(AuthContext) || {}
  
  const nav = useNavigate()
  const location = useLocation()
  
  // Recuperar cancha desde el contexto o desde la navegación (state)
  const canchaSeleccionada = location.state?.canchaSeleccionada || cancha

  const [formulario, setFormulario] = useState({
    fecha: '',
    hora: '',
    nombre: '',
    correo: '',
    telefono: ''
  })

  // Rellenar datos si hay usuario
  useEffect(() => {
    if (user) {
      setFormulario(prev => ({
        ...prev,
        nombre: user.nombre || '',
        correo: user.email || ''
      }))
    }
  }, [user])

  const handleChange = (e) => {
    setFormulario({...formulario, [e.target.name]: e.target.value})
  }

  const confirmarReserva = () => {
    if (!user) {
      alert("⚠️ Debes iniciar sesión para confirmar.")
      nav('/login')
      return
    }

    if (!formulario.fecha || !formulario.hora) {
      alert("Por favor selecciona fecha y hora.")
      return
    }

    const nuevaReserva = {
      id: Math.floor(Math.random() * 90000) + 10000,
      tipo: 'Reserva Cancha',
      item: canchaSeleccionada?.nombre || 'Cancha',
      sede: sede || 'Sede Principal',
      fecha: formulario.fecha,
      hora: formulario.hora,
      total: canchaSeleccionada?.precioHora || 0,
      cliente: user.email,
      estado: 'Confirmada',
      // Formato compatible con el historial
      productos: [{ 
          imageUrl: canchaSeleccionada?.img || '/images/placeholder.png', 
          name: canchaSeleccionada?.nombre || 'Arriendo Cancha',
          quantity: 1,
          price: canchaSeleccionada?.precioHora || 0
      }]
    }

    // Guardar en Historial
    const historial = JSON.parse(localStorage.getItem('historial_compras')) || []
    historial.push(nuevaReserva)
    localStorage.setItem('historial_compras', JSON.stringify(historial))

    alert("¡Reserva Confirmada! ⚽")
    nav('/historial') 
  }

  // VALIDACIÓN: Si no hay cancha, volver al home
  if (!canchaSeleccionada) {
    return (
        <div className="container py-5 text-center">
            <h3>No has seleccionado ninguna cancha 🏟️</h3>
            <p className="text-muted">Por favor selecciona una cancha desde el inicio o sedes.</p>
            <button onClick={() => nav('/')} className="btn btn-primary mt-3">Ir al Inicio</button>
        </div>
    )
  }

  return (
    <div className="container my-5">
      <h2 className="mb-4 fw-bold text-primary">Finalizar Reserva</h2>

      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body text-center p-4">
          <div className="mb-3">
             <img 
               src={canchaSeleccionada.img ? (canchaSeleccionada.img.includes('/') ? canchaSeleccionada.img : `/images/${canchaSeleccionada.img}.png`) : '/images/placeholder.png'} 
               alt="Cancha" 
               className="rounded shadow-sm"
               style={{width: '150px', height: '100px', objectFit: 'cover'}}
               onError={(e) => e.target.src = '/images/placeholder.png'}
             />
          </div>
          <h3 className="fw-bold">{canchaSeleccionada.nombre}</h3>
          <p className="text-muted">Sede: {sede || 'General'} • <span className="text-primary fw-bold">${canchaSeleccionada.precioHora?.toLocaleString('es-CL')}</span></p>
        </div>
      </div>

      <div className="card shadow border-0 p-4">
        <div className="row g-3">
            
            <div className="col-md-6">
                <label className="form-label fw-bold">Fecha de reserva</label>
                <input type="date" name="fecha" className="form-control" value={formulario.fecha} onChange={handleChange} required/>
            </div>
            <div className="col-md-6">
                <label className="form-label fw-bold">Hora de inicio</label>
                <input type="time" name="hora" className="form-control" value={formulario.hora} onChange={handleChange} required/>
            </div>

            <h5 className="mt-4 fw-bold">Datos de contacto</h5>

            <div className="col-md-6">
                <label className="form-label">Nombre</label>
                <input 
                    type="text" name="nombre" className="form-control" 
                    value={formulario.nombre} onChange={handleChange} 
                    readOnly={!!user} 
                    style={{ backgroundColor: user ? '#e9ecef' : 'white' }}
                />
            </div>
            <div className="col-md-6">
                <label className="form-label">Correo</label>
                <input 
                    type="email" name="correo" className="form-control" 
                    value={formulario.correo} onChange={handleChange} 
                    readOnly={!!user}
                    style={{ backgroundColor: user ? '#e9ecef' : 'white' }}
                />
            </div>
            <div className="col-12">
                <label className="form-label">Teléfono</label>
                <input type="tel" name="telefono" className="form-control" value={formulario.telefono} onChange={handleChange} placeholder="+56 9 ..."/>
            </div>

            {/* AVISOS DE SESIÓN */}
            {!user ? (
                <div className="col-12 mt-3">
                    <div className="alert alert-warning d-flex align-items-center" role="alert">
                        <i className="bi bi-exclamation-triangle-fill me-2"></i>
                        <div>Para finalizar, debes iniciar sesión.</div>
                    </div>
                </div>
            ) : (
                <div className="col-12 mt-3">
                     <div className="alert alert-success d-flex align-items-center py-2" role="alert">
                        <i className="bi bi-check-circle-fill me-2"></i>
                        <div>Usuario identificado: <strong>{user.nombre}</strong></div>
                    </div>
                </div>
            )}

            <div className="col-12 mt-4">
                <button 
                    onClick={confirmarReserva} 
                    className={`btn w-100 py-3 fw-bold ${user ? 'btn-primary' : 'btn-secondary'}`}
                    disabled={!user} // Bloqueamos el botón si no hay usuario
                >
                    {user ? 'Confirmar Reserva' : 'Inicia sesión para reservar'}
                </button>
                {!user && (
                    <button onClick={() => nav('/login')} className="btn btn-outline-primary w-100 mt-2">
                        Ir al Login
                    </button>
                )}
            </div>

        </div>
      </div>
    </div>
  )
}