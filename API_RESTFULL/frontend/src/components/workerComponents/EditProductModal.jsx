import React from "react";
import "./EditProductModal.scss";
import { edit } from "../../services/product.service";

import { useEffect, useRef } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { IoClose } from "react-icons/io5";
import Button from "../../components/button/Button";

export default function EditProductModal({ isOpen, toggleModal, product }) {
  const nameRef = useRef();
  const descriptionRef = useRef();
  const priceRef = useRef();
  const photoRef = useRef();

  const editProduct = () => {
    const formData = new FormData();
    formData.append("name", nameRef.current.value || "");
    formData.append("description", descriptionRef.current.value || "");
    formData.append("price", priceRef.current.value || "");
    formData.append("file", photoRef.current.files[0] || ""); // Agrega el archivo
    formData.append("categoryId", product.categoryId || "");

    const result = edit(product.id, formData);
    if (result) {
      closeModal();
    } else {
      console.log(result);
    }
  };

  const closeModal = () => {
    toggleModal();
  };

  return (
    <Modal open={isOpen} onClose={closeModal}>
      <Box className="modal-container">
        <div className="container-exit-icon">
          <IoClose className="icon-exit" onClick={closeModal} />
        </div>
        <form onSubmit={(e) => e.preventDefault()} className="content-modal">
          <div>
            <label htmlFor="name-product" id="name-product-label">
              Nombre del Producto
            </label>
            <input
              type="text"
              id="name-product"
              name="name"
              defaultValue={product.name}
              required
              ref={nameRef}
              aria-labelledby="name-product-label"
              placeholder="Nombre del producto"
            />
          </div>
          <div>
            <label htmlFor="description-product" id="description-product-label">
              Descripción
            </label>
            <input
              type="text"
              id="description-product"
              name="description"
              defaultValue={product.description}
              required
              ref={descriptionRef}
              aria-labelledby="description-product-label"
              placeholder="Descripción del producto"
            />
          </div>
          <div>
            <label htmlFor="price-product" id="price-product-label">
              Precio
            </label>
            <input
              type="text"
              id="price-product"
              name="price"
              defaultValue={product.price}
              required
              ref={priceRef}
              aria-labelledby="price-product-label"
              placeholder="Precio del producto"
            />
          </div>
          <div>
            <label htmlFor="photo">Foto</label>
            <input type="file" name="photo" ref={photoRef} />
          </div>
          <div className="button-container">
            <Button submit={true} text={"Editar"} onClick={editProduct} />
            <Button onClick={closeModal} text={"Cancelar"} />
          </div>
        </form>
      </Box>
    </Modal>
  );
}
