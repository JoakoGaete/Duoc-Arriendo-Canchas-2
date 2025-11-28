import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

// --- MOCKS DB ---
vi.mock("../data/db", () => ({
  listCanchas: () => [
    {
      id: "1",
      nombre: "Cancha 1 Futbolito",
      tipo: "Fútbol",
      precioHora: 12000,
      sedeId: "sede-centro",
      img: "/test.jpg"
    }
  ],
  listSedes: () => [
    { id: 'sede-centro', nombre: 'DUOC UC — Sede Centro' }
  ],
  listCanchasBySede: (sedeId) => [
    {
      id: "1",
      nombre: "Cancha Futbol",
      tipo: "Fútbol",
      precioHora: 12000,
      sedeId,
      img: "/test.jpg"
    }
  ]
}));

// --- MOCKS DEL CONTEXTO ---
const mockSetSede = vi.fn();
const mockSetCancha = vi.fn();
vi.mock("../../context/ReservaContext", () => ({
  __esModule: true,
  useReserva: () => ({
    setSede: mockSetSede,
    setCancha: mockSetCancha
  })
}));

// --- MOCK DEL NAVIGATE ---
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    __esModule: true,
    ...actual,
    useNavigate: () => mockNavigate
  };
});

// --- IMPORTAR HOME DESPUÉS DE LOS MOCKS ---
import Home from "../Home";

// --- RENDER HELPER ---
function renderHome() {
  return render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );
}

// --- TESTS ---
describe("Home Page", () => {
  it("renderiza la imagen principal", () => {
    renderHome();
    const img = screen.getByAltText("Canchas DUOC UC");
    expect(img).toBeInTheDocument();
  });

  it("muestra la lista de canchas desde el mock", () => {
    renderHome();
    expect(screen.getByText("Cancha 1 Futbolito")).toBeInTheDocument();
  });

  it("muestra el precio formateado en CLP", () => {
    renderHome();
    expect(screen.getByText(/\$12\.000/)).toBeInTheDocument();
  });

  it("ejecuta reservarRapido correctamente", () => {
    renderHome();
    const btns = screen.getAllByText("Reservar");
    fireEvent.click(btns[0]);
    expect(mockSetSede).toHaveBeenCalledWith("mall-plaza-norte");
    expect(mockSetCancha).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith("/reserva");
  });

  it("renderiza el link 'Ver más' correctamente", () => {
    renderHome();
    const links = screen.getAllByText("Ver más");
    expect(links[0].getAttribute("href")).toBe("/sedes/mall-plaza-norte");
  });
});
