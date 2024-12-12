import { useEffect, useState } from "react";
import CardProductHome from "../cards/cardProductHome/CardProductHome";
import "./PlateOfTheDayContainer.scss";

export default function PlateOfTheDayContainer({worker}) {
  const [plate, setPlate] = useState({});

  useEffect(() => {
    setPlate(
      {
        image: "",
        title: "Super bocata combo",
        price: 12,
      },
    );
  }, []);
  
  return (
    <section className="container-plate-of-day-cards">
      <div className="container-title-card-home">
        <p className="title-card-home">PLATO DEL DíA</p>
      </div>
      <div className="container-plate-cards">
        <CardProductHome
          type={2}
          image={plate.image}
          title={plate.title}
          price={plate.price}
        />
      {worker && <Plus/>}
      </div>
    </section>
  );
}
