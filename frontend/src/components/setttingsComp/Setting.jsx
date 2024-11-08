import "./Setting.scss";
import { Link } from "react-router-dom";
function Setting({ icon, title, to }) {
  return (
    <Link to={""}>
      <div id="setting">
        <img src={icon} />
        <p>{title}</p>
        <img src="/images/icons/arrow.svg" alt="" />
      </div>
    </Link>
  );
}

export default Setting;
