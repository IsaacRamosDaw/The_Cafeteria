import "./CategoryCard.scss";
import { Link } from "react-router-dom";
function CategoryCard({ title, img, count, category }) {
  return (
    <div className="container-card-category">
      {/* <div className="container-content-card-category">
        <h4 className="title-category-card">{title}</h4>
        <p className="count-category-card">
          {count} {title}{" "}
        </p>
      </div>
      <Link className="container-img-category-card" to={"www.google.com"}>
        <img src={img} alt="Img card category" />
      </Link> */}
      <Link to={category} >
        <div className="container-content-card-category">
          <h4 className="title-category-card">{title}</h4>
          <p className="count-category-card">
            {count} {" Existencias "}
          </p>
        </div>
      </Link>
    </div>
  );
}

export default CategoryCard;
