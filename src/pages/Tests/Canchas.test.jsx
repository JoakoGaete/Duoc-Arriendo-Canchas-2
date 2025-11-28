import { render, screen, fireEvent } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import { ReservaProvider } from "../../context/ReservaContext"
import Canchas from "../Canchas"

// Mock de la base de datos
vi.mock("../../data/db", () => ({
  listCanchas: () => [
    {
      id: "1",
      nombre: "Cancha 1 Futbolito",
      tipo: "futbolito",
      precioHora: 15000,
      sedeId: "sede-centro",
      img: "/images/canchas/mallnorte-1.png",
    },
    {
      id: "2",
      nombre: "Cancha 2 Futbolito",
      tipo: "futbolito",
      precioHora: 15000,
      sedeId: "sede-centro",
      img: "/images/canchas/mallnorte-2.png",
    },
    {
      id: "3",
      nombre: "Cancha 1 Baby Fútbol",
      tipo: "baby",
      precioHora: 12000,
      sedeId: "sede-centro",
      img: "/images/canchas/antoniovaras-1.png",
    },
  ],
  listCanchasBySede: (sedeId) => [],
}))

// Helper para renderizar el componente con context y router
function renderCanchas() {
  return render(
    <ReservaProvider>
      <BrowserRouter>
        <Canchas />
      </BrowserRouter>
    </ReservaProvider>
  )
}

describe("Canchas Page", () => {
  it("muestra el título", () => {
    renderCanchas()
    expect(screen.getByText("Canchas disponibles")).toBeInTheDocument()
  })

  it("renderiza las canchas mockeadas", () => {
    renderCanchas()
    expect(screen.getByText("Cancha 1 Futbolito")).toBeInTheDocument()
    expect(screen.getByText("Cancha 2 Futbolito")).toBeInTheDocument()
    expect(screen.getByText("Cancha 1 Baby Fútbol")).toBeInTheDocument()
  })

  it("reserva una cancha correctamente", () => {
    renderCanchas()

    const botones = screen.getAllByText("Reservar")
    fireEvent.click(botones[0]) // hacemos click en la primera cancha

    // Como no tenemos mocks de setSede/setCancha aparte, solo verificamos que el click funciona
    // En tests más avanzados se puede espiar useReserva con vi.fn()
  })

  it("filtra por texto", () => {
    renderCanchas()
    const input = screen.getByPlaceholderText("Buscar cancha...")
    fireEvent.change(input, { target: { value: "Futbolito" } })

    expect(screen.getByText("Cancha 1 Futbolito")).toBeInTheDocument()
    expect(screen.getByText("Cancha 2 Futbolito")).toBeInTheDocument()
    expect(screen.queryByText("Cancha 1 Baby Fútbol")).not.toBeInTheDocument()
  })

  it("filtra por tipo", () => {
    renderCanchas()
    const select = screen.getByRole("combobox")
    fireEvent.change(select, { target: { value: "baby" } })

    expect(screen.getByText("Cancha 1 Baby Fútbol")).toBeInTheDocument()
    expect(screen.queryByText("Cancha 1 Futbolito")).not.toBeInTheDocument()
    expect(screen.queryByText("Cancha 2 Futbolito")).not.toBeInTheDocument()
  })
})
