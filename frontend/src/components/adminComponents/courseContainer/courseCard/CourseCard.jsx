import { useNavigate } from "react-router-dom";
import "./CourseCard.scss";
import { FaTrash } from "react-icons/fa";

function CourseCard({ name, id, onDelete }) {
  const navigate = useNavigate();

  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <div className="course-card">
      <div className="container-name-course">
        <h2>{name}</h2>
      </div>

      <div className="container-control-course">
        <FaTrash className="btn-trash" onClick={handleDelete} />
      </div>
    </div>
  );
}

export default CourseCard;
