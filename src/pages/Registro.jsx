import { useState } from "react";
import { registrarUsuario } from "../data/db";
import { useNavigate, Link } from "react-router-dom";

export default function Registro() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ nombre: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    console.log("Intentando registrar usuario:", form);
    e.preventDefault();
    

    // 🔹 Validar dominio de correo
    if (!(form.email.endsWith("@duocuc.cl")||form.email.endsWith("@profesorduoc.cl") ) ){
      setError("El correo debe pertenecer al dominio @duocuc.cl o @profesorduoc.cl");
      return;
    }

    // 🔹 Validar seguridad de contraseña
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
    if (!passwordRegex.test(form.password)) {
      setError(
        "La contraseña debe tener al menos 6 caracteres, una mayúscula y un número."
      );
      return;
    }

    // 🔹 Intentar registrar usuario
    const exito = registrarUsuario(form.nombre, form.email, form.password);
    if (exito) {
      navigate("/login");
    } else {
      setError("Ya existe un usuario con ese correo.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Crear cuenta</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Correo electrónico</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <div className="form-text">
            Solo se permiten correos del dominio <strong>@duocuc.cl o @profesorduoc.cl</strong>
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <div className="form-text">
            Mínimo 6 caracteres, una mayúscula y un número.
          </div>
        </div>
        <button type="submit" className="btn btn-primary w-100">
            Registrarse
        </button>
      </form>

      <div className="text-center mt-3">
        ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
      </div>
    </div>
  );
}


