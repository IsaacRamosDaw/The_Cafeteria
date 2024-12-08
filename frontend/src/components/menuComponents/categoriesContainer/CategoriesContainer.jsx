import { useEffect, useState } from "react";
import { get, remove } from "../../../services/category.service";
import CategoryCard from "../categoryCard/CategoryCard";
import Plus from "../../workerComponents/Plus";
import "./CategoriesContainer.scss";
import { countByCategory } from "../../../services/product.service";

function CategoriesContainer() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const categoriesData = await get();

        const categoriesWithCounts = await Promise.all(
          categoriesData.map(async (category) => {
            const count = await countByCategory(category.id);
            return { ...category, amount: count };
          })
        );

        setCategories(categoriesWithCounts);
      } catch (error) {
        console.error("Error al obtener categorías o conteos:", error);
      }
    }

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    await remove(id);
    setCategories((prevCategories) =>
      prevCategories.filter((category) => category.id !== id)
    );
  };

  return (
    <section className="category-cards-container">
      <main id="category-container-card">
        {categories.map((category) => (
          <div key={category.id}>
            <CategoryCard
              id={category.id}
              count={category.amount}
              title={category.name}
            />
            <button onClick={() => handleDelete(category.id)}>BORRAME</button>
          </div>
        ))}
        <Plus />
      </main>
    </section>
  );
}

export default CategoriesContainer;
