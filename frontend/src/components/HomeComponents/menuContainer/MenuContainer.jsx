import CardMenuHome from "../cardMenuHome/CardMenuHome";
import "./MenuContainer.scss";

export default function MenuContainer() {
  return (
    <section className="container-menu-cards">
      <div className="container-title-card-home">
        <p className="title-card-home">RECOMENDADOS</p>
      </div>
      <div className="carrusel-menu-cards">
        <CardMenuHome image={""} title={"Super bocota combo"} description={"Dos bocadillos de atun y queso"} time={`${20}-${45} min`} />
        <CardMenuHome image={""} title={"Super bocota combo"} description={"Dos bocadillos de atun y queso"} time={`${20}-${45} min`} />
      </div>
    </section>
  );
}
