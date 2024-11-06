import { useNavigate } from "react-router-dom";
import "./SchoolCard.scss";

function SchoolCard({ name , id, onDelete}) {
    const navigate = useNavigate();

    const handleDelete = () => {
      onDelete(id);
    };

    const handleEdit = () => {
      navigate("/school/" + id);
    };
  
  return (
    <div className="school-card">
      <div className="container-info-school">
        <div className="container-img-school">
          <img
            className="item-img"
            src={`/images/ImgMenus/sandwiches.jpg`}
            alt="Image school"
          />
        </div>
        <div className="container-name-school">
          <h2>{name}</h2>
        </div>
      </div>
      <div className="container-control-school">
        <button className="link-to-register" onClick={handleEdit}>
          <img src={`/images/icons/edit.svg`} alt="Editar" />
        </button>
        <button className="btn-trash" onClick={handleDelete}>
          <img src={`/images/icons/trash.svg`} alt="Eliminar" />
        </button>
      </div>
    </div>
  );
}

export default SchoolCard;