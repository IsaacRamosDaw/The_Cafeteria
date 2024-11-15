import { Link } from "react-router-dom";
import "./Setting.scss";

function Setting({ icon, text, to }) {
  return (
    <Link to={to}>
      <div className="settings-item">
        <div className="content-setting">
          <div className="menu-item-icon">{icon}</div>
          <span className="menu-item-text">{text}</span>
        </div>
        <img className="menu-item-arrow" src="/public/images/icons/arrow.svg" />
      </div>
    </Link>
  );
}

export default Setting;
