import "./CategoryCard.scss";
import { useNavigate } from "react-router-dom";

function CategoryCard({ id, title, count, photo, altText }) {
  const navigate = useNavigate();

  const handleNavigate = (url) => {
    navigate(url, { state: { categoryId: id } });
  };

  const folder = "http://localhost:8080/images/";
  console.log(photo);

  return (
    <div
      onClick={() => handleNavigate("/menu/" + title.replace(/ /g, "-"))}
      className="container-card-category"
    >
      {/* <img src={"/images/ImgMenus/bebidas.jpg" } alt="Img category card" /> */}
      <img src={folder + photo || ""} alt={altText || `Imagen de ${title}`} />

      <div className="div-darken-category-card"></div>

      <div className="container-content-card-category">
        <h1 className="title-category-card">{title}</h1>
        <p className="count-category-card">
          {count} {"Existencias"}
        </p>
      </div>
    </div>
  );
  
}

export default CategoryCard;
