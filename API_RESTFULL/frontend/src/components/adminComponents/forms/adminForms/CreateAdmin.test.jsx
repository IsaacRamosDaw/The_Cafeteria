import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CreateAdmin from "./CreateAdmin.page";
import { create, editImg } from "../../../../services/admin.service";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";

beforeEach(() => {
    vi.clearAllMocks();
  });
  

vi.mock("../../../../services/admin.service", () => ({
  create: vi.fn(),
  editImg: vi.fn(),
}));


describe("CreateAdmin", () => {
  const renderComponent = () => {
    return render(
      <MemoryRouter>
        <CreateAdmin />
      </MemoryRouter>
    );
  };

  test("Debe crear un administrador correctamente", async () => {
    create.mockResolvedValue({ admin: { id: 1 } });
    editImg.mockResolvedValue({});

    renderComponent();

    fireEvent.change(screen.getByPlaceholderText("Nombre del administrador"), { target: { value: "AdminTest" } });
    fireEvent.change(screen.getByPlaceholderText("Contraseña del administrador"), { target: { value: "password123" } });
    
    const fileInput = screen.getByPlaceholderText("Foto del administrador");
    const file = new File(["dummy content"], "profile.jpg", { type: "image/jpeg" });
    fireEvent.change(fileInput, { target: { files: [file] } });

    fireEvent.click(screen.getByText("Crear"));

    await waitFor(() => {
      expect(create).toHaveBeenCalledWith({
        username: "AdminTest",
        password: "password123",
        file,
      });
      expect(editImg).toHaveBeenCalledWith(1, file);
    });
  });

  test("Debe manejar error en la creación del administrador", async () => {
    create.mockRejectedValue(new Error("Error en la creación"));
  
    renderComponent();
  
    fireEvent.change(screen.getByPlaceholderText("Nombre del administrador"), { target: { value: "AdminTest" } });
    fireEvent.change(screen.getByPlaceholderText("Contraseña del administrador"), { target: { value: "password123" } });
  
    const fileInput = screen.getByPlaceholderText("Foto del administrador");
    const file = new File(["dummy content"], "profile.jpg", { type: "image/jpeg" });
    fireEvent.change(fileInput, { target: { files: [file] } });
  
    fireEvent.click(screen.getByText("Crear"));
  
    await waitFor(() => {
      expect(create).toHaveBeenCalled();
      expect(editImg).not.toHaveBeenCalled(); // Esta línea debe pasar correctamente ahora
      expect(screen.getByTestId("error-message")).toHaveTextContent("Error en la creación del administrador");
    });
  });  
  
});
