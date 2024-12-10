// import { Link } from "react-router-dom";
import "./SearchBar.scss";
// import { FaRegCircleUser } from "react-icons/fa6";

import { getUser, getUserRole } from "../../services/utils";
import { useState } from "react";

function SearchBar({ input = "false" }) {
  const [userTitle, setUserTitle] = useState(getUser().name);

  const role = getUserRole();

  return (
    <nav id="header-container">
      <div>
        {input == "true" ? (
          <input placeholder="Qué quieres comer..." type="text" name="" id="" />
        ) : (
          <h2> {userTitle} </h2>
        )}
        {/* <Link
          id="icon-user"
          to={role === "worker" ? "/worker/profile" : "/student/profile"}
        >
          <FaRegCircleUser className="go-profile" />
        </Link> */}
      </div>
    </nav>
  );
}

export default SearchBar;
