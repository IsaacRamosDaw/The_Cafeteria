import { useEffect, useState } from "react";
import CoffeCard from "../coffeCard/CoffeCard.jsx";
import { get, remove } from "../../../services/coffeshopService.js";
import "./CoffeContainer.scss";

function CoffeContainer() {
  const [coffeShops, setCoffeShops] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await get();
      setCoffeShops(data);
    }

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    await remove(id);
    setCoffeShops((prevCoffeShops) => prevCoffeShops.filter((coffeShop) => coffeShop.id !== id));
  };

  return (
    <section className="section-container-coffe-cards">
      {coffeShops.map((coffeShop) => (
        <CoffeCard
          key={coffeShop.id}
          name={coffeShop.name}
          id={coffeShop.id}
          onDelete={handleDelete}
        />
      ))}
    </section>
  );
}

export default CoffeContainer;