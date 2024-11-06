// AdminCard.jsx
import { useNavigate } from "react-router-dom";
import "./AdminCard.scss";

function AdminCard({ name, id, onDelete }) {
  const navigate = useNavigate();

  const handleDelete = () => {
    onDelete(id);
  };

  const handleEdit = () => {
    navigate("/admin/edit");
  };

  return (
    <div className="admin-card">
      <div className="container-info">
        <img
          className="item-img"
          src={`/images/ImgMenus/sandwiches.jpg`}
          alt="Imagen de administrador"
        />
        <div className="container-name">
          <h2>{name}</h2>
        </div>
      </div>

      <div className="container-control-admin">
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

export default AdminCard;
