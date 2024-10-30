import { Link } from "react-router-dom";
import React from "react";
import "./ProfileBar.scss";

export default function ProfileBar() {
  return (
    <nav id="container-profile-bar">
      <div>
        <img src="/images/icons/magnifying-glass.svg" alt="" />
        <input placeholder="Type to search..." />
        <Link id="icon-user" to="/account">
          <img src="/images/icons/user.svg" alt="" />
        </Link>
      </div>
    </nav>
  );
}
