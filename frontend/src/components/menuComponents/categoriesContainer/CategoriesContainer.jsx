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
          category={"/menu/Desayunos"}
        />
        <CategoryCard
          img={"../../../public/images/ImgMenus/bebidas.jpg"}
          count={122}
          title={"Cafes"}
          category={"/menu/Cafes"}
        />
        <CategoryCard
          img={"../../../public/images/ImgMenus/bebidas.jpg"}
          count={122}
          title={"dulces"}
          category={"/menu/Dulces"}
        />
        <CategoryCard
          img={"../../../public/images/ImgMenus/bebidas.jpg"}
          count={122}
          title={"Zumos"}
          category={"/menu/Zumos"}
        />
        <CategoryCard
          img={"../../../public/images/ImgMenus/bebidas.jpg"}
          count={122}
          title={"refrescos"}
          category={"/menu/Zumos"}
        />
        <Plus/>
      </main>
    </section>
  );
}

export default CategoriesContainer;
