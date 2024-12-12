import { useEffect, useState } from "react";
import CardMenuHome from "../cards/cardMenuHome/CardMenuHome";
import "./MenuContainer.scss";

export default function MenuContainer({worker}) {
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    setMenus([
      {
        image: "",
        title: "Super bocata combo",
        description: "Dos bocadillos de atun y queso",
        time: `${20} min`,
      },
      {
        image: "",
        title: "Super bocata combo",
        description: "Dos bocadillos de atun y queso",
        time: `${20}~ min`,
      },
      {
        image: "",
        title: "Super bocata combo",
        description: "Dos bocadillos de atun y queso",
        time: `${20}-${45} min`,
      },
    ]);
  }, []);

  return (
    <section className="container-menu-cards">
      <div className="container-title-card-home">
        <p className="title-card-home">MENÚ</p>
      </div>
      <div className="container-menu-cards">
        {menus.map((menu, index) => (
          <CardMenuHome
            key={index}
            image={menu.image}
            title={menu.title}
            description={menu.description}
            time={menu.time}
          />
        ))}
      {worker && <Plus/>}
      </div>
    </section>
  );
}
