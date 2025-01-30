import React, { useState, useEffect } from "react";
import "./CreateProductModal.scss";
import { create as createProduct } from "../../services/product.service";
import { get } from "../../services/category.service";


export default function CreateProductModal({isModalOpen,handleSave,closeModal,CategoryId}) {
    // console.log("id categoría", CategoryId)
    const [categories, setCategories] = useState([]);
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

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     try {
    //         await createProduct(newProduct);
    //         handleSave(newProduct);
    //         console.log("Producto", newProduct)
    //         setNewProduct(newProduct);
    //         closeModal();
    //     } catch (error) {
    //         console.error("Error creando el producto:", error);
    //     }
    // };

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        try {
            await handleSave(newProduct);
            setNewProduct({ name: '', description: '', price: '', CategoryId: '' });
            closeModal();
        } catch (error) {
            console.error("Error creating the product:", error);
        }
    };

    useEffect(() => {
        get()
          .then((data) => setCategories(data))
          .catch((error) => console.error("Error :", error));
      }, []);

      useEffect(() => {
        setNewProduct((prevProduct) => ({
            ...prevProduct,
            CategoryId,
        }));
    }, [CategoryId]);

    if (!isModalOpen) return null;
    // console.log("Open modal", isModalOpen)

    return (
        <div className="modal-overlay">
            <div className="modal-container-product-create">
                <button className="close-btn" onClick={closeModal}>X</button>
                <h2>Crear Nuevo Producto</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name-product" id="name-product-label">Nombre del Producto</label>
                        <input
                            type="text"
                            id="name-product"
                            name="name"
                            value={newProduct.name}
                            onChange={handleInputChange}
                            required
                            aria-labelledby="name-product-label"
                            placeholder="Nombre del producto"
                        />
                    </div>
                    <div>
                        <label htmlFor="description-product" id="description-product-label">Descripción</label>
                        <input
                            type="text"
                            id="description-product"
                            name="description"
                            value={newProduct.description}
                            onChange={handleInputChange}
                            required
                            aria-labelledby="description-product-label"
                            placeholder="texto del producto"
                        />
                    </div>
                    <div>
                        <label htmlFor="price-product" id="price-product-label">Precio</label>
                        <input
                            type="number"
                            id="price-product"
                            name="price"
                            value={newProduct.price}
                            onChange={handleInputChange}
                            required
                            aria-labelledby="price-product-label"
                            placeholder="Precio del producto"
                        />
                    </div>
                    <div>
                        <label htmlFor="id-category">Categoría</label>
                        <input
                            id="id-category"
                            type="hidden"
                            name="CategoryId"
                            value={CategoryId}
                            // onChange={handleInputChange}
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