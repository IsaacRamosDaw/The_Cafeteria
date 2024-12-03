// AdminCard.jsx
import { useNavigate } from "react-router-dom";
import "./AdminCard.scss";

function AdminCard({ username, id, onDelete, photo }) {
  const navigate = useNavigate();

  const endPoint = 'http://localhost:8080/images/'

  const handleDelete = () => {
    onDelete(id);
  };

  const handleEdit = () => {
    navigate("/admin/" + id);
  };

  return (
    <div className="admin-card">
      <div className="container-info">
        <img
          className="item-img"
          src={`${endPoint}${photo}`}
          alt="Imagen de administrador"
        />
        <div className="container-name">
          <h2>{username}</h2>
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
