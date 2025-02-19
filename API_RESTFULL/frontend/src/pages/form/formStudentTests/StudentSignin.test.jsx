// import { render, screen, fireEvent, waitFor } from "@testing-library/react";
// import StudentForm from "../StudentForm.page";
// import { create } from "../../../services/student.service";
// import { get } from "../../../services/course.service";
// import { MemoryRouter } from "react-router-dom";
// import { vi, describe, afterEach, test, expect } from "vitest";

// vi.mock("../../../services/student.service");
// vi.mock("../../../services/course.service");

// const mockNavigate = vi.fn();
// vi.mock("react-router-dom", async () => ({
//     ...(await vi.importActual("react-router-dom")),
//     useNavigate: () => mockNavigate,
// }));

// describe("StudentForm Component", () => {
//     afterEach(() => {
//         vi.clearAllMocks();
//     });

//     test("should navigate to / after successful registration", async () => {
//         // Mock del servicio get (para los cursos)
//         const mockCourses = [
//             { id: "1", name: "1ºESO" },
//             { id: "2", name: "2ºESO" },
//         ];
//         get.mockResolvedValueOnce(mockCourses);

//         // Mock del servicio create
//         create.mockResolvedValueOnce({ message: "User created successfully" });

//         // Renderizamos el formulario
//         render(
//             <MemoryRouter>
//                 <StudentForm />
//             </MemoryRouter>
//         );

//         // Esperamos a que los cursos se carguen
//         await waitFor(() => {
//             expect(screen.getByText("1ºESO")).toBeInTheDocument();
//         });

//         // Seleccionar elementos
//         const nameInput = screen.getByPlaceholderText("Introduce tu nombre");
//         const ageInput = screen.getByPlaceholderText("Introduce tu edad");
//         const telephoneInput = screen.getByPlaceholderText("Introduce tu teléfono");
//         const passwordInput = screen.getByPlaceholderText("Escribe tu contraseña");
//         const selectElement = screen.getByLabelText("Selecciona tu curso");
//         const submitButton = screen.getByText("Registrarme");

//         // Simular eventos
//         fireEvent.change(nameInput, { target: { value: "Juan" } });
//         fireEvent.change(ageInput, { target: { value: "16" } });
//         fireEvent.change(telephoneInput, { target: { value: "43564576" } });
//         fireEvent.change(passwordInput, { target: { value: "1234" } });
//         fireEvent.change(selectElement, { target: { value: "1" } });

//         // Simular clic en el botón de enviar
//         fireEvent.click(submitButton);

//         // Esperar a que la función de creación sea llamada
//         await waitFor(() => {
//             expect(create).toHaveBeenCalledWith({
//                 username: "Juan",
//                 password: "1234",
//                 age: "16",
//                 phone: "43564576",
//                 CourseId: "1",
//             });
//         });

//         // Verificar que se llamó a navigate con -1
//         expect(mockNavigate).toHaveBeenCalledWith(-1);
//     });
// });
