import { useNavigate } from "react-router-dom";
import "./AdminCard.scss";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { getUserId } from "../../../../services/utils";

function AdminCard({ username, id, onDelete, photo }) {
  const navigate = useNavigate();

  const folder = "http://localhost:8080/images/admin";

  const handleDelete = () => {
    onDelete(id);
  };

  const handleEdit = () => {
    console.log("Navigating to:", "/admin/" + id);
    navigate("/admin/" + id);
  };

  const userId = getUserId()

  return (
    <div className="admin-card">
      <div className="container-info">
        <img
          className="item-img"
          src={`${folder}/${photo}`}
          alt="Imagen de administrador"
        />
        <div className="container-name">
          <h2>{username}</h2>
        </div>
      </div>

      <div className="container-control-admin">
        {
          userId == id ?
          <FaEdit className="btn-edit" onClick={handleEdit} />
          : ""
        }
        <FaTrash className="btn-trash" onClick={handleDelete} />
      </div>
    </div>
  );
}

export default AdminCard;
