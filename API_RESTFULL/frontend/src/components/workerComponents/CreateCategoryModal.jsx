import React, { useState } from "react";
import "./CreateCategoryModal.scss";
import { create as createCategory } from "../../services/category.service";

export default function CreateCategoryModal({isModalOpen, handleSave, closeModal,}) {
    const [newCategory, setNewCategory] = useState({
        name: '',
        amount: '',
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewCategory((prevCategory) => ({
            ...prevCategory,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await createCategory(newCategory);
            handleSave(newCategory);
            setNewCategory({ name: ''}); 
            closeModal();
        } catch (error) {
            console.error("Error creating the category:", error);
        }
    };

    if (!isModalOpen) return null;
    // console.log("Open modal", isModalOpen)

    return (
        <div className="modal-overlay">
            <div className="modal-container-category-create">
                <button className="close-btn" onClick={closeModal}>X</button>
                <h2>Crear Nueva Categoría</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name-category" id="name-category-label">Nombre de la Categoría</label>
                        <input
                            type="text"
                            id="name-category"
                            name="name"
                            value={newCategory.name}
                            onChange={handleInputChange}
                            required
                            aria-labelledby="name-category-label"

                        />
                    </div>
                    <div className="button-container">
                        <button type="submit">Guardar</button>
                        <button type="button" onClick={closeModal}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
