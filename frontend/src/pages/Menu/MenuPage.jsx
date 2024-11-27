import SearchBar from "../../components/searchBar/SearchBar";
import TabsBar from "../../components/tabsBar/tabsBar";
import CategoriesContainer from "../../components/menuComponents/categoriesContainer/CategoriesContainer";
import "./MenuPage.scss";

function MenuPage() {
  return (
    <div id="menu-page-container">
      <SearchBar />
      <CategoriesContainer />
      <TabsBar />
    </div>
  );
}

export default MenuPage;