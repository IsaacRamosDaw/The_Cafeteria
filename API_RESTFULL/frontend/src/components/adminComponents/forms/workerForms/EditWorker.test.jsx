import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import EditWorker from "./EditWorker.page";
import { edit, getOne } from "../../../../services/worker.service";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

vi.mock("../../../../services/worker.service", () => ({
  edit: vi.fn(() => Promise.resolve()),
  getOne: vi.fn(() => Promise.resolve({ username: "Pedro", phone: "123456789" })),
}));

describe("EditWorker", () => {
  const renderComponent = (workerId = null) => {
    return render(
      <MemoryRouter initialEntries={workerId ? [`/worker/${workerId}`] : ["/worker"]}>
        <Routes>
          <Route path="/worker/:id" element={<EditWorker />} />
        </Routes>
      </MemoryRouter>
    );
  };

  test("Debe editar un trabajador correctamente", async () => {
    getOne.mockResolvedValue({ username: "Pedro", phone: "123456789" });
    edit.mockResolvedValue({});

    renderComponent(1);
    await waitFor(() => expect(getOne).toHaveBeenCalled());

    // Esperamos a que los campos estén disponibles después de la carga
    await screen.findByPlaceholderText("Nombre del trabajador");
    await screen.findByPlaceholderText("Contraseña del trabajador");

    fireEvent.change(screen.getByPlaceholderText("Nombre del trabajador"), { target: { value: "Carlos" } });
    fireEvent.change(screen.getByPlaceholderText("Contraseña del trabajador"), { target: { value: "newPassword123" } });
    fireEvent.click(screen.getByText("Editar"));

    await waitFor(() => {
      expect(edit).toHaveBeenCalledWith("1", { username: "Carlos", password: "newPassword123" });
    });
  });

  test("Debe manejar error en la edición del trabajador", async () => {
    getOne.mockResolvedValue({ username: "Pedro", phone: "123456789" });
    edit.mockRejectedValue(new Error("Error en la edición"));

    renderComponent(1);
    await waitFor(() => expect(getOne).toHaveBeenCalled());

    await screen.findByPlaceholderText("Nombre del trabajador");
    await screen.findByPlaceholderText("Contraseña del trabajador");

    fireEvent.change(screen.getByPlaceholderText("Nombre del trabajador"), { target: { value: "Carlos" } });
    fireEvent.change(screen.getByPlaceholderText("Contraseña del trabajador"), { target: { value: "newPassword123" } });
    fireEvent.click(screen.getByText("Editar"));

    await waitFor(() => {
      expect(edit).toHaveBeenCalled();
    });
  });
});
