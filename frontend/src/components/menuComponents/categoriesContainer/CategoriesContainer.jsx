import { useEffect, useState } from "react";
import { get } from "../../../services/category.service";
import CategoryCard from "../categoryCard/CategoryCard";
import { countByCategory, findByPk } from "../../../services/product.service";
import "./CategoriesContainer.scss";

function CategoriesContainer() {
  const [categories, setCategories] = useState([]);
  const [ productView, setProductView ] = useState({})

  useEffect(() => {
    async function fetchData() {
      try {
        const categoriesData = await get();
        const product = await findByPk(1)

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
          </div>
        ))}
      </main>
    </section>
  );
}

export default CategoriesContainer;
