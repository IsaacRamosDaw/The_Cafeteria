import { Link } from "react-router-dom";
  
function WorkerCard({ name }) {
  return (
    <div className="worker-card">
      <img
        className="item-img"
        src="../../../../public/images/ImgMenus/sandwiches.jpg"
        alt="Image school"
      />

      <div className="info">
        <p>{name}</p>
        <span>
          <Link className="link-to-register" to="/createAdmins">
            <img src="../../../../public/images/icons/edit.svg" alt="" />
          </Link>
          <Link className="link-to-register" to="/createAdmins">
            <img src="../../../../public/images/icons/trash.svg" alt="" />
          </Link>
        </span>
      </div>
    </div>
  );
}

export default WorkerCard;
