import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import WorkerForm from "./WorkerForm";
import { create, edit, updateProfilePicture, getOne } from "../../../../services/worker.service";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

vi.mock("../../../../services/worker.service", () => ({
  create: vi.fn(() => Promise.resolve({ id: 1 })),
  edit: vi.fn(() => Promise.resolve()),
  updateProfilePicture: vi.fn(() => Promise.resolve()),
  getOne: vi.fn(() => Promise.resolve({ username: "Pedro", phone: "123456789" })),
}));

describe("WorkerForm", () => {
  const renderComponent = (workerId = null) => {
    return render(
      <MemoryRouter initialEntries={workerId ? [`/worker/${workerId}`] : ["/worker"]}>
        <Routes>
          <Route path="/worker" element={<WorkerForm />} />
          <Route path="/worker/:id" element={<WorkerForm />} />
        </Routes>
      </MemoryRouter>
    );
  };

  test("Debe crear un trabajador correctamente", async () => {
    create.mockResolvedValue({ id: 1 });
    updateProfilePicture.mockResolvedValue({});

    renderComponent();
    
    fireEvent.change(screen.getByPlaceholderText("Nombre del trabajador"), { target: { value: "Juan" } });
    fireEvent.change(screen.getByPlaceholderText("Contraseña del trabajador"), { target: { value: "123456" } });
    fireEvent.change(screen.getByPlaceholderText("Telefono del trabajador"), { target: { value: "987654321" } });
    
    fireEvent.click(screen.getByText("Crear"));

    await waitFor(() => {
      expect(create).toHaveBeenCalledWith({ username: "Juan", password: "123456", phone: "987654321" });
      expect(updateProfilePicture).toHaveBeenCalled();
    });
  });

  test("Debe manejar error en la creación del trabajador", async () => {
    create.mockRejectedValue(new Error("Error en la creación"));

    renderComponent();
    fireEvent.change(screen.getByPlaceholderText("Nombre del trabajador"), { target: { value: "Juan" } });
    fireEvent.change(screen.getByPlaceholderText("Contraseña del trabajador"), { target: { value: "123456" } });
    fireEvent.change(screen.getByPlaceholderText("Telefono del trabajador"), { target: { value: "987654321" } });
    fireEvent.click(screen.getByText("Crear"));

    await waitFor(() => {
      expect(create).toHaveBeenCalled();
    });
  });

  // test("Debe editar un trabajador correctamente", async () => {
  //   getOne.mockResolvedValue({ username: "Pedro", phone: "123456789" });
  //   edit.mockResolvedValue({});
  //   updateProfilePicture.mockResolvedValue({});

  //   renderComponent(1);
  //   await waitFor(() => expect(getOne).toHaveBeenCalled());

  //   // Esperamos a que los campos estén disponibles después de la carga
  //   await screen.findByPlaceholderText("Nombre del trabajador");
  //   await screen.findByPlaceholderText("Telefono del trabajador");

  //   fireEvent.change(screen.getByPlaceholderText("Nombre del trabajador"), { target: { value: "Carlos" } });
  //   fireEvent.change(screen.getByPlaceholderText("Telefono del trabajador"), { target: { value: "112233445" } });
  //   fireEvent.click(screen.getByText("Editar"));

  //   await waitFor(() => {
  //     expect(edit).toHaveBeenCalledWith("1", { username: "Carlos", password: "", phone: "112233445" });
  //     expect(updateProfilePicture).toHaveBeenCalled();
  //   });
  // });

//   test("Debe manejar error en la edición del trabajador", async () => {
//     getOne.mockResolvedValue({ username: "Pedro", phone: "123456789" });
//     edit.mockRejectedValue(new Error("Error en la edición"));

//     renderComponent(1);
//     await waitFor(() => expect(getOne).toHaveBeenCalled());

//     await screen.findByPlaceholderText("Nombre del trabajador");
//     await screen.findByPlaceholderText("Telefono del trabajador");

//     fireEvent.change(screen.getByPlaceholderText("Nombre del trabajador"), { target: { value: "Carlos" } });
//     fireEvent.change(screen.getByPlaceholderText("Telefono del trabajador"), { target: { value: "112233445" } });
//     fireEvent.click(screen.getByText("Editar"));

//     await waitFor(() => {
//       expect(edit).toHaveBeenCalled();
//     });
//   });
});
