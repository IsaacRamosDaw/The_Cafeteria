import { useNavigate } from "react-router-dom";
import "./SchoolCard.scss";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";

function SchoolCard({ name, id }) {
  const navigate = useNavigate();

  const handleDelete = () => {
    // onDelete(id);
  };

  const handleEdit = () => {
    navigate("/school/" + id);
  };

  return (
    <div className="school-card">
      <div className="container-img-school">
        <img
          className="item-img"
          src={`/images/ImgMenus/sandwiches.jpg`}
          alt="Image school"
        />
      </div>

      <hr className="divider-school-card"/>

      <div className="container-info-control-school">
        <div className="container-name-school-dashboard">
          <h2>{name}</h2>
        </div>
        <div className="container-control-school">
          <FaEdit className="btn-edit" onClick={handleEdit} />
          <FaTrash className="btn-trash" onClick={handleDelete} />
        </div>
      </div>
    </div>
  );
}

export default SchoolCard;
