import React, { useState } from "react";
import "./EditProductModal.scss";
import { edit } from "../../services/category.service";

export function EditCategoryModal({ isModalOpen, categoryToEdit, handleSave, closeModal }) {
  const [formData, setFormData] = useState(categoryToEdit || {});
  const [error, setError] = useState("");

  if (!isModalOpen || !categoryToEdit) return null;

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.name.trim()) {
      setError("The name of category is required.");
      return;
    }

    try {
      console.log("Data sent to the service:", formData);

      await edit(categoryToEdit.id, { name: formData.name });
      handleSave(formData);
      closeModal();
    } catch (err) {
      console.error("Error saving the edited category:", err);
      setError("There was a problem saving the changes. Please try again.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="close-btn" onClick={closeModal}>
          X
        </button>
        <h2>Editar Categoría</h2>
        <form onSubmit={handleFormSubmit}>
          <div>
            <label htmlFor="category-name">Nombre</label>
            <input
              id="category-name"
              type="text"
              value={formData.name || ""}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </div>
          {error && <p className="error-message">{error}</p>}
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
