import React from "react";

export default function Contacto() {
  return (
    <div>
      
      <div className="hero-300 mb-4 shadow-sm position-relative">
        <img
          src="/images/contacto.jpg" 
          alt="Contáctanos"
          className="w-100"
          style={{ height: "300px", objectFit: "cover" }}
        />
        <div className="position-absolute top-50 start-50 translate-middle text-white text-center">
          <h1 className="fw-bold">Contáctanos</h1>
          <h4 className="fw-bold">Síguenos, conoce quiénes somos y dónde estamos</h4>
        </div>
      </div>

      
      <div className="container my-5">
        <h2 className="mb-3">¿Quiénes somos?</h2>
        <p>
          Somos una comunidad dedicada a conectar a todos los alumnos de duoc a traves de chile apasionados por el deporte. Nuestro objetivo es ofrecer una experiencia simple y rápida
          para que puedas utilizar y reservar las canchas de tu sede.
        </p>

        <h3 className="mt-5">Síguenos en redes</h3>
        <ul className="list-unstyled">
          <li>📸 Instagram: <a href="https://instagram.com" target="_blank"> @duocuc_canchas </a></li>
          <li>📘 Facebook: <a href="https://facebook.com" target="_blank"> Canchas Duoc UC </a></li>
          <li>📧 Correo: contacto@duocuc.cl</li>
        </ul>
      </div>

      
      <div className="container mb-5">
        <h3 className="mb-3">Nuestra ubicación</h3>
        <div className="ratio ratio-16x9">
          <iframe
            title="Ubicación DUOC UC"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3332.2920762226695!2d-70.68076012451426!3d-33.36343997342422!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662c7025c925e0f%3A0x7f2f6a657c08d14a!2sDuoc%20UC%3A%20Sede%20Plaza%20Norte!5e0!3m2!1ses!2scl!4v1762225505674!5m2!1ses!2scl"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
           ></iframe>
        </div>
      </div>
    </div>
  );
}
