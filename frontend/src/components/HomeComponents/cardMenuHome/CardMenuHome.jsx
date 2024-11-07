import "./CardMenuHome.scss";

export default function CardMenuHome({ image, title, description, time }) {
  return (
    <div className="container-card-menu">
      <div className="container-img-card-menu">
        <img
          className="img-card-product"
          src="/images/ImgMenus/sandwiches.jpg"
          alt="Img card"
        />
      </div>
      <div className="content-img-card-menu">
        <div className="container-title-card-menu">
          <h2>{title}</h2>
        </div>
        <div className="container-description-card-menu">
          <p> {description} </p>
        </div>
        <div className="container-time-card-menu">
            <img src="/frontend/public/images/icons/edit.svg" alt="" />
          <p> {time} </p>
        </div>
      </div>
    </div>
  );
}
