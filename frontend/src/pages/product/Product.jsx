import SearchBar from "../../components/searchBar/SearchBar";
import TabsBar from "../../components/tabsBar/tabsBar";
import { FaArrowLeftLong } from "react-icons/fa6";
import Separator from "../../components/separator/Separator";

import { useNavigate, useParams } from "react-router-dom";
import "./Product.scss";

function Product() {
  const navigate = useNavigate()
  let { menu, category, name } = useParams();

  name = name.replace(/-/g, " ");

  const goBack = () => {
    navigate(-1)
  }

  return (
    <div id="page-list-products">
      <header className="container-header-product-list">
        <FaArrowLeftLong className="arrow-back-list-product" onClick={goBack} />
      </header>
      <main className="content-page-list-products">
        <div className="container-list-products">
          
        </div>
      </main>
      <TabsBar />
    </div>
  );
}

export default Product;
