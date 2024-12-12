import { useNavigate } from "react-router-dom";
import "./CoffeCard.scss";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";

function CoffeCard({ name, id, file, onDelete}) {
  const navigate = useNavigate();

  const handleDelete = () => {
    onDelete(id);
  };

  const folder = "http://localhost:8080/images/"

  const handleEdit = () => {
    console.log("Navigating to:", "/coffeShop/" + id);
    navigate("/coffeShop/" + id);
  };

  return (
    <div className="coffe-card">
      <div className="container-info">
        <img
          className="item-img"
          src={folder+file}
          alt="Imagen de cafetería"
        />
        <div className="container-name">
          <h2>{name}</h2>
        </div>
      </div>

     
      <div className="container-control-coffe">
        <FaEdit className="btn-edit" onClick={handleEdit} />
        <FaTrash className="btn-trash" onClick={handleDelete} />
      </div>
    </div>
  );
}

export default CoffeCard;