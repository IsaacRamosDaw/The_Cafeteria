import EditProductModal from "../../components/workerComponents/EditProductModal";
import CreateCategoryModal from "../../components/workerComponents/CreateCategoryModal";
import CreateProductModal from "../../components/workerComponents/CreateProductModal";
import { EditCategoryModal } from "../../components/workerComponents/EditCategoryModal";

import { useEffect, useState } from "react";

import { FaTrash } from "react-icons/fa";
import { FiPlusCircle } from "react-icons/fi";
import { HiPencilSquare } from "react-icons/hi2";
import { FaCirclePlus } from "react-icons/fa6";

import {getByCategory as getProducts, remove, create as createProducts, } from "../../services/product.service";
import { get as getCategories, create as createCategory, remove as removeCategory } from "../../services/category.service";

import "./MenuOwner.scss";

export default function MenuOwner() {

  const [categoryId, setCategoryId] = useState();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState({});

  const [isEditProductModalOpen, setIsEditProductModalOpen] = useState(false);
  const [isEditCategoryModalOpen, setIsEditCategoryModalOpen] = useState(false);
  const [isCreateCategoryModalOpen, setIsCreateCategoryModalOpen] = useState(false);
  const [isCreateProductModalOpen, setIsCreateProductModalOpen] = useState(false);

  const [productToEdit, setProductToEdit] = useState(null);
  const [categoryToEdit, setCategoryToEdit] = useState(null);

  const [newCategory, setNewCategory] = useState({ name: '', amount: '' });

  // Load categories and products
  useEffect(() => {
    const fetchCategoriesAndProducts = async () => {
      try {
        const categoryData = await getCategories();
        setCategories(categoryData);

        const productsByCategory = {};
        for (const category of categoryData) {
          const products = await getProducts(category.id);
          productsByCategory[category.id] = products || [];
        }
        setProducts(productsByCategory);
      } catch (error) {
        console.error("Error fetching categories or products:", error);
      }
    };
    fetchCategoriesAndProducts();
  }, []);

  // Create category
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await createCategory(newCategory);
      const updatedCategories = await getCategories(); // Refresh categories
      setCategories(updatedCategories);
      setIsCreateCategoryModalOpen(false);
      setNewCategory({ name: "", amount: "" });
    } catch (error) {
      console.error("Error creating the category:", error);
    }
  };

  // Create product
  const handleCreateProduct = async (product) => {
    try {
      await createProducts(product);
      const updatedProducts = await getProducts(product.CategoryId); // Refresh products
      setProducts((prevProducts) => ({
        ...prevProducts,
        [product.CategoryId]: updatedProducts,
      }));
      setIsCreateProductModalOpen(false);
    } catch (error) {
      console.error("Error creando el producto:", error);
    }
  };

  // Delete product
  const handleDelete = async (id) => {
    try {
      await remove(id);
      setProducts((prevProducts) => {
        const updatedProducts = { ...prevProducts };
        for (const categoryId in updatedProducts) {
          updatedProducts[categoryId] = updatedProducts[categoryId].filter(
            (product) => product.id !== id
          );
        }
        return updatedProducts;
      });
    } catch (error) {
      console.error(`Error delete a product with id ${id}:`, error);
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await removeCategory(id);

      setCategories((prevCategories) =>
        prevCategories.filter((category) => category.id !== id)
      );

      setProducts((prevProducts) => {
        const updatedProducts = { ...prevProducts };
        delete updatedProducts[id];
        return updatedProducts;
      });

      console.log(
        `Category with ID ${id} and its associated products deleted.`
      );
    } catch (error) {
      console.error(`Error delete the category with id ${id}:`, error);
    }
  };

  // Edit product
  const handleEdit = (product) => {
    setProductToEdit(product);
    setIsEditProductModalOpen(true);
  };

  const handleSave = (updatedProduct) => {
    setProducts((prevProducts) => {
      const updatedProducts = { ...prevProducts };
      const categoryId = updatedProduct.CategoryId;

      updatedProducts[categoryId] = updatedProducts[categoryId].map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      );

      return updatedProducts;
    });
    setIsEditProductModalOpen(false);
  };

  // Edit category
  const handleEditCategory = (category) => {
    setCategoryToEdit(category);
    setIsEditCategoryModalOpen(true);
  };

  const handleSaveCategory = async (updatedCategory) => {
    try {
      const updatedCategories = await getCategories(); // Refresh categories
      setCategories(updatedCategories);
      setIsEditCategoryModalOpen(false);
    } catch (error) {
      console.error("Error al actualizar la categoría:", error);
    }
  };

  const closeModal = () => {
    setIsCreateProductModalOpen(false);
    setIsEditProductModalOpen(false);
    setIsEditCategoryModalOpen(false);
    setIsCreateCategoryModalOpen(false);
  };

  return (
    <div id="owner-menu-page-container">
      <div
        onClick={() => setIsCreateCategoryModalOpen(true)}
        className="container-add-category"
      >
        <h4>Añadir categoria</h4>
        <FiPlusCircle className="icon-add-category" />
      </div>
      {categories.map((category) => (
        <section key={category.id} className="container-category-owner">
          <div className="container-title-category-owner">
            <div className="title-category-container">
              <h1 className="title-category-owner">{category.name}</h1>
              <div>
                <HiPencilSquare onClick={() => handleEditCategory(category)} />
                <FaTrash onClick={() => handleDeleteCategory(category.id)} />
              </div>
            </div>
            <hr className="divider-categories-owner" />
          </div>
          <section className="container-category-item-cards">
            {products[category.id]?.map((product) => (
              <div key={product.id} className="container-category-item">
                <div className="container-img-category-item">
                  <img
                    src="/images/ImgMenus/cafeExpreso.jpg"
                    alt="Img category"
                  />
                </div>
                <div className="container-info-category">
                  <div className="container-text-item">
                    <p>{product.name}</p>
                  </div>
                  <div className="container-control-price-item-category">
                    <span className="text-price-item-category">
                      {product.price}€
                    </span>
                    <div className="container-control-item-category">
                      <HiPencilSquare onClick={() => handleEdit(product)} />
                      <FaTrash onClick={() => handleDelete(product.id)} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div
              onClick={() => {
                setIsCreateProductModalOpen(true);
                setCategoryId(category.id);
              }}
              className="container-add-product"
            >
              <h4>Añadir producto</h4>
              <FaCirclePlus className="add-product-button" />
            </div>
          </section>
        </section>
      ))}

      <CreateCategoryModal
        isModalOpen={isCreateCategoryModalOpen}
        handleSave={handleCreate}
        closeModal={closeModal}
        categoryToCreate={newCategory}
        handleInputChange={(e) => {
          const { name, value } = e.target;
          setNewCategory((prev) => ({ ...prev, [name]: value }));
        }}
      />

      <EditCategoryModal
        isModalOpen={isEditCategoryModalOpen}
        categoryToEdit={categoryToEdit}
        handleSave={handleSaveCategory}
        closeModal={closeModal}
        setCategoryToEdit={setCategoryToEdit}
      />

      <EditProductModal
        isModalOpen={isEditProductModalOpen}
        productToEdit={productToEdit}
        handleSave={handleSave}
        closeModal={closeModal}
        setProductToEdit={setProductToEdit}
      />

      <CreateProductModal
        isModalOpen={isCreateProductModalOpen}
        handleSave={handleCreateProduct}
        closeModal={closeModal}
        CategoryId={categoryId}
      />
    </div>
  );
}

  // const [newProduct, setNewProduct] = useState({
  //   name: '',
  //   description: '',
  //   price: '',
  //   CategoryId: ''
  // });
