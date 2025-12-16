// src/pages/Canchas.jsx
import { useParams, useNavigate } from 'react-router-dom'
import { useReserva } from '../context/ReservaContext'
import { useMemo, useState, useEffect } from 'react'
import axios from 'axios'

export default function Canchas() {
  const { sedeId } = useParams()
  const nav = useNavigate()
  const { setSede, setCancha } = useReserva()

  const [canchas, setCanchas] = useState([]) 
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  
  const [texto, setTexto] = useState('')
  const [tipo, setTipo] = useState('')

  useEffect(() => {
    async function loadCanchas() {
      setIsLoading(true)
      setError(null)
      try {
        let url = '/api/fields' 
        if (sedeId) {
          url = `/api/fields/sede/${sedeId}` 
        }

        const res = await axios.get(url)
        setCanchas(res.data) // Guardamos los datos directos del backend

      } catch (err) {
        console.error('Error al cargar canchas:', err)
        setError('No se pudieron cargar las canchas.')
      } finally {
        setIsLoading(false)
      }
    }
    loadCanchas()
  }, [sedeId]) 

  // --- FUNCIÓN INTELIGENTE PARA IMÁGENES (Igual que en el Home) ---
  const obtenerImagen = (imgDelBackend) => {
    if (!imgDelBackend) return '/images/placeholder.png';
    
    // Si ya viene con la ruta correcta (/images/...), la usamos tal cual
    if (imgDelBackend.includes('/images/')) {
      return imgDelBackend;
    }
    
    // Si viene solo el nombre ("cancha1"), le agregamos la ruta y extensión
    let nombreLimpio = imgDelBackend.replace('.png', '').replace('.jpg', '');
    return `/images/${nombreLimpio}.png`;
  }

  const filtradas = useMemo(() => {
    let arr = [...canchas]
    
    // Filtro por tipo
    if (tipo) arr = arr.filter(c => (c.tipo || c.type) === tipo)
    
    // Filtro por texto
    if (texto) {
      const q = texto.toLowerCase()
      arr = arr.filter(c => (c.nombre || c.name || '').toLowerCase().includes(q))
    }
    return arr
  }, [canchas, texto, tipo])

  function seleccionar(c) {
    const sedeActual = sedeId || c.location || 'Sede Principal'; 
    setSede(sedeActual); 
    setCancha(c); 
    nav('/reserva')
  }

  if (isLoading) return <div className="container mt-4">Cargando canchas...</div>
  if (error) return <div className="container mt-4 alert alert-danger">{error}</div>

  return (
    <div>
      <h2 className="mb-3">Canchas disponibles {sedeId && `en ${sedeId}`}</h2>

      {/* Buscador y Filtros */}
      <div className="row g-2 mb-3">
        <div className="col-12 col-md-6">
          <input 
            className="form-control" 
            placeholder="Buscar por nombre..." 
            value={texto} 
            onChange={e => setTexto(e.target.value)} 
          />
        </div>
        <div className="col-12 col-md-3">
          <select className="form-select" value={tipo} onChange={e => setTipo(e.target.value)}>
            <option value="">Todos los tipos</option>
            <option value="Futbol 7 vs 7 - Techada">Futbolito Techado</option>
            <option value="Futbolito 7 vs 7 - Sintético">Futbolito Sintético</option>
            <option value="Fútbol 11 vs 11 - Pasto Natural">Fútbol 11</option>
          </select>
        </div>
      </div>

      {!filtradas.length && (
        <div className="alert alert-info">No se encontraron canchas con esos filtros.</div>
      )}

      {/* Listado de Tarjetas */}
      <div className="row g-3">
        {filtradas.map(c => {
            
            // Usamos la función inteligente aquí
            const rutaFinal = obtenerImagen(c.img);

            return (
              <div className="col-12 col-md-4" key={c.id}>
                <div className="card h-100 shadow-sm">
                  <img 
                    src={rutaFinal} 
                    alt={c.nombre} 
                    className="card-img-top" 
                    style={{ height: '200px', objectFit: 'cover' }} 
                    onError={(e) => { e.target.src = '/images/placeholder.png' }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{c.nombre || c.name}</h5>
                    <p className="card-text text-muted">
                      {c.tipo || c.type} <br/>
                      <span className="text-primary fw-bold">
                        ${(c.precioHora || c.pricePerHour || 0).toLocaleString('es-CL')} / hora
                      </span>
                    </p>
                    <button 
                        className="btn btn-primary mt-auto w-100" 
                        onClick={() => seleccionar(c)}
                    >
                        Reservar
                    </button>
                  </div>
                </div>
              </div>
            )
        })}
      </div>
    </div>
  )
}