import { useState } from 'react'
import { listCanchas, createCancha, updateCancha, deleteCancha, listSedes } from '../../data/db'

export default function AdminCanchas() {
  const [items, setItems] = useState(listCanchas())
  const [form, setForm] = useState({
    sedeId: 'mall-plaza-norte',
    nombre: '',
    tipo: 'futbolito',
    precioHora: 15000,
    promo: false,
    img: '/images/canchas/mallnorte-1.png'
  })

  function refresh() { setItems(listCanchas()) }
  function add(e) {
    e.preventDefault()
    createCancha({ ...form, precioHora: Number(form.precioHora), promo: !!form.promo })
    setForm({
      sedeId: form.sedeId,
      nombre: '',
      tipo: 'futbolito',
      precioHora: 15000,
      promo: false,
      img: '/images/canchas/mallnorte-1.png'
    })
    refresh()
  }
  function updateField(id, field, value) {
    const val = (field === 'precioHora') ? Number(value) : value
    updateCancha(id, { [field]: val })
    refresh()
  }

  const sedes = listSedes()

  return (
    <div>
      <h3>Canchas</h3>
      <form className="row g-2" onSubmit={add}>
        <div className="col-12 col-md-3">
          <select className="form-select" value={form.sedeId} onChange={e => setForm({ ...form, sedeId: e.target.value })}>
            {sedes.map(s => <option key={s.id} value={s.id}>{s.nombre}</option>)}
          </select>
        </div>
        <div className="col-12 col-md-3">
          <input className="form-control" placeholder="Nombre" value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })} required />
        </div>
        <div className="col-12 col-md-2">
          <select className="form-select" value={form.tipo} onChange={e => setForm({ ...form, tipo: e.target.value })}>
            <option value="futbolito">Futbolito</option>
            <option value="baby">Baby</option>
            <option value="futbol">Fútbol 11</option>
          </select>
        </div>
        <div className="col-12 col-md-2">
          <input className="form-control" type="number" min="0" value={form.precioHora} onChange={e => setForm({ ...form, precioHora: e.target.value })} />
        </div>
        <div className="col-12 col-md-6">
          <input className="form-control" placeholder="URL Imagen (ej: /images/canchas/mallnorte-1.png)" value={form.img} onChange={e => setForm({ ...form, img: e.target.value })} />
        </div>
        <div className="col-12 col-md-2 d-flex align-items-center">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="promo" checked={!!form.promo} onChange={e => setForm({ ...form, promo: e.target.checked })}/>
            <label className="form-check-label" htmlFor="promo">Promo</label>
          </div>
        </div>
        <div className="col-12 col-md-2">
          <button className="btn btn-primary w-100" type="submit">Agregar</button>
        </div>
      </form>

      <div className="table-responsive mt-3">
        <table className="table table-sm">
          <thead>
            <tr>
              <th>ID</th><th>Sede</th><th>Nombre</th><th>Tipo</th><th>Precio</th><th>Promo</th><th>Imagen</th><th></th>
            </tr>
          </thead>
          <tbody>
            {items.map(c => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.sedeId}</td>
                <td><input className="form-control form-control-sm" defaultValue={c.nombre} onBlur={e => updateField(c.id, 'nombre', e.target.value)} /></td>
                <td>
                  <select className="form-select form-select-sm" defaultValue={c.tipo} onChange={e => updateField(c.id, 'tipo', e.target.value)}>
                    <option value="futbolito">Futbolito</option>
                    <option value="baby">Baby</option>
                    <option value="futbol">Fútbol 11</option>
                  </select>
                </td>
                <td><input className="form-control form-control-sm" type="number" defaultValue={c.precioHora} onBlur={e => updateField(c.id, 'precioHora', e.target.value)} /></td>
                <td>
                  <input type="checkbox" defaultChecked={!!c.promo} onChange={e => updateField(c.id, 'promo', e.target.checked)} />
                </td>
                <td style={{minWidth: '240px'}}>
                  <input className="form-control form-control-sm" defaultValue={c.img} onBlur={e => updateField(c.id, 'img', e.target.value)} />
                </td>
                <td><button className="btn btn-sm btn-outline-danger" onClick={() => { deleteCancha(c.id); refresh() }}>Eliminar</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
