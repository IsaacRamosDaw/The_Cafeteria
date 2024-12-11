import React, { useState } from "react";
import "./CreateProductModal.scss";
import { create as createProduct } from "../../services/category.service";

export default function CreateProductModal({
    isModalOpen,
    handleSave,
    closeModal,
}) {
    const [newProduct, setNewProduct] = useState({
        name: '',
        description: '',
        price: '',
        CategoryId: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await createProduct(newProduct);
            handleSave(newProduct);
            setNewProduct({ name: '', description: '', price: '', CategoryId: '', });
            closeModal();
        } catch (error) {
            console.error("Error creando el producto:", error);
        }
    };

    if (!isModalOpen) return null;
    console.log("Abrir modal", isModalOpen)

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <button className="close-btn" onClick={closeModal}>X</button>
                <h2>Crear Nuevo Producto</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name-product">Nombre del Producto</label>
                        <input
                            type="text"
                            id="name-product"
                            name="name"
                            value={newProduct.name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="description-product">Descripción</label>
                        <input
                            type="number"
                            id="description-product"
                            name="description"
                            value={newProduct.description}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="price-product">Precio</label>
                        <input
                            type="number"
                            id="price-product"
                            name="price"
                            value={newProduct.price}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="id-category">Categoría</label>
                        <input
                            type="number"
                            id="id-category"
                            name="id"
                            value={newProduct.CategoryId}
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
    )

}