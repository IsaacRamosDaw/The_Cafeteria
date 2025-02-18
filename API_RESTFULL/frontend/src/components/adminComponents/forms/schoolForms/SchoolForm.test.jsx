import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SchoolForm from "./SchoolForm";
import { create, editImg } from "../../../../services/school.service";

vi.mock("../../../../services/school.service", () => ({
  create: jest.fn(),
  editImg: jest.fn(),
}));

describe("SchoolForm", () => {
  test("debería crear un colegio exitosamente", async () => {
    create.mockResolvedValue({ id: 1 });
    editImg.mockResolvedValue({});

    render(
      <MemoryRouter>
        <SchoolForm />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText("Nombre"), { target: { value: "Colegio Test" } });
    fireEvent.change(screen.getByLabelText("Direccion"), { target: { value: "Calle Test" } });
    fireEvent.change(screen.getByLabelText("Correo"), { target: { value: "test@colegio.com" } });
    fireEvent.change(screen.getByLabelText("Telefono"), { target: { value: "123456789" } });
    
    fireEvent.click(screen.getByText("Crear"));

    await screen.findByText("Colegio creado exitosamente");
    expect(create).toHaveBeenCalled();
    expect(editImg).toHaveBeenCalled();
  });

  test("debería fallar al crear un colegio si falta información", async () => {
    create.mockRejectedValue(new Error("Error en la creación"));

    render(
      <MemoryRouter>
        <SchoolForm />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Crear"));

    await screen.findByText("Error en el proceso de creación:");
    expect(create).toHaveBeenCalled();
  });
});
