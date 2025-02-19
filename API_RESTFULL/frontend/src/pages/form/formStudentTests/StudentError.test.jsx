// import { render, screen, fireEvent, waitFor } from "@testing-library/react";
// import StudentForm from "../StudentForm.page";
// import { create } from "../../../services/student.service";
// import { get } from "../../../services/course.service";
// import { MemoryRouter } from "react-router-dom";
// import { afterEach, describe, vi } from "vitest";

// vi.mock("../../../services/student.service");
// vi.mock("../../../services/course.service");

// const mockNavigate = vi.fn();
// vi.mock("react-router-dom", async () => ({
//   ...(await vi.importActual("react-router-dom")),
//   useNavigate: () => mockNavigate,
// }));

// describe("StudentForm Component", () => {
//   afterEach(() => {
//     vi.clearAllMocks();
//   });

//   test("should show error messages when registration fails", async () => {
//     get.mockResolvedValueOnce(
//       [
//         {
//           id: "1",
//           name: "Curso 1"
//         },
//         {
//           id: "2",
//           name: "Curso 2"
//         }
//       ]);

//     create.mockRejectedValueOnce(new Error("Error al crear el usuario"));

//     render(
//       <MemoryRouter>
//         <StudentForm />
//       </MemoryRouter>
//     );

//     await waitFor(() => expect(screen.getByRole("combobox", { name: "Selecciona tu curso" })).not.toBeDisabled());

//     const nameInput = screen.getByPlaceholderText("Introduce tu nombre");
//     const ageInput = screen.getByPlaceholderText("Introduce tu edad");
//     const phoneInput = screen.getByPlaceholderText("Introduce tu teléfono");
//     const passwordInput = screen.getByPlaceholderText("Escribe tu contraseña");
//     const selectElement = screen.getByRole("combobox");
//     const submitButton = screen.getByText("Registrarme");


//     fireEvent.change(nameInput, { target: { value: "Juan" } });
//     fireEvent.change(ageInput, { target: { value: "16" } });
//     fireEvent.change(phoneInput, { target: { value: "432345678" } });
//     fireEvent.change(passwordInput, { target: { value: "1234" } });
//     fireEvent.change(selectElement, { target: { value: "1" } });

//     await waitFor(() => expect(selectElement.value).toBe("1"));

//     await waitFor(() => expect(submitButton).not.toBeDisabled());

//     fireEvent.click(submitButton);

//     await waitFor(() => {
//       expect(create).toHaveBeenCalledWith({
//         username: "Juan",
//         password: "1234",
//         age: "16",
//         phone: "432345678",
//         CourseId: "1",
//       });
//     });

//     // Verificar que el mensaje de error aparece en la pantalla
//     await waitFor(() => {
//       const errorMessage = screen.queryByText(/error creando el usuario/i);
//       expect(errorMessage).toBeInTheDocument();
//     });

//     // Asegurar que la navegación NO ocurrió después de un error
//     expect(mockNavigate).not.toHaveBeenCalled();
//   });
// })
