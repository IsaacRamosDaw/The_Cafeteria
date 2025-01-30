import { render, screen, fireEvent } from "@testing-library/react";
import Welcome from "../Welcome.page";
import { login } from "../../../services/welcome.service";
import { MemoryRouter } from "react-router-dom";

vi.mock("../../../services/welcome.service");

describe("Welcome Component - Manejo de errores", () => {
  test("muestra error al introducir una contraseña incorrecta", async () => {
    login.mockRejectedValueOnce(new Error("Invalid credentials"));

    render(
      <MemoryRouter>
        <Welcome />
      </MemoryRouter>
    );

    const nameInput = screen.getByPlaceholderText("John Doe");
    const passwordInput = screen.getByPlaceholderText("Tu contraseña");
    const submitButton = screen.getByText("Iniciar sesión");

    fireEvent.change(nameInput, { target: { value: "correctUser" } });
    fireEvent.change(passwordInput, { target: { value: "wrongPassword" } });
    fireEvent.click(submitButton);

    const errorMessage = await screen.findByText("Usuario invalido");
    expect(errorMessage).toBeInTheDocument();
  });
});
