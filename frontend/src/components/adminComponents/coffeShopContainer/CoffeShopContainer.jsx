import { useEffect, useState } from "react";
import CoffeCard from "./coffeCard/CoffeCard.jsx"
import { get, remove } from "../../../services/coffeShop.service.js";
import "./CoffeShopContainer.scss";

function CoffeShopContainer() {
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
    setCoffeShops((prevCoffeShops) =>
      prevCoffeShops.filter((coffeShop) => coffeShop.id !== id)
    );
  };

  return (
    <section className="section-container-coffe-cards">
      {coffeShops.map((coffeShop) => (
        <CoffeCard
          key={coffeShop.id}
          name={coffeShop.name}
          id={coffeShop.id}
          file={coffeShop.filename}
          onDelete={handleDelete}
        />
      ))}
    </section>
  );
}

export default CoffeShopContainer;
