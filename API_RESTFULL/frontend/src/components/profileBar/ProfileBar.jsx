import { Link } from "react-router-dom";
import "./ProfileBar.scss";

export default function ProfileBar() {
  return (
    <header id="container-profile-bar">
      <div className="container-profile-bar-input">
        <div className="container-info-profile-name">
          <img
            src="/images/icons/magnifying-glass.svg"
            alt="Img magnifying glass"
          />
          <h3>Profile Name </h3>
        </div>
        <Link id="icon-user" to="/account">
          <img src="/images/icons/user.svg" alt="" />
        </Link>
      </div>
    </header>
  );
}
