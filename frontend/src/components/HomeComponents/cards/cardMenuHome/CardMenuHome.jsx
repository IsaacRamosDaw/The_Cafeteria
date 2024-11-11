import "./CardMenuHome.scss";
import { useTheme } from "../../../../contexts/ThemeContext";

export default function CardMenuHome({ image, title, description, time }) {
  const { theme, toggleTheme } = useTheme();
  
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
          <img src="/images/icons/clock.svg" alt="" />
          <p> {time} </p>
        </div>
      </div>
    </div>
  );
}
