import React from "react";
import "./EditProductModal.scss";
import { edit } from "../../services/category.service";

export function EditCategoryModal({isModalOpen, categoryToEdit, handleSave, 
    closeModal, setCategoryToEdit}){
        if(!isModalOpen || !categoryToEdit) return null;

    // const handleFormSubmit = async (e) => {
    //     e.preventDefault();

    //     try{
    //         await edit(categoryToEdit.id, {
    //             name: categoryToEdit.name
    //         });

    //         handleSave(categoryToEdit);
    //     } catch (error){
    //         console.error("Error al guardar la categoría editada:", error);
    //     }
    // };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
    
        try {
            console.log("Datos enviados al servicio:", categoryToEdit);
    
            await edit(categoryToEdit.id, {
                name: categoryToEdit.name,
            });
    
            handleSave(categoryToEdit);
        } catch (error) {
            console.error("Error al guardar la categoría editada:", error);
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
                <label>Nombre</label>
                <input
                  type="text"
                  value={categoryToEdit?.name || ""}
                  onChange={(e) => setCategoryToEdit({ ...categoryToEdit, name: e.target.value })}
                />
              </div>
              <div className="button-container">
                <button type="submit">Guadar</button>
                <button type="button" onClick={closeModal}>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      );
    }