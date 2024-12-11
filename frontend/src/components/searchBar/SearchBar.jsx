// import { Link } from "react-router-dom";
import "./SearchBar.scss";
// import { FaRegCircleUser } from "react-icons/fa6";

import { getUser } from "../../services/utils";
import { useState } from "react";

function SearchBar({ input }) {
  const [userTitle, setUserTitle] = useState(getUser().name);


  return (
    <nav id="header-container">
      <div>
        {input ? (
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
