import { render, screen, fireEvent } from "@testing-library/react";
import Welcome from "../Welcome.page";
import { login } from "../../../services/welcome.service";
import { MemoryRouter } from "react-router-dom";
import WebSocketContext from "../../../contexts/WebSocketsContext";
import { vi } from "vitest";

vi.mock("../../../services/welcome.service");

test("muestra error al introducir un usuario incorrecto", async () => {
  login.mockRejectedValueOnce(new Error("Invalid credentials"));

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

  fireEvent.change(nameInput, { target: { value: "wrongUser" } });
  fireEvent.change(passwordInput, { target: { value: "correctPassword" } });
  fireEvent.click(submitButton);

  const errorMessage = await screen.findByText("Usuario invalido");
  expect(errorMessage).toBeInTheDocument();
});
