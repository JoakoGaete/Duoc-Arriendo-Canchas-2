import { useState, useContext, useEffect } from 'react'
import { CartContext } from '../context/CartContext'
import { AuthContext } from '../context/AuthContext' // <--- Importamos Auth
import { useNavigate } from 'react-router-dom'

export default function Checkout() {
  const { cart, total, clearCart } = useContext(CartContext)
  const { user } = useContext(AuthContext) // <--- Traemos al usuario
  const navigate = useNavigate()
  
  const [datos, setDatos] = useState({
    nombre: '',
    direccion: '',
    comuna: 'Huechuraba',
    telefono: ''
  })

  // --- 1. PROTECCIÓN DE RUTA ---
  useEffect(() => {
    if (!user) {
      alert("🔒 Para comprar debes iniciar sesión primero.")
      navigate('/login')
    }
  }, [user, navigate])

  // Si no hay carrito, volver al home
  if (cart.length === 0) {
    return (
        <div className="container py-5 text-center">
            <h3>Tu carrito está vacío 🛒</h3>
            <button onClick={()=>navigate('/')} className="btn btn-primary mt-3">Volver al inicio</button>
        </div>
    )
  }

  const procesarPago = (e) => {
    e.preventDefault()
    
    // Simulación de éxito (70%)
    const exito = Math.random() > 0.3 

    if (exito) {
      // --- 2. GUARDAR EN HISTORIAL ---
      const nuevaOrden = {
        id: Math.floor(Math.random() * 100000),
        fecha: new Date().toLocaleDateString(), // Fecha de hoy
        hora: new Date().toLocaleTimeString(),
        productos: cart,
        total: total,
        cliente: user.email // Importante: Asociar al usuario
      }

      // Leemos el historial viejo, le agregamos la nueva orden y guardamos
      const historial = JSON.parse(localStorage.getItem('historial_compras')) || []
      historial.push(nuevaOrden)
      localStorage.setItem('historial_compras', JSON.stringify(historial))

      clearCart() // Limpiamos carrito
      navigate('/pago-exito', { state: { nroOrden: nuevaOrden.id } })
    } else {
      navigate('/pago-fallo')
    }
  }

  return (
    <div className="container my-5">
      <h2 className="fw-bold mb-4">Finalizar Compra</h2>
      
      <div className="row g-5">
        {/* FORMULARIO */}
        <div className="col-md-7">
          <div className="card shadow-sm border-0 p-4">
            <h4 className="mb-3 fw-bold">Datos de Envío</h4>
            <form onSubmit={procesarPago}>
              <div className="mb-3">
                <label className="form-label">Nombre Completo</label>
                <input type="text" className="form-control" required 
                  value={datos.nombre} onChange={e => setDatos({...datos, nombre: e.target.value})} 
                  placeholder="Ej: Juan Pérez" />
              </div>
              <div className="mb-3">
                <label className="form-label">Dirección</label>
                <input type="text" className="form-control" required 
                  value={datos.direccion} onChange={e => setDatos({...datos, direccion: e.target.value})} 
                  placeholder="Av. El Salto 1234, Depto 202" />
              </div>
              <div className="row">
                <div className="col-6 mb-3">
                  <label className="form-label">Comuna</label>
                  <select className="form-select" 
                    value={datos.comuna} onChange={e => setDatos({...datos, comuna: e.target.value})}>
                    <option>Huechuraba</option>
                    <option>Conchalí</option>
                    <option>Recoleta</option>
                    <option>Quilicura</option>
                    <option>Santiago Centro</option>
                  </select>
                </div>
                <div className="col-6 mb-3">
                  <label className="form-label">Teléfono</label>
                  <input type="tel" className="form-control" placeholder="+569..." required
                    value={datos.telefono} onChange={e => setDatos({...datos, telefono: e.target.value})}/>
                </div>
              </div>
              <hr className="my-4"/>
              <h4 className="mb-3 fw-bold">Método de Pago</h4>
              <div className="form-check mb-2">
                <input id="credito" name="paymentMethod" type="radio" className="form-check-input" defaultChecked required />
                <label className="form-check-label" htmlFor="credito">Tarjeta de Crédito / Débito (WebPay)</label>
              </div>
              <div className="form-check mb-4">
                <input id="transferencia" name="paymentMethod" type="radio" className="form-check-input" required />
                <label className="form-check-label" htmlFor="transferencia">Transferencia Bancaria</label>
              </div>

              <button className="btn btn-warning w-100 btn-lg fw-bold shadow-sm" type="submit">
                Pagar ${total.toLocaleString('es-CL')}
              </button>
            </form>
          </div>
        </div>

        {/* RESUMEN */}
        <div className="col-md-5">
          <div className="card shadow-sm border-0 bg-light">
            <div className="card-body p-4">
              <h4 className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-primary fw-bold">Tu Carrito</span>
                <span className="badge bg-primary rounded-pill">{cart.length}</span>
              </h4>
              <ul className="list-group mb-3">
                {cart.map(item => (
                  <li className="list-group-item d-flex justify-content-between lh-sm" key={item.id}>
                    <div>
                      <h6 className="my-0">{item.name}</h6>
                      <small className="text-muted">x {item.quantity}</small>
                    </div>
                    <span className="text-muted">${(item.price * item.quantity).toLocaleString('es-CL')}</span>
                  </li>
                ))}
                <li className="list-group-item d-flex justify-content-between bg-white fw-bold">
                  <span>Total (CLP)</span>
                  <strong>${total.toLocaleString('es-CL')}</strong>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}