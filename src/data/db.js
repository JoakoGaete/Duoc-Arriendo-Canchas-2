const KEY = 'duoc_canchas_db_v1'

const defaultDB = {
  sedes: [
    { id: 'mall-plaza-norte', nombre: 'DUOC UC — Mall Plaza Norte' },
    { id: 'plaza-vespucio', nombre: 'DUOC UC — Plaza Vespucio' },
    { id: 'antonio-varas', nombre: 'DUOC UC — Antonio Varas' },
  ],
  canchas: [
    {
      id: 1,
      sedeId: 'mall-plaza-norte',
      nombre: 'Cancha 1 Futbolito',
      tipo: 'futbolito',
      precioHora: 15000,
      promo: true,
      img: '/images/canchas/mallnorte-1.png'
    },
    {
      id: 2,
      sedeId: 'mall-plaza-norte',
      nombre: 'Cancha 2 Futbolito',
      tipo: 'futbolito',
      precioHora: 15000,
      promo: false,
      img: '/images/canchas/mallnorte-2.png'
    },
    {
      id: 3,
      sedeId: 'antonio-varas',
      nombre: 'Cancha 1 Baby Fútbol',
      tipo: 'baby',
      precioHora: 12000,
      promo: true,
      img: '/images/canchas/antoniovaras-1.png'
    },
  ],
  reservas: [] // {id, canchaId, sedeId, fecha, hora, nombre, email, telefono, total}
}

function load() {
  try { return JSON.parse(localStorage.getItem(KEY)) || { ...defaultDB } }
  catch { return { ...defaultDB } }
}
function save(data) { localStorage.setItem(KEY, JSON.stringify(data)) }

let db = load()
const nextId = (list) => list.length ? Math.max(...list.map(i => i.id)) + 1 : 1

// Sedes
export function listSedes() { return [...db.sedes] }

// Canchas
export function listCanchas() { return [...db.canchas] }
export function listCanchasBySede(sedeId) { return db.canchas.filter(c => c.sedeId === sedeId) }
export function listCanchasPromo() { return db.canchas.filter(c => c.promo) }
export function listCanchasFiltradas({ base = [], texto = '', tipo = '' } = {}) {
  let out = base.length ? [...base] : [...db.canchas]
  if (tipo) out = out.filter(c => c.tipo === tipo)
  if (texto) {
    const q = texto.toLowerCase()
    out = out.filter(c => c.nombre.toLowerCase().includes(q))
  }
  return out
}

export function createCancha(data) {
  const item = { id: nextId(db.canchas), promo: false, img: '/images/canchas/mallnorte-1.png', ...data }
  db.canchas.push(item); save(db); return item
}
export function updateCancha(id, changes) {
  const i = db.canchas.findIndex(c => c.id === Number(id))
  if (i === -1) return null
  db.canchas[i] = { ...db.canchas[i], ...changes }
  save(db); return db.canchas[i]
}
export function deleteCancha(id) {
  const len = db.canchas.length
  db.canchas = db.canchas.filter(c => c.id !== Number(id))
  save(db); return db.canchas.length < len
}

// Reservas
export function listReservas() { return [...db.reservas] }
export function createReserva(data) {
  const item = { id: nextId(db.reservas), ...data }
  db.reservas.push(item); save(db); return item
}
export function deleteReserva(id) {
  db.reservas = db.reservas.filter(r => r.id !== Number(id))
  save(db)
}
