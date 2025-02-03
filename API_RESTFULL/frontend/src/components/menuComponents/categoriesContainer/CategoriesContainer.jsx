import { useEffect, useState } from "react";
import { get } from "../../../services/category.service";
import CategoryCard from "../categoryCard/CategoryCard";
import {countByCategory,
getFirstByCategory,
} from "../../../services/product.service";
import "./CategoriesContainer.scss";

function CategoriesContainer() {
  const [categories, setCategories] = useState([]);
  const [productImages, setProductImages] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const categoriesData = await get();

        const categoriesWithCounts = [];
        for (const category of categoriesData) {
          const count = await countByCategory(category.id);
          categoriesWithCounts.push({ ...category, amount: count });
        }
        setCategories(categoriesWithCounts);

        const images = {};
        for (const category of categoriesWithCounts) {
          const product = await getFirstByCategory(category.id);
          images[category.id] = product?.filename || "";
        }
        setProductImages(images);
      } catch (error) {
        console.error(
          "Error al obtener categorías, conteos o imágenes:",
          error
        );
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
              photo={productImages[category.id]}
            />
          </div>
        ))}
      </main>
    </section>
  );
}

export default CategoriesContainer;
