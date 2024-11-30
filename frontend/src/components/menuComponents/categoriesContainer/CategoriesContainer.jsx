import CategoryCard from "../categoryCard/CategoryCard";
import "./CategoriesContainer.scss";
import Plus from '../../workerComponents/Plus';

function CategoriesContainer() {
  return (
    <section className="category-cards-container" >
      <main id="category-container-card">
        <CategoryCard
          img={"../../../public/images/ImgMenus/bebidas.jpg"}
          count={122}
          title={"Desayunos"}
        />
        <CategoryCard
          img={"../../../public/images/ImgMenus/bebidas.jpg"}
          count={122}
          title={"cafes"}
        />
        <CategoryCard
          img={"../../../public/images/ImgMenus/bebidas.jpg"}
          count={122}
          title={"dulces"}
        />
        <CategoryCard
          img={"../../../public/images/ImgMenus/bebidas.jpg"}
          count={122}
          title={"Zumos"}
        />
        <CategoryCard
          img={"../../../public/images/ImgMenus/bebidas.jpg"}
          count={122}
          title={"refrescos"}
        />
        <CategoryCard
          img={"../../../public/images/ImgMenus/bebidas.jpg"}
          count={122}
          title={"refrescos"}
        />
        <Plus/>
      </main>
    </section>
  );
}

export default CategoriesContainer;
