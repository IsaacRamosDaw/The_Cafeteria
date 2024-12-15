import React from "react";
import "./EditProductModal.scss";
import { edit } from "../../services/product.service"; 

export default function EditProductModal({
  isModalOpen,
  productToEdit,
  handleSave,
  closeModal,
  setProductToEdit
}) {
  if (!isModalOpen || !productToEdit) return null;

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      await edit(productToEdit.id, {
        name: productToEdit.name,
        description: productToEdit.description,
        price: productToEdit.price,
        CategoryId: productToEdit.CategoryId,
      });

      handleSave(productToEdit);
    } catch (error) {
      console.error("Error saving the edited product:", error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="close-btn" onClick={closeModal}>
          X
        </button>
        <h2>Editar Producto</h2>
        <form onSubmit={handleFormSubmit}>
          <div>
            <label>Nombre</label>
            <input
              type="text"
              value={productToEdit?.name || ""}
              onChange={(e) => setProductToEdit({ ...productToEdit, name: e.target.value })}
            />
          </div>
          <div>
            <label>Descripción</label>
            <input
              type="text"
              value={productToEdit?.description || ""}
              onChange={(e) => setProductToEdit({ ...productToEdit, description: e.target.value })}
            />
          </div>
          <div>
            <label>Precio</label>
            <input
              type="number"
              value={productToEdit?.price || ""}
              onChange={(e) => setProductToEdit({ ...productToEdit, price: parseFloat(e.target.value) })}
            />
          </div>
          <div className="button-container">
            <button type="submit">Guardar</button>
            <button type="button" onClick={closeModal}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
