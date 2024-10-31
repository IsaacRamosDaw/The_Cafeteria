import { Link } from "react-router-dom"
import './AdminCard.scss'

function AdminCard({ name, id }) {
  let data = {name, id}
  return (
    <div className="admin-card">
      <img
        className="item-img"
        src="../../../../public/images/ImgMenus/sandwiches.jpg"
        alt="Image school"
      />

      <hr className="separator-admin-card" />

      <div className="info">
        <h2>{data.name}</h2>
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

export default AdminCard;
