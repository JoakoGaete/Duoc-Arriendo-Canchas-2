import { createContext, useState, useEffect } from 'react'

export const CartContext = createContext()

export function CartProvider({ children }) {
  // 1. Intentamos cargar el carrito guardado en el navegador (LocalStorage)
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('carrito_canchas')
    return savedCart ? JSON.parse(savedCart) : []
  })

  // 2. Cada vez que el carrito cambie, lo guardamos automáticamente
  useEffect(() => {
    localStorage.setItem('carrito_canchas', JSON.stringify(cart))
  }, [cart])

  // --- FUNCIONES DEL CARRITO ---

  // Agregar producto (Si ya existe, suma cantidad)
  const addToCart = (product, quantity = 1) => {
    const existingIndex = cart.findIndex(item => item.id === product.id)
    
    if (existingIndex >= 0) {
      // Si ya existe, actualizamos la cantidad
      const newCart = structuredClone(cart)
      newCart[existingIndex].quantity += quantity
      setCart(newCart)
    } else {
      // Si no existe, lo agregamos
      setCart([...cart, { ...product, quantity }])
    }
  }

  // Eliminar un producto
  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id))
  }

  // Cambiar cantidad (+ o -)
  const updateQuantity = (id, amount) => {
    const newCart = cart.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(1, item.quantity + amount) } // Mínimo 1
      }
      return item
    })
    setCart(newCart)
  }

  // Vaciar carrito
  const clearCart = () => setCart([])

  // Calcular Total $$$
  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0)
  
  // Calcular Cantidad de items (para el numerito rojo del navbar)
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0)

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart, 
      total,
      totalItems 
    }}>
      {children}
    </CartContext.Provider>
  )
}