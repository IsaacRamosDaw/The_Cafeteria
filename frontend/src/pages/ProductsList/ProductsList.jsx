import ProductCard from "../../components/productCard/ProductCard";
import TabsBar from "../../components/tabsBar/TabsBar";
import { FaArrowLeftLong } from "react-icons/fa6";
import "./ProductsList.scss";
import { useNavigate, useParams } from "react-router-dom";

export default function ProductsList({title, idCategory}) {
  const navigate = useNavigate()

  const { category } = useParams()

  const toBack = () => {
    navigate(-1)
  }

  return (
    <div id="page-list-products">
      <header className="container-header-product-list">
        <FaArrowLeftLong className="arrow-back-list-product" onClick={toBack} />
        <h1 className="title-product-list" > {category} </h1>
      </header>
      <main className="content-page-list-products">
        <div className="container-list-products">
          <ProductCard
            title={"Super Bocata Combo"}
            img={"/images/ImgMenus/sandwiches.jpg"}
            category={category}
          />
          <ProductCard
            title={"Super Bocata Combo"}
            img={"/images/ImgMenus/sandwiches.jpg"}
            category={category}
          />
          <ProductCard
            title={"Super Bocata Combo"}
            img={"/images/ImgMenus/sandwiches.jpg"}
            category={category}
          />
          <ProductCard
            title={"Super Bocata Combo"}
            img={"/images/ImgMenus/sandwiches.jpg"}
            category={category}
          />
          <ProductCard
            title={"Super Bocata Combo"}
            img={"/images/ImgMenus/sandwiches.jpg"}
            category={category}
          />
        </div>
      </main>
      <TabsBar />
    </div>
  );
}
