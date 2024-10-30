import { Link } from "react-router-dom";
import "./SearchBar.scss";

function SearchBar() {
  return (
    <nav id="header-container">
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

export default SearchBar;
