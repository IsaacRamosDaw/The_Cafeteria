import { useEffect, useState } from "react";
import CardProductHome from "../cards/cardProductHome/CardProductHome";
import "./RecentsContainer.scss";

export default function RecentsContainer({worker}) {
  const [recents, setRecents] = useState([]);

  useEffect(() => {
    setRecents([
      {
        image: "",
        title: "Super bocata combo",
        price: 12,
      },
      {
        image: "",
        title: "Super bocata combo",
        price: 12,
      },
      {
        image: "",
        title: "Super bocata combo",
        price: 12,
      },
    ]);
  }, []);
  return (
    <section className="section-recents-container">
      <div className="container-title-card-home">
        <p className="title-card-home">RECIENTES</p>
      </div>
      <div className="carrusel-recents-cards">
        {recents.map((recent, index) => (
          <CardProductHome
            key={index}
            image={recent.image}
            title={recent.title}
            price={recent.price}
          />
        ))}
      {worker && <Plus/>}
      </div>
    </section>
  );
}
