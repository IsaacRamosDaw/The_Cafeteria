import { MemoryRouter } from "react-router-dom";
import { describe, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import MenuOwner from "../MenuOwner";
import { get as getProducts } from "../../../services/product.service";
import { get as getCategories } from "../../../services/category.service";

vi.mock("../../../services/category.service");
vi.mock("../../../services/product.service.js");

describe("Product crud test", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  beforeEach(() => {
    getCategories.mockResolvedValue([
      { id: 1, name: "CategoriaTest", amount: 5 },
    ]);

    getProducts.mockResolvedValue([
      { id: 1, name: "Glaseado", price: 5, description: "Descripción de un donut", CategoryId: 1 },
    ]);
  });

  test("Create a product", async () => {
    render(
      <MemoryRouter>
        <MenuOwner />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("CategoriaTest")).toBeInTheDocument();
    });

    const modalCreateProductButton = screen.getByText("Añadir producto");

    fireEvent.click(modalCreateProductButton);

    await waitFor(() => {
      expect(screen.getByText("Crear Nuevo Producto")).toBeInTheDocument();
    });



    const createProductButton = screen.getByText("Guardar");

    const productNameInput = screen.getByPlaceholderText("Nombre del producto");
    const productDescriptionInput = screen.getByPlaceholderText("texto del producto");
    const productPriceInput = screen.getByPlaceholderText("Precio del producto");

    fireEvent.change(productNameInput, { target: { value: "nuevo producto creado" } });
    fireEvent.change(productPriceInput, { target: { value: 3 } });
    fireEvent.change(productDescriptionInput, { target: { value: "descripción nuevo producto" } });

    fireEvent.click(createProductButton);

    await waitFor(() => {
      expect(screen.getByText("nuevo producto creado")).toBeInTheDocument();
    });
  })

  // test("Edit a product", async () => {
  //   render(
  //     <MemoryRouter>
  //       <MenuOwner />
  //     </MemoryRouter>
  //   );

  //   await waitFor(() => {
  //     expect(screen.getByText("CategoriaTest")).toBeInTheDocument();
  //   });

  //   await waitFor(() => {
  //     expect(screen.getByText("Donut")).toBeInTheDocument();
  //   });

  // await waitFor(() => {
  //   expect(screen.getByText("Donut")).toBeInTheDocument();
  // });
  // const modalCreateProductButton = screen.getByText("Añadir producto");

  // fireEvent.click(modalCreateProductButton);

  // await waitFor(() => {
  //   expect(screen.getByText("Crear Nuevo Producto")).toBeInTheDocument();
  // });

  // const createProductButton = screen.getByText("Guardar");

  // const productNameInput = screen.getByPlaceholderText("Nombre del producto");
  // const productDescriptionInput = screen.getByPlaceholderText("texto del producto");
  // const productPriceInput = screen.getByPlaceholderText("Precio del producto");

  // fireEvent.change(productNameInput, { target: { value: "nuevo producto creado" } });
  // fireEvent.change(productPriceInput, { target: { value: 3 } });
  // fireEvent.change(productDescriptionInput, { target: { value: "descripción nuevo producto" } });

  // fireEvent.click(createProductButton);

  // await waitFor(() => {
  //   expect(screen.getByText("nuevo producto creado")).toBeInTheDocument();
  // });
  // })
})