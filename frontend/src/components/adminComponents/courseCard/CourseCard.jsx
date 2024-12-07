import { useNavigate } from "react-router-dom";
import "./CourseCard.scss";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

function CourseCard({ name, id, onDelete}) {
  const navigate = useNavigate();

  const handleDelete = () => {
    onDelete(id);
  };

  const handleEdit = () => {
    console.log("Navigating to:", "/course/" + id);
    navigate("/course/" + id);
  };

  return (
    <div className="course-card">
      <div className="container-info">
        <div className="container-name">
          <h2>{name}</h2>
        </div>
      </div>

      <div className="container-control-course">
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

export default CourseCard;