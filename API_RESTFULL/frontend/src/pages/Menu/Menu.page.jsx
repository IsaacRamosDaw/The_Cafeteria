import SearchBar from "../../components/searchBar/SearchBar";
import TabsBar from "../../components/tabsBar/TabsBar";
import CategoriesContainer from "../../components/menuComponents/categoriesContainer/CategoriesContainer";
import { getUserRole } from "../../services/utils";
import MenuOwner from "../menuOwner/MenuOwner";
import "./Menu.scss";

function Menu() {

  return (
    <div id="menu-page-container">
      <SearchBar />
      {getUserRole() == "student" ? <CategoriesContainer /> : <MenuOwner />}
      <TabsBar />
    </div>
  );
}

export default Menu;
