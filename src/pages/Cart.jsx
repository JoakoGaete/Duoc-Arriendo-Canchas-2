import { useContext } from 'react'
import { CartContext } from '../context/CartContext'
import { Link, useNavigate } from 'react-router-dom'

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart, total } = useContext(CartContext)
  const navigate = useNavigate()

  if (cart.length === 0) {
    return (
      <div className="container py-5 text-center">
        <h2 className="fw-bold mb-3">Tu carrito está vacío 🛒</h2>
        <p className="text-muted">¡Agrega productos o arrienda una cancha!</p>
        <Link to="/ofertas" className="btn btn-primary fw-bold mt-3">Ver Ofertas</Link>
      </div>
    )
  }

  return (
    <div className="container my-5">
      <h2 className="fw-bold mb-4">🛒 Mi Carrito de Compras</h2>

      <div className="row g-4">
        {/* TABLA DE PRODUCTOS */}
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm overflow-hidden">
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Producto</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Subtotal</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map(item => (
                    <tr key={item.id}>
                      <td>
                        <div className="d-flex align-items-center gap-3">
                           <img 
                             src={item.imageUrl} 
                             alt={item.name} 
                             style={{width:'60px', height:'60px', objectFit:'contain'}} 
                             className="rounded border p-1 bg-white"
                             onError={(e)=>e.target.src='/images/placeholder.png'}
                           />
                           <div>
                             <h6 className="mb-0 fw-bold">{item.name}</h6>
                             <small className="text-muted">{item.category}</small>
                           </div>
                        </div>
                      </td>
                      <td>${item.price?.toLocaleString('es-CL')}</td>
                      <td>
                        <div className="d-flex align-items-center border rounded" style={{width: '100px'}}>
                          <button className="btn btn-sm px-2" onClick={() => updateQuantity(item.id, -1)}>-</button>
                          <span className="flex-grow-1 text-center fw-bold">{item.quantity}</span>
                          <button className="btn btn-sm px-2" onClick={() => updateQuantity(item.id, 1)}>+</button>
                        </div>
                      </td>
                      <td className="fw-bold text-primary">
                        ${(item.price * item.quantity).toLocaleString('es-CL')}
                      </td>
                      <td>
                        <button onClick={() => removeFromCart(item.id)} className="btn btn-sm text-danger hover-scale">
                          <i className="bi bi-trash-fill fs-5"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <button onClick={clearCart} className="btn btn-outline-danger mt-3 btn-sm">
            Vaciar Carrito 🗑️
          </button>
        </div>

        <div className="col-lg-4">
          <div className="card border-0 shadow-lg bg-light">
            <div className="card-body p-4">
              <h4 className="fw-bold mb-4">Resumen</h4>
              
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Subtotal</span>
                <span className="fw-bold">${total.toLocaleString('es-CL')}</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span className="text-muted">Envío</span>
                <span className="text-success fw-bold">Gratis</span>
              </div>
              
              <hr />
              
              <div className="d-flex justify-content-between mb-4 align-items-center">
                <span className="h5 fw-bold mb-0">Total</span>
                <span className="h3 fw-bold text-primary mb-0">${total.toLocaleString('es-CL')}</span>
              </div>

              <button 
                className="btn btn-dark w-100 py-3 fw-bold fs-5 shadow-sm"
                onClick={() => navigate('/checkout')} 
              >
                IR A PAGAR <i className="bi bi-arrow-right ms-2"></i>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}