import { remove } from "../../../services/adminService";
import { edit } from "../../../services/adminService";
import "./AdminCard.scss";

function AdminCard({ name, id }) {
  const handleDelete = () => {
    remove(id).then((res) => {
      console.log(res);
      document.reload();
    });
  };

  const handleEdit = () => {
    edit(id);
  };

  return (
    <div className="admin-card">

      

      <div className="container-info">
        <img
          className="item-img"
          src={`/images/ImgMenus/sandwiches.jpg`}
          alt="Imagen de administrador"
        />

        <div className="container-name">
          <h2>{name}</h2>
        </div>
      </div>

      <div className="container-control-admin">
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

export default AdminCard;
