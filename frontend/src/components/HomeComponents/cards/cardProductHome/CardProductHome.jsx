import "./CardProductHome.scss";

export default function CardProductHome({ type = 1, image, title, price }) {

  if (type === 1) {
    return (
      <div className="card-product-container">
        <div className="container-img-card-product">
          <img
            className="img-card-product"
            src="/images/ImgMenus/sandwiches.jpg"
            alt="Img card"
          />
        </div>
        <div className="container-info-card-product">
          <h2 className="title-card-product"> {title} </h2>
          <p className="price-card-product"> {price} $ </p>
        </div>
      </div>
    );
  }
  return (
    <div className="card-product-container">
      <div className="container-info-card-product">
        <h2 className="title-card-product"> {title} </h2>
        <p className="price-card-product"> {price} $ </p>
      </div>
      <div className="container-img-card-product">
        <img
          className="img-card-product"
          src="/images/ImgMenus/sandwiches.jpg"
          alt="Img card"
        />
      </div>
    </div>
  );
}
