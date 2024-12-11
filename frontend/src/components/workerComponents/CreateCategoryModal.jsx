import React, { useState } from "react";
import "./CreateCategoryModal.scss";
import { create as createCategory } from "../../services/category.service"; // Asegúrate de que este servicio esté definido correctamente

export default function CreateCategoryModal({
    isModalOpen,
    handleSave,
    closeModal,
}) {
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
            setNewCategory({ name: '', amount: '' }); 
            closeModal();
        } catch (error) {
            console.error("Error creando la categoría:", error);
        }
    };

    if (!isModalOpen) return null;
    console.log("Abrir modal", isModalOpen)

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <button className="close-btn" onClick={closeModal}>X</button>
                <h2>Crear Nueva Categoría</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name-category">Nombre de la Categoría</label>
                        <input
                            type="text"
                            id="name-category"
                            name="name"
                            value={newCategory.name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="amount-category">Cantidad de Productos</label>
                        <input
                            type="number"
                            id="amount-category"
                            name="amount"
                            value={newCategory.amount}
                            onChange={handleInputChange}
                            required
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
