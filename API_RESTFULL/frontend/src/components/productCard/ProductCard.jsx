import { useNavigate } from "react-router-dom";
import "./ProductCard.scss";

function Product({ id, img, title, altText}) {
  const navigate = useNavigate();

  const handleNavigate = (url) => {
    navigate(url, { state: { productId: id } });
  };

  const folder = "http://localhost:8080/images/";

  return (
    <div
      onClick={() => handleNavigate(`${title.replace(/ /g, "-")}`)}
      className="container-product-card"
    >
      <div className="container-img-product-card">
        <img src={folder + img} alt={altText || `Imagen de ${title}`}/>
      </div>
      <div className="content-product-card">
        <h3>{title}</h3>
      </div>
    </div>
  );
}

export default Product;
