import SearchBar from "../../components/searchBar/SearchBar";
import TabsBar from "../../components/tabsBar/tabsBar";
import Separator from "../../components/separator/Separator";
import "./Products.scss";
import Product from "../../components/product/product";

function Products() {
  return (
    <>
      <SearchBar />
      <Separator />
      <main id="products-container">
        <Product img={'../../../public/images/ImgMenus/sandwiches.jpg'}/>
      </main>
      <TabsBar />
    </>
  );
}

export default Products;
