import Category from "../../components/menu/Category";
import SearchBar from "../../components/searchBar/SearchBar";
import TabsBar from "../../components/tabsBar/TabsBar";
import "./Categories.scss";

function CategoriesPage() {
  return (
    <>
      <SearchBar />
      <main id="category-container">
        <h2>Qué te apetece tomar</h2>
        <Category
          img={"../../../public/images/ImgMenus/bebidas.jpg"}
          title={"Desayunos"}
        />
        <Category
          img={"../../../public/images/ImgMenus/bebidas.jpg"}
          title={"cafes"}
        />
        <Category
          img={"../../../public/images/ImgMenus/bebidas.jpg"}
          title={"dulces"}
        />
        <Category
          img={"../../../public/images/ImgMenus/bebidas.jpg"}
          title={"Zumos"}
        />
        <Category
          img={"../../../public/images/ImgMenus/bebidas.jpg"}
          title={"refrescos"}
        />
      </main>
      <TabsBar />
    </>
  );
}

export default CategoriesPage;
