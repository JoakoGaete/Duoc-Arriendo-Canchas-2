import { Outlet, NavLink } from 'react-router-dom'

export default function AdminLayout() {
  return (
    <div className="row">
      <aside className="col-12 col-md-3 mb-3">
        <div className="list-group">
          <NavLink className="list-group-item list-group-item-action" to="/admin/canchas">Canchas</NavLink>
          <NavLink className="list-group-item list-group-item-action" to="/admin/reservas">Reservas</NavLink>
        </div>
      </aside>
      <section className="col-12 col-md-9">
        <Outlet />
      </section>
    </div>
  )
}
