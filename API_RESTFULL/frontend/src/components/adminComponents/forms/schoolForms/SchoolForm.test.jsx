import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SchoolForm from "./SchoolForm";
import { create, editImg, getOne, get} from "../../../../services/school.service";

vi.mock("../../../../services/school.service", async () => ({
  create: vi.fn(),
  editImg: vi.fn(),
  getOne: vi.fn().mockResolvedValue({ id: 1, name: "Colegio Test", address: "Calle Test" }),
  get: vi.fn()
}));

describe("SchoolForm", () => {
  // test("debería crear un colegio exitosamente", async () => {
  //   create.mockResolvedValue({ id: 1 });
  //   editImg.mockResolvedValue({});
  
  //   render(
  //     <MemoryRouter>
  //       <SchoolForm />
  //     </MemoryRouter>
  //   );
  
  //   fireEvent.change(screen.getByLabelText("Nombre"), { target: { value: "Colegio Test" } });
  //   fireEvent.change(screen.getByLabelText("Direccion"), { target: { value: "Calle Test" } });
  //   fireEvent.change(screen.getByLabelText("Correo"), { target: { value: "test@colegio.com" } });
  //   fireEvent.change(screen.getByLabelText("Telefono"), { target: { value: "123456789" } });
  //   fireEvent.change(screen.getByLabelText("Foto del colegio"), { target: { files: ["fakefile.jpg"] } });

  //   fireEvent.submit(screen.getByTestId("form"));
  //   fireEvent.submit(screen.getByText("Crear"));
  
  //   expect(create).toHaveBeenCalled();
  //   expect(editImg).toHaveBeenCalled();
  // });

  test("debería fallar al crear un colegio si falta información", async () => {
    create.mockRejectedValue(new Error("Error en la creación"));

    render(
      <MemoryRouter>
        <SchoolForm />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Crear"));
    expect(create).toHaveBeenCalled();
  });
});
