import { useEffect, useState } from "react";
import EditProductModal from "../../components/workerComponents/EditProductModal";
import CreateCategoryModal from "../../components/workerComponents/CreateCategoryModal";
import CreateProductModal from "../../components/workerComponents/CreateProductModal";
import { EditCategoryModal } from "../../components/workerComponents/EditCategoryModal";
import { FaTrash } from "react-icons/fa";
import { FiPlusCircle } from "react-icons/fi";
import { HiPencilSquare } from "react-icons/hi2";
import { FaCirclePlus } from "react-icons/fa6";
import {
  getByCategory as getProducts,
  remove,
  create as createProducts,
} from "../../services/product.service";
import {
  get as getCategories,
  create as createCategory,
  remove as removeCategory,
} from "../../services/category.service";
import "./MenuOwner.scss";

export default function MenuOwner() {
  const [categoryId, setCategoryId] = useState();
  const [categories, setCategories] = useState([]);
  const [productMenu, setProductMenu] = useState([]);

  const [isEditCategoryModalOpen, setIsEditCategoryModalOpen] = useState(false);
  const [isCreateCategoryModalOpen, setIsCreateCategoryModalOpen] = useState(false);

  const [openModalProduct, setOpenModalProduct] = useState(false);
  const toggleModalProduct = () => {
    setOpenModalProduct(!openModalProduct);
  };
  const [openModalEditProduct, setOpenModalEditProduct] = useState(false);
  const toggleModalEditProduct = () => {
    setOpenModalEditProduct(!openModalEditProduct);
  };

  const [ productEdit, setProductEdit ] = useState({})

  const [newCategory, setNewCategory] = useState(false);

  let imageFolder = "http://localhost:8080/images/product/";

  const handleDeleteCategory = () => {};

  const handleEdit = (product) => {
    setProductEdit(product)
    toggleModalEditProduct();
  };

  const handleDelete = (id) => {
    remove(id)
  };

  const handleAddProduct = (categoryId) => {
    toggleModalProduct();
    setCategoryId(categoryId);
  };

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
        setProductMenu(productsByCategory);
      } catch (error) {
        console.error("Error fetching categories or products:", error);
      }
    };
    fetchCategoriesAndProducts();
  }, [openModalProduct, openModalEditProduct ]);

  return (
    <div id="owner-menu-page-container">
      <div
        onClick={() => setIsCreateCategoryModalOpen(true)}
        className="container-add-category"
      >
        <h1>Añadir categoría</h1>
        <FiPlusCircle className="icon-add-category" />
      </div>
      {categories.map((category) => (
        <section key={category.id} className="container-category-owner">
          <div className="container-title-category-owner">
            <div className="title-category-container">
              <h1 className="title-category-owner">{category.name}</h1>
              <div>
                <HiPencilSquare
                  onClick={() => setIsEditCategoryModalOpen(true)}
                />
                <FaTrash onClick={() => handleDeleteCategory(category.id)} />
              </div>
            </div>
            <hr className="divider-categories-owner" />
          </div>
          <section className="container-category-item-cards">
            {productMenu[category.id]?.map((product) => (
              <div key={product.id} className="container-category-item">
                <div className="container-img-category-item">
                  <img
                    src={imageFolder + product.filename}
                    alt={`Imagen del producto ${product.name}`}
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
              onClick={() => handleAddProduct(category.id)}
              className="container-add-product"
            >
              <h1>Añadir producto</h1>
              <FaCirclePlus className="add-product-button" />
            </div>
          </section>
        </section>
      ))}
      <CreateCategoryModal
        isModalOpen={isCreateCategoryModalOpen}
        closeModal={() => setIsCreateCategoryModalOpen(false)}
        handleInputChange={(e) => {
          const { name, value } = e.target;
          setNewCategory((prev) => ({ ...prev, [name]: value }));
        }}
      />
      <EditCategoryModal
        isModalOpen={isEditCategoryModalOpen}
        closeModal={() => setIsEditCategoryModalOpen(false)}
      />

      <EditProductModal
        isOpen={openModalEditProduct}
        toggleModal={toggleModalEditProduct}
        product={productEdit}
      />
      <CreateProductModal
        isOpen={openModalProduct}
        toggleModal={toggleModalProduct}
        categoryId={categoryId}
      />
    </div>
  );
}
