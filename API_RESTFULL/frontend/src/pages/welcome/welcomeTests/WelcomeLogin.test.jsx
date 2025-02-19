import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Welcome from "../Welcome.page";
import { login } from "../../../services/welcome.service";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import WebSocketContext from "../../../contexts/WebSocketsContext";

vi.mock("../../../services/welcome.service");

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => ({
  ...(await vi.importActual("react-router-dom")),
  useNavigate: () => mockNavigate,
}));

describe("Welcome Component", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test("should navigate to /dashboard for admin role", async () => {
    login.mockResolvedValue({ username: "adminUser", role: "admin" });

    const mockWebSocketContext = { logIn: vi.fn() };

    render(
      <WebSocketContext.Provider value={mockWebSocketContext}>
        <MemoryRouter>
          <Welcome />
        </MemoryRouter>
      </WebSocketContext.Provider>
    );

    const nameInput = screen.getByPlaceholderText("John Doe");
    const passwordInput = screen.getByPlaceholderText("Tu contraseña");
    const submitButton = screen.getByText("Iniciar sesión");

    fireEvent.change(nameInput, { target: { value: "adminUser" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/dashboard", expect.any(Object));
    });
  });

  test("should navigate to /menu for non-admin role", async () => {
    login.mockResolvedValue({ username: "normalUser", role: "user" });

    const mockWebSocketContext = { logIn: vi.fn() };

    render(
      <WebSocketContext.Provider value={mockWebSocketContext}>
        <MemoryRouter>
          <Welcome />
        </MemoryRouter>
      </WebSocketContext.Provider>
    );

    const nameInput = screen.getByPlaceholderText("John Doe");
    const passwordInput = screen.getByPlaceholderText("Tu contraseña");
    const submitButton = screen.getByText("Iniciar sesión");

    fireEvent.change(nameInput, { target: { value: "normalUser" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/menu", expect.any(Object));
    });
  });
});
