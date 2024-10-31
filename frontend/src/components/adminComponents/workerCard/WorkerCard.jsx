import { Link } from "react-router-dom";
import './WorkerCard.scss'
  
function WorkerCard({ name }) {
  return (
    <div className="worker-card">
      <img
        className="item-img"
        src="../../../../public/images/ImgMenus/sandwiches.jpg"
        alt="Image school"
      />

      <hr className="separator-worker-card" />

      <div className="info">
        <h2>{name}</h2>
        <span>
          <Link className="link-to-register" to="/createWorkers">
            <img src="../../../../public/images/icons/edit.svg" alt="" />
          </Link>
          <Link className="link-to-register" to="#">
            <img src="../../../../public/images/icons/trash.svg" alt="" />
          </Link>
        </span>
      </div>
    </div>
  );
}

export default WorkerCard;
