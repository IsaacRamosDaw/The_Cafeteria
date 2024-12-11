import { useEffect, useState } from "react";
import "./MenuOwner.scss";
import { FaTrash } from "react-icons/fa";
import { HiPencilSquare } from "react-icons/hi2";
import { get as getCategories } from "../../services/category.service";
import { get as getProducts, remove } from "../../services/product.service";
import EditProductModal from "../../components/workerComponents/EditProductModal";

export default function MenuOwner() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);

  // Cargar categorías y productos
  useEffect(() => {
    const fetchCategoriesAndProducts = async () => {
      try {
        const categoryData = await getCategories();
        setCategories(categoryData);

        // Mapear categorías a promesas de productos
        const productsPromises = categoryData.map((category) =>
          getProducts(category.id).then((products) => ({
            [category.id]: products || [], // Asegurarse de asignar un array vacío si no hay productos
          }))
        );

        // Esperar todas las promesas y combinarlas en un solo objeto
        const productsByCategoryArray = await Promise.all(productsPromises);
        const productsByCategory = Object.assign({}, ...productsByCategoryArray);

        console.log("Categories:", categoryData);
        console.log("Products by Category:", productsByCategory);

        setProducts(productsByCategory);
      } catch (error) {
        console.error("Error fetching categories or products:", error);
      }
    };

    fetchCategoriesAndProducts();
  }, []);

  const handleEdit = (product) => {
    setProductToEdit(product);
    setIsModalOpen(true);
  };

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

  const handleSave = (updatedProduct) => {
    setProducts((prevProducts) => {
      const updatedProducts = { ...prevProducts };
      const categoryId = updatedProduct.CategoryId;  // Asegurarse de no modificar el CategoryId
      updatedProducts[categoryId] = updatedProducts[categoryId].map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      );
      return updatedProducts;
    });
    setIsModalOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (categories.length === 0) {
    return <p>Cargando categorías...</p>;
  }

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
          </section>
        </section>
      ))}

      {/* Modal de edición de producto */}
      <EditProductModal
        isModalOpen={isModalOpen}
        productToEdit={productToEdit}
        handleSave={handleSave}
        closeModal={closeModal}
        setProductToEdit={setProductToEdit}
      />
    </div>
  );
}
