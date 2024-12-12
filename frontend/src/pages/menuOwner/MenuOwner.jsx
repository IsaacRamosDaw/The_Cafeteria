import { useEffect, useState } from "react";
import "./MenuOwner.scss";
import { FaTrash } from "react-icons/fa";
import { HiPencilSquare } from "react-icons/hi2";
import { get as getCategories, create as createCategory } from "../../services/category.service";
import { getByCategory as getProducts, remove, create as createProducts } from "../../services/product.service";
import EditProductModal from "../../components/workerComponents/EditProductModal";
import { FaPlus } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";
import CreateCategoryModal from "../../components/workerComponents/CreateCategoryModal";
import CreateProductModal from "../../components/workerComponents/CreateProductModal";

export default function MenuOwner() {
  const [categoryId, setCategoryId] = useState();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState({});
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateCategoryModalOpen, setIsCreateCategoryModalOpen] = useState(false);
  const [isCreateProductModalOpen, setIsCreateProductModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const [newCategory, setNewCategory] = useState({
    name: '',
    amount: ''
  });
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    CategoryId: '',
  })

  // Cargar categorías y productos
  useEffect(() => {
    const fetchCategoriesAndProducts = async () => {
      try {
        const categoryData = await getCategories();
        setCategories(categoryData);

        // Crear un objeto para almacenar los productos por categoría
        const productsByCategory = {};

        for (const category of categoryData) {
          const products = await getProducts(category.id);
          console.log(`Productos para la categoría ${category.id}:`, products);
          productsByCategory[category.id] = products || [];
        }

        console.log("Productos organizados por categoría:", productsByCategory);
        setProducts(productsByCategory);
      } catch (error) {
        console.error("Error fetching categories or products:", error);
      }
    };

    fetchCategoriesAndProducts();
  }, []);

  // Manejo de la creación de categorías
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCategory((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    // Pasar los datos de la nueva categoría al backend o servicio
    console.log("Creando categoría:", newCategory);
    try {
      await createCategory(newCategory);
      setIsCreateCategoryModalOpen(false); // Cerrar el modal después de crear
      setNewCategory({ name: '', amount: '' }); // Limpiar los campos del formulario
    } catch (error) {
      console.error("Error creando la categoría:", error);
    }
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    
    try{
      await createProducts(newProduct);
      setIsCreateProductModalOpen(false);
      setNewProduct({name: '', description: '', price: '', CategoryId: '',})

    } catch (error){
      console.error("Error creando el producto:", error);
    }

  }

  const handleDelete = async (id) => {
    try {
      await remove(id);
      console.log(`Producto con ID ${id} eliminado correctamente.`);

      // Actualizar los productos en el estado después de eliminar uno
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
      console.error(`Error al eliminar el producto con ID ${id}:`, error);
    }
  };

  const handleEdit = (product) => {
    setProductToEdit(product);
    setIsEditModalOpen(true);
  };

  const handleSave = (updatedProduct) => {
    setProducts((prevProducts) => {
      const updatedProducts = { ...prevProducts };
      const categoryId = updatedProduct.CategoryId; // Asegurarse de no modificar el CategoryId
      updatedProducts[categoryId] = updatedProducts[categoryId].map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      );
      return updatedProducts;
    });
    setIsEditModalOpen(false);
  };

  const closeModal = () => {
    setIsCreateProductModalOpen(false);
    setIsEditModalOpen(false);
    setIsCreateCategoryModalOpen(false);
  };

  return (
    <div id="owner-menu-page-container">
      {categories.map((category) => (
        <section key={category.id} className="container-category-owner">
          <div className="container-title-category-owner">
            <h1 className="title-category-owner">{category.name}</h1>
            <hr className="divider-categories-owner" />
          </div>
          <section className="container-category-item-cards">
            {products[category.id]?.map((product) => (
              <div key={product.id} className="container-category-item">
                <div className="container-img-category-item">
                  <img
                    src="/images/ImgMenus/bebidas.jpg"
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
            <FaCirclePlus onClick={() => {
              setIsCreateProductModalOpen(true)
              setCategoryId(category.id)
            }
            }/>
          </section>
        </section>
      ))}

      <FaPlus onClick={() => setIsCreateCategoryModalOpen(true)} />

      <EditProductModal
        isModalOpen={isEditModalOpen}
        productToEdit={productToEdit}
        handleSave={handleSave}
        closeModal={closeModal}
        setProductToEdit={setProductToEdit}
      />

      <CreateCategoryModal
        isModalOpen={isCreateCategoryModalOpen}
        handleSave={handleCreate}
        closeModal={closeModal}
        categoryToCreate={newCategory}
        handleInputChange={handleInputChange}
      />

      <CreateProductModal
      isModalOpen={isCreateProductModalOpen}
      handleSave={handleCreateProduct}
      closeModal={closeModal}
      productToCreate={newProduct}
      handleInputChange={handleInputChange}
      CategoryId={categoryId}
      />
    </div>
  );
}
