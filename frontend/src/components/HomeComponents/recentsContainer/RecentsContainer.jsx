import CardProductHome from "../cards/cardProductHome/CardProductHome";
import './RecentsContainer.scss'

export default function RecentsContainer() {
  return (
    <section className="section-recents-container">
      <div className="container-title-card-home">
        <p className="title-card-home">RECIENTES</p>
      </div>
      <div className="carrusel-recents-cards">
        <CardProductHome image={""} title={"Super bocata combo"} price={12} />
        <CardProductHome image={""} title={"Super bocata combo"} price={12} />
        <CardProductHome image={""} title={"Super bocata combo"} price={12} />
      </div>
    </section>
  );
}
