import { FiClock } from "react-icons/fi";
import "./CardMenuHome.scss";

export default function CardMenuHome({ image, title, description, time }) {
  
  return (
    <div className="container-card-menu">
      <div className="container-img-card-menu">
        <img
          className="img-card-menu"
          src="/images/ImgMenus/sandwiches.jpg"
          alt="Img card"
        />
      </div>
      <div className="content-card-menu">
        <div className="container-title-card-menu">
          <h2>{title}</h2>
        </div>
        <div className="container-description-card-menu">
          <p> {description} </p>
        </div>
        <div className="container-time-card-menu">
        <FiClock />
          <p> {time} </p>
        </div>
      </div>
    </div>
  );
}
