import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import StudentForm from "../StudentForm.page";
import { create } from "../../../services/student.service";
import { get } from "../../../services/course.service"; // Asegúrate de importar `get`
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, vi } from "vitest";

// Mock de servicios
vi.mock("../../../services/student.service");
vi.mock("../../../services/course.service");

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => ({
  ...(await vi.importActual("react-router-dom")),
  useNavigate: () => mockNavigate,
}));

describe("StudentForm Component", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test("should show error messages when registration fails", async () => {
    // Simula la respuesta de `get` para devolver cursos
    get.mockResolvedValueOnce([{ id: "1", name: "Curso 1" }, { id: "2", name: "Curso 2" }]);

    // Simula un error en la creación del usuario
    create.mockRejectedValueOnce(new Error("Error al crear el usuario"));

    render(
      <MemoryRouter>
        <StudentForm />
      </MemoryRouter>
    );

    const nameInput = screen.getByPlaceholderText("Introduce tu nombre");
    const ageInput = screen.getByPlaceholderText("Introduce tu edad");
    const phoneInput = screen.getByPlaceholderText("Introduce tu teléfono");
    const passwordInput = screen.getByPlaceholderText("Escribe tu contraseña");
    const selectElement = screen.getByLabelText("Selecciona tu curso");
    const submitButton = screen.getByText("Registrarme");

    fireEvent.change(nameInput, { target: { value: "Juan" } });
    fireEvent.change(ageInput, { target: { value: "16" } });
    fireEvent.change(phoneInput, { target: { value: "432345678" } });
    fireEvent.change(passwordInput, { target: { value: "1234" } });
    fireEvent.change(selectElement, { target: { value: "1" } });

    fireEvent.click(submitButton);

    // Asegúrate de que la función `create` se haya llamado con los valores correctos
    await waitFor(() => {
      expect(create).toHaveBeenCalledWith({
        username: "Juan",
        password: "1234",
        age: "16",
        phone: "432345678",
        CourseId: "1",
      });
    });

    // Verifica que el error de creación del usuario sea mostrado
    await waitFor(() => {
      expect(
        screen.getByText("Error creando el usuario: Error al crear el usuario")
      ).toBeInTheDocument();
    });

    // Verifica que la navegación no haya ocurrido debido al error
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
