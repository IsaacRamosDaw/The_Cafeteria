import { useEffect, useState } from "react";
import { get, remove } from "../../../services/category.service";
import CategoryCard from "../categoryCard/CategoryCard";
import Plus from '../../workerComponents/Plus';
import "./CategoriesContainer.scss";
import { Link } from "react-router-dom";


function CategoriesContainer() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const categoriesData = await get();
      setCategories(categoriesData);
    }

    fetchData();
  }, []);

    const handleDelete = async (id) => {
      await remove(id);
      setCategories((prevCategory) => prevCategory.filter((category) => category.id !== id));
  };

  return (
    <section className="category-cards-container" >
      <main id="category-container-card">
        {
          categories.map((category) => (
            <>
              <CategoryCard
                key={category.id} // Asegúrate de usar una clave única
                img={"../../../public/images/ImgMenus/bebidas.jpg"}
                count={category.amount}
                title={category.name}
                category={`/menu/${category.name}`}

              />
              <Link onClick={handleDelete}>BORRAME</Link>
            </>
          ))
        }
        {/* <CategoryCard
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
        /> */}
        <Plus />
      </main>
    </section>
  );
}

export default CategoriesContainer;
