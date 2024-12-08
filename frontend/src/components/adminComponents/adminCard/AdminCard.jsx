import { useNavigate } from "react-router-dom";
import "./AdminCard.scss";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

function AdminCard({ username, id, onDelete, photo }) {
  const navigate = useNavigate();

  const folder = 'http://localhost:8080/images/'

  const handleDelete = () => {
    onDelete(id);
  };

  const handleEdit = () => {
    console.log("Navigating to:", "/admin/" + id);
    navigate("/admin/" + id);
  };

  return (
    <div className="admin-card">
      <div className="container-info">
        <img
          className="item-img"
          src={`${folder}${photo}`}
          alt="Imagen de administrador"
        />
        <div className="container-name">
          <h2>{username}</h2>
        </div>
      </div>

      <div className="container-control-admin">
        <button className="btn-edit" onClick={handleEdit}>
          < FaEdit />
        </button>
        <button className="btn-trash" onClick={handleDelete}>
          < RiDeleteBin6Line />
        </button>
      </div>
    </div>
  );
}

export default AdminCard;
