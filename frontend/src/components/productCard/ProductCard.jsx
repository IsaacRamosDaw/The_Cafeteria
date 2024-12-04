import { Link } from "react-router-dom";
import "./ProductCard.scss";

function Product({ img, title, category }) {
  return (
    <Link to={`${title.replace(/ /g, "-")}`} className="container-product-card">
      <div className="img-product-card">
        <img src={img} alt="Img Product" />
      </div>
      <div className="content-product-card">
        <h3>{title}</h3>
      </div>
    </Link>
  );
}

export default Product;
