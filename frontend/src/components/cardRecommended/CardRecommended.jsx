import "./CardRecommended.scss";

export default function CardRecommended({ image, title, price }) {
  return (
    <div className="card-recommended-container">
      <div className="container-img-card-recommended">
        <img
          className="img-card-recommended"
          src="/images/ImgMenus/sandwiches.jpg"
          alt="Img card"
        />
      </div>
      <div className="container-info-card-recommended">
        <h2 className="title-card-recommended"> {title} </h2>
        <p className="price-card-recommended"> {price}$ </p>
      </div>
    </div>
  );
}
