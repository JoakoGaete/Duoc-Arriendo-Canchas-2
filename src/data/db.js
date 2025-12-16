// src/data/db.js
import axios from 'axios';

// =========================================================================
// Funciones de UTILIDAD LOCAL (No deben comunicarse con microservicios)
// Solo la lógica de autenticación necesita gestionar el usuario activo localmente
// para que el frontend lo use (o bien obtenerlo siempre del backend).
// En esta solución, mantendremos getUsuarioActivo y setUsuarioActivo para simplificar
// el consumo en componentes como Navbar, pero haremos que getUsuarioActivo llame al backend.
// =========================================================================

// Esta función ahora solo obtiene el estado de sesión del backend.
export async function getUsuarioActivo() {
  try {
    // Usamos la ruta proxied /users/activo (configurada en vite.config.js para 8085)
    const res = await axios.get('/users/activo', { withCredentials: true });
    // Asume que el microservicio devuelve el objeto de usuario si hay sesión, o un error/status 204 si no hay.
    return res.data; 
  } catch (error) {
    // Si hay un error (ej. 401 Unauthorized o error de conexión), no hay usuario activo.
    return null;
  }
}

// =========================================================================
// MÓDULO: FIELD-SERVICE (Canchas / Sedes / Ofertas)
// Rutas asumidas: /api/fields, /api/fields/locations, etc.
// =========================================================================

// Sedes
export async function listSedes() {
  // Asume que el Field-Service tiene un endpoint para listar sedes/ubicaciones
  const res = await axios.get('/api/fields/locations');
  return res.data;
}

// Listar todas las canchas (para la vista Canchas general)
export async function listCanchas() {
  const res = await axios.get('/api/fields');
  return res.data;
}

// Listar canchas por sede
export async function listCanchasBySede(sedeId) {
  // Asume que el Field-Service soporta un query parameter para filtrar por ubicación
  const res = await axios.get(`/api/fields?location=${sedeId}`);
  return res.data;
}

// Listar canchas en promoción/ofertas
export async function listCanchasPromo() {
  // Asume que el Field-Service soporta un query parameter para filtrar por promoción
  const res = await axios.get('/api/fields?promo=true');
  return res.data;
}

// Crear una cancha (Admin)
export async function createCancha(data) {
  const res = await axios.post('/api/fields', data);
  return res.data;
}

// Actualizar una cancha (Admin)
export async function updateCancha(id, changes) {
  const res = await axios.put(`/api/fields/${id}`, changes);
  return res.data;
}

// Eliminar una cancha (Admin)
export async function deleteCancha(id) {
  await axios.delete(`/api/fields/${id}`);
  // No devuelve nada o true/false, si hay éxito, la llamada no lanza error.
  return true;
}

// Se elimina la función listCanchasFiltradas porque la filtración se hará en el frontend o con query params de la API.


// =========================================================================
// MÓDULO: BOOKING-SERVICE (Reservas)
// Rutas asumidas: /api/bookings/admin, /api/bookings/user/{email}, etc.
// =========================================================================

// Listar todas las reservas (Admin)
export async function listReservas() {
  // Asume un endpoint exclusivo para el admin
  const res = await axios.get('/api/bookings/admin');
  return res.data;
}

// Obtener reservas por usuario
export async function getReservasByUser(email) {
  // Nota: El email debe ser enviado como parte de los query params
  const res = await axios.get(`/api/bookings/user?email=${email}`);
  return res.data;
}

// Eliminar reserva (Admin)
export async function deleteReserva(id) {
  await axios.delete(`/api/bookings/${id}`);
  return true;
}

// La función createReserva() se elimina, ya que la llamada a la API
// ya se realiza directamente en src/pages/Reserva.jsx.


// =========================================================================
// MÓDULO: USER-SERVICE (Autenticación)
// Rutas asumidas: /users/login, /users/logout, /users/register
// Nota: registrarUsuario ya fue actualizado en el paso anterior,
// pero la incluyo aquí por completitud.
// =========================================================================

export async function login(email, password) {
  // La sesión la maneja el backend, solo enviamos credenciales
  const res = await axios.post('/users/login', { email, password });
  return res.data; // Debería devolver el objeto de usuario (con rol, id, etc.)
}

export async function logout() {
  // Petición al backend para limpiar la sesión/cookies
  await axios.post('/users/logout');
}

export async function registrarUsuario(nombre, email, password) {
  // Se deja un stub que probablemente ya actualizaste en Registro.jsx, pero por si acaso.
  try {
    await axios.post('/users/register', { nombre, email, password });
    return true;
  } catch (error) {
    // Si el backend lanza un error (ej. usuario ya existe), devolvemos false
    return false;
  }
}