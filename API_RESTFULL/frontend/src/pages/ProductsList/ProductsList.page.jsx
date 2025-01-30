import ProductCard from "../../components/productCard/ProductCard";
import TabsBar from "../../components/tabsBar/TabsBar";

import { FaArrowLeftLong } from "react-icons/fa6";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { getByCategory } from "../../services/product.service";

import "./ProductsList.scss";

export default function ProductsList() {
  const navigate = useNavigate();
  const location = useLocation();
  const categoryId = location.state?.categoryId || 1;
  const { category } = useParams();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getByCategory(categoryId);
      setProducts(data);
    }

    fetchData();
  }, []);

  const toBack = () => {
    navigate(-1);
  };

  return (
    <div id="page-list-products">
      <header className="container-header-product-list">
        <FaArrowLeftLong className="arrow-back-list-product" onClick={toBack} />
        <h1 className="title-product-list"> {category} </h1>
      </header>
      <main className="content-page-list-products">
        <div className="container-list-products">
          {products.map((product, index) => (
            <ProductCard
              key={index}
              title={product.name}
              img={product.filename}
              id={product.id}
              altText={`Imagen del producto ${product.name}`}
            />
          ))}
        </div>
      </main>
      <TabsBar />
    </div>
  );
}
