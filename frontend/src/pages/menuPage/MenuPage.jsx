import Menu from "../../components/menu/Menu";
import SearchBar from "../../components/searchBar/SearchBar";
import TabsBar from "../../components/tabsBar/tabsBar";
import "./MenuPage.scss";

function MenuPage() {
  return (
    <main className="menu-page-container">
      <SearchBar />
      <section className="content-menu">
        <h1>Página del menú 1</h1>
        <h1>Página del menú 2</h1>
        <h1>Página del menú 3</h1>
        <Menu />
      </section>
      <TabsBar />
    </main>
  );
}

export default MenuPage;