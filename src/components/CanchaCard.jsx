// src/components/CanchaCard.jsx
import { Link } from "react-router-dom";

export default function CanchaCard({ cancha, onReservar }) {
  const imgSrc = cancha?.imageUrl
    ? `/images/${cancha.imageUrl}.jpg`
    : "/images/placeholder.jpg";

  return (
    <div className="card cancha-card shadow-sm h-100">
      {/* Imagen */}
      <div className="card-img-wrapper">
        <img
          src={imgSrc}
          alt={cancha?.name || "Cancha"}
          className="card-img-top cancha-img"
          onError={(e) => {
            e.target.src = "/images/placeholder.jpg";
          }}
        />

        {/* Badges sobre la imagen */}
        <span className="badge badge-deporte">
          <i className="bi bi-trophy-fill me-1" />
          {cancha?.type || "Multideporte"}
        </span>

        <span className="badge badge-ubicacion">
          <i className="bi bi-geo-alt-fill me-1" />
          {cancha?.location || "Sede DUOC UC"}
        </span>
      </div>

      {/* Contenido */}
      <div className="card-body d-flex flex-column">
        <h5 className="card-title fw-bold">{cancha?.name || "Cancha"}</h5>

        <p className="card-text text-muted small mb-2">
          <i className="bi bi-clock me-1" />
          Reserva por hora
        </p>

        <p className="precio-card mb-3">
          <i className="bi bi-cash-stack me-2" />
          <span className="fw-bold">
            $
            {cancha?.pricePerHour
              ? cancha.pricePerHour.toLocaleString("es-CL")
              : 0}
          </span>{" "}
          / hora
        </p>

        {/* Botón principal + link de detalles */}
        <div className="mt-auto">
          <button
            type="button"
            className="btn btn-primary w-100 reservar-btn"
            onClick={() => onReservar && onReservar(cancha)}
          >
            Reservar ahora <i className="bi bi-arrow-right-short" />
          </button>

          <Link
            to={`/canchas/${cancha?.id}`}
            className="d-inline-block mt-2 small text-muted"
          >
            <i className="bi bi-info-circle me-1" />
            Ver detalles de la cancha
          </Link>
        </div>
      </div>
    </div>
  );
}
