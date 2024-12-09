import { useEffect, useState } from "react";
import "./MenuOwner.scss";
import { FaTrash } from "react-icons/fa";
import { HiPencilSquare } from "react-icons/hi2";

export default function MenuOwner() {
  const [categories, setCategories] = useState([]);

  const fakeData = [
    {
      title: "Bebidas",
      products: [534],
    },
    {
      title: "Cafes",
      products: [145, 935],
    },
    {
      title: "Zumos",
      products: [185, 447, 175],
    },
  ];

  useEffect(() => {
    setCategories(fakeData);
  }, []);

  const getProduct = (id) => {
    return {
      name: "Zumo de naranja",
      price: Math.floor(Math.random() * 50, 2),
    };
  };

  const handleEdit = (id) => {
    console.log(id);
  };

  const handleDelete = (id) => {
    console.log(id);
  };

  return (
    <div id="owner-menu-page-container">
      {categories.map((category, index) => (
        <section key={index} className="container-category-owner">
          <div className="container-title-category-owner">
            <h1 className="title-category-owner">{category.title}</h1>
            <hr className="divider-categories-owner" />
          </div>
          <section className="container-category-item-cards">
            {category.products.map((productId) => {
              const product = getProduct(productId);
              return (
                <div key={productId} className="container-category-item">
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
                        <HiPencilSquare onClick={() => handleEdit(productId)} />
                        <FaTrash onClick={() => handleDelete(productId)} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </section>
        </section>
      ))}
    </div>
  );
}
