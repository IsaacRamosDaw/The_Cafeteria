import { Link } from "react-router-dom";
import React from "react";
import "./ProfileBar.scss";

export default function ProfileBar() {
  return (
    <nav id="container-profile-bar">
      <div>
        
        <Link id="icon-user" to="/account">
          <img src="/images/icons/user.svg" alt="" />
        </Link>
      </div>
    </nav>
  );
}
