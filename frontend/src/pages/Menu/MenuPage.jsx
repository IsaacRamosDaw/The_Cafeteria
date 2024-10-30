import Category from "../../components/menu/Category";
import SearchBar from "../../components/searchBar/SearchBar";
import TabsBar from "../../components/tabsBar/tabsBar";
import "./MenuPage.scss";

function MenuPage() {
  return (
    <>
      <SearchBar />
      <main className="categories-container">
        <Category />
      </main>
      <TabsBar />
    </>
  );
}

export default MenuPage;
