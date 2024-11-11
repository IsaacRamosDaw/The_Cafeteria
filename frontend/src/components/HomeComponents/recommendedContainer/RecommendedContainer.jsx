import "./RecommendedContainer.scss";
import CardProductHome from "../cards/cardProductHome/CardProductHome";
import { useEffect, useState } from "react";

export default function RecommendedContainer() {
  const [recommendeds, setRecommendeds] = useState([]);

  useEffect(() => {
    setRecommendeds([
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
    <section className="container-recommended-cards">
      <div className="container-title-card-home">
        <p className="title-card-home">RECOMENDADOS</p>
      </div>
      <div className="carrusel-recommended-cards">
        {recommendeds.map((recommended, index) => (
          <CardProductHome
            key={index}
            image={recommended.image}
            title={recommended.title}
            price={recommended.price}
          />
        ))}
      </div>
    </section>
  );
}
