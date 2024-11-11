import CardProductHome from "../cards/cardProductHome/CardProductHome";
import "./PlateOfTheDayContainer.scss";

export default function PlateOfTheDayContainer() {
  return (
    <section className="container-plate-of-day-cards">
      <div className="container-title-card-home">
        <p className="title-card-home">PLATO DEL DíA</p>
      </div>
      <div className="container-plate-cards">
        <CardProductHome
          type={2}
          image={""}
          title={"Super bocata combo"}
          price={`${12}$`}
        />
      </div>
    </section>
  );
}
