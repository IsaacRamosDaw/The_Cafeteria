import { useNavigate } from "react-router-dom";
import "./ProductCard.scss";

function Product({ id, img, title }) {
  const navigate = useNavigate();

  const handleNavigate = (url) => {
    navigate(url, { state: { productId: id } });
  };

  return (
    <div
      onClick={() =>
        handleNavigate(`${title.replace(/ /g, "-")}`)
      }
      className="container-product-card"
    >
      <div className="img-product-card">
        <img src={img} alt="Img Product" />
      </div>
      <div className="content-product-card">
        <h3>{title}</h3>
      </div>
    </div>
  );
}

export default Product;
