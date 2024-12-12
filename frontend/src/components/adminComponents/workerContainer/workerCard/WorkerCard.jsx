import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import "./WorkerCard.scss";

function WorkerCard({ username, img, id, onDelete }) {
  const navigate = useNavigate();
  const folder = "http://localhost:8080/images/";

  const handleDelete = () => {
    onDelete(id);
  };

  const handleEdit = () => {
    navigate("/worker/" + id);
  };

  return (
    <div className="worker-card">
      <div className="container-info">
        <img className="item-img" src={`${folder}/${img}`} alt="Image school" />
        <div className="container-name">
          <h2>{username}</h2>
        </div>
      </div>
      <div className="container-control-worker">
        <FaEdit className="btn-edit" onClick={handleEdit} />
        <FaTrash className="btn-trash" onClick={handleDelete} /> 
      </div>
    </div>
  );
}

export default WorkerCard;
