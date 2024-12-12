import "./CategoryCard.scss";
import { useNavigate } from "react-router-dom";

function CategoryCard({ id, title, img, count, category }) {
  const navigate = useNavigate();

  const handleNavigate = (url) => {
    navigate(url, { state: { categoryId: id } });
  };

  return (
    <div
      onClick={() => handleNavigate("/menu/" + title.replace(/ /g, "-"))}
      className="container-card-category"
    >
      <div className="container-content-card-category">
        <h4 className="title-category-card">{title}</h4>
        <p className="count-category-card">
          {count} {"Existencias"}
        </p>
      </div>
    </div>
  );
}

export default CategoryCard;

