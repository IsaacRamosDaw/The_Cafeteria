import { Link } from "react-router-dom";
import { remove } from "../../../services/adminService";
import "./AdminCard.scss";

function AdminCard({ name, id }) {
  const handleDelete = () => {
    remove(id).then((res) => {
      console.log(res);
      document.reload()
    });
  };

  return (
    <div className="admin-card">
      <img
        className="item-img"
        src={`/images/ImgMenus/sandwiches.jpg`}
        alt="Imagen de administrador"
      />

      <hr className="separator-admin-card" />

      <div className="info">
        <h2>{name}</h2>
        <span>
          <Link className="link-to-register" to="/createAdmins">
            <img src={`/images/icons/edit.svg`} alt="Editar" />
          </Link>
          <button
            className="link-to-register delete-button"
            onClick={handleDelete}
          >
            <img src={`/images/icons/trash.svg`} alt="Eliminar" />
          </button>
        </span>
      </div>
    </div>
  );
}

export default AdminCard;
