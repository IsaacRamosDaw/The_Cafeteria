import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Welcome from "../Welcome.page";
import { login } from "../../../services/welcome.service";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";

// Mockeamos el servicio login
vi.mock("../../../services/welcome.service");

// Creamos un mock para useNavigate antes de cualquier test
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => ({
  ...(await vi.importActual("react-router-dom")),
  useNavigate: () => mockNavigate,
}));

describe("Welcome Component", () => {
  afterEach(() => {
    vi.clearAllMocks(); // Limpiamos los mocks después de cada test
  });

  test("should navigate to /dashboard for admin role", async () => {
    // Simula que el login devuelve un usuario con rol admin
    login.mockResolvedValue({ username: "adminUser", role: "admin" });

    // Renderiza el componente envuelto en MemoryRouter
    render(
      <MemoryRouter>
        <Welcome />
      </MemoryRouter>
    );

    // Seleccionamos los elementos de entrada y botón en el formulario
    const nameInput = screen.getByPlaceholderText("John Doe");
    const passwordInput = screen.getByPlaceholderText("Tu contraseña");
    const submitButton = screen.getByText("Iniciar sesión");

    // Simulamos escribir en los inputs
    fireEvent.change(nameInput, { target: { value: "adminUser" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    // Simulamos el clic en el botón de enviar
    fireEvent.click(submitButton);

    // Esperamos a que la navegación se realice
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
    });
  });

  test("should navigate to /menu for non-admin role", async () => {
    // Simula que el login devuelve un usuario con rol no admin
    login.mockResolvedValue({ username: "normalUser", role: "user" });

    // Renderiza el componente envuelto en MemoryRouter
    render(
      <MemoryRouter>
        <Welcome />
      </MemoryRouter>
    );

    // Seleccionamos los elementos de entrada y botón en el formulario
    const nameInput = screen.getByPlaceholderText("John Doe");
    const passwordInput = screen.getByPlaceholderText("Tu contraseña");
    const submitButton = screen.getByText("Iniciar sesión");

    // Simulamos escribir en los inputs
    fireEvent.change(nameInput, { target: { value: "normalUser" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    // Simulamos el clic en el botón de enviar
    fireEvent.click(submitButton);

    // Esperamos a que la navegación se realice
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/menu");
    });
  });
});