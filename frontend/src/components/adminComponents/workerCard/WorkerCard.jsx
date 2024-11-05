import { useNavigate } from "react-router-dom";
import { remove } from "../../../services/workerService";
import "./WorkerCard.scss";

function WorkerCard({ name , id}) {
    const navigate = useNavigate();

    const handleDelete = () => {
      remove(id).then((res) => {
        console.log(res);
      });
  };
  
  const reload = () => {
    reload();
  }

    const handleEdit = () => {
      navigate("/admin/" + id);
  };
  
  return (
    <div className="worker-card">
      <div className="container-info-worker">
        <div className="container-img-worker">
          <img
            className="item-img"
            src={`/images/ImgMenus/sandwiches.jpg`}
            alt="Image school"
          />
        </div>
        <div className="container-name-worker">
          <h2>{name}</h2>
        </div>
      </div>
      <div className="container-control-worker">
        <button className="link-to-register" onClick={handleEdit}>
          <img src={`/images/icons/edit.svg`} alt="Editar" />
        </button>
        <button
          className="link-to-register delete-button"
          onClick={handleDelete}
        >
          <img src={`/images/icons/trash.svg`} alt="Eliminar" />
        </button>
      </div>
    </div>
  );
}

export default WorkerCard;
