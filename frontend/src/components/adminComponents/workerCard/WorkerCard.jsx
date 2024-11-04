import { Link } from "react-router-dom";
import "./WorkerCard.scss";

function WorkerCard({ name }) {
  return (
    <div className="worker-card">
      <div className="container-info-worker">
        <div className="container-name-worker">
          <h2>{name}</h2>
        </div>
        <div className="container-img-worker">
          <img
            className="item-img"
            src="/images/ImgMenus/sandwiches.jpg"
            alt="Image school"
          />
        </div>
      </div>
      <div className="container-control-worker">
        <Link className="link-to-register" to="/createWorkers">
          <img src="/images/icons/edit.svg" alt="" />
        </Link>
        <Link className="link-to-register" to="#">
          <img src="/images/icons/trash.svg" alt="" />
        </Link>
      </div>
    </div>
  );
}

export default WorkerCard;
