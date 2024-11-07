import CardRecommended from "../../cardRecommended/CardRecommended";
import "./RecommendedContainer.scss";

export default function RecommendedContainer() {
  return (
    <section className="container-recommended-cards">
      <div className="container-title-card-home">
        <p className="title-card-home">RECOMENDADOS</p>
      </div>
      <div className="carrusel-recommended-cards">
        <CardRecommended image={""} title={"Super bocata combo"} price={12} />
        <CardRecommended image={""} title={"Super bocata combo"} price={12} />
      </div>
    </section>
  );
}
