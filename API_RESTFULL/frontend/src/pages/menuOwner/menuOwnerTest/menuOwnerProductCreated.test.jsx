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

    // Mockeamos los productos
    getProducts.mockResolvedValue([
      { id: 1, name: "Donut", price: 5, description: "Descripción de un donut" },
      { id: 2, name: "Roscon", price: 5, description: "Descripción de un roscon" },
    ]);
  });

  test("should create a new product", async () => {
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
    fireEvent.change(productDescriptionInput, { target: { value: 3 } });
    fireEvent.change(productPriceInput, { target: { value: "descripción nuevo producto" } });

    fireEvent.click(createProductButton);
    
    await waitFor(() => {
      expect(screen.getByText("nuevo producto creado")).toBeInTheDocument();
    });
  })
})