import "./SearchBar.scss";

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
      </div>
    </nav>
  );
}

export default SearchBar;
