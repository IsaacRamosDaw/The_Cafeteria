import { useNavigate } from "react-router-dom";
import "./CoffeCard.scss";

function CoffeCard({ username, id, onDelete }) {
  const navigate = useNavigate();

  const handleDelete = () => {
    onDelete(id);
  };

  const handleEdit = () => {
    console.log("Navigating to:", "/coffeShop/" + id);
    navigate("/coffeShop/" + id);
  };

  return (
    <div className="coffe-card">
      <div className="container-info">
        <img
          className="item-img"
          src={`/images/ImgMenus/sandwiches.jpg`}
          alt="Imagen de cafetería"
        />
        <div className="container-name">
          <h2>{name}</h2>
        </div>
      </div>

      <div className="container-control-coffe">
        <button className="btn-edit" onClick={handleEdit}>
          <img src={`/images/icons/edit.svg`} alt="Editar" />
        </button>
        <button className="btn-trash" onClick={handleDelete}>
          <img src={`/images/icons/trash.svg`} alt="Eliminar" />
        </button>
      </div>
    </div>
  );
}

export default CoffeCard;