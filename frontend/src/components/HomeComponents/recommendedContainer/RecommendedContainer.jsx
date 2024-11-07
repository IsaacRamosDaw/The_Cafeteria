import "./RecommendedContainer.scss";
import CardProductHome from "../cardProductHome/CardProductHome";

export default function RecommendedContainer() {
  return (
    <section className="container-recommended-cards">
      <div className="container-title-card-home">
        <p className="title-card-home">RECOMENDADOS</p>
      </div>
      <div className="carrusel-recommended-cards">
        <CardProductHome image={""} title={"Super bocata combo"} price={12} />
        <CardProductHome image={""} title={"Super bocata combo"} price={12} />
        <CardProductHome image={""} title={"Super bocata combo"} price={12} />
      </div>
    </section>
  );
}
