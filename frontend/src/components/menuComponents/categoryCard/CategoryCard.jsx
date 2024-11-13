import "./CategoryCard.scss";

function CategoryCard({ title, img, count }) {
  return (
    <div className="container-card-category">
      <div className="container-content-card-category">
        <h4 className="title-category-card" >{title}</h4>
        <p className="count-category-card" >{count} {title} </p>
      </div>
      <a className="container-img-category-card" href="#">
        <img src={img} alt="Img card category" />
      </a>
    </div>
  );
}

export default CategoryCard;
