import { Link } from "react-router-dom";
import "./SearchBar.scss";
import { LuCircleUser } from "react-icons/lu";

function SearchBar() {
  return (
    <nav id="header-container">
      <div>
        <img src="/images/icons/magnifying-glass.svg" alt="" />
        <input placeholder="Type to search..." />
        <Link id="icon-user" to="/studentsettings">
          <LuCircleUser/>
        </Link>
      </div>
    </nav>
  );
}

export default SearchBar;
