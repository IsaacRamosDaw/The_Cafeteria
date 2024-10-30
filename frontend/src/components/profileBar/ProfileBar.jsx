import { Link } from "react-router-dom";
import React from "react";
import "./ProfileBar.scss";

export default function ProfileBar() {
  return (
    <header id="container-profile-bar">
      <div>
        <img src="/images/icons/magnifying-glass.svg" alt="Img magnifying glass" />
        <p> Profile Name </p>
      </div>
        <Link id="icon-user" to="/account">
          <img src="/images/icons/user.svg" alt="" />
        </Link>
    </header>
  );
}
