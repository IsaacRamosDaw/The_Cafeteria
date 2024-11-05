import Button from "../../../button/Button";
import Label from "../../../label/Label";
import { edit, getOne } from "../../../../services/adminService";
import { useNavigate, useParams } from "react-router-dom";
import "../Form.scss";
import { useEffect, useState } from "react";

export default function EditAdmin() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [adminData, setAdminData] = useState({name: ""})

  useEffect(() => {
    getOne(id)
      .then((data) => setAdminData(data))
      .catch((error) => console.log("Error fetching admin data:", error));
  }, [id]);

  const handleEdit = async (e) => {
    e.preventDefault();

    let nameAdmin = document.querySelector("#name-admin");
    let passwordAdmin = document.querySelector("#password-admin");

    const formData = {
      name: nameAdmin.value,
      password: passwordAdmin.value,
    };

    edit(id, formData).then(() => {
      navigate(-1);
    });
  };

  return (
    <main className="form-container">
      <form id="admin-form">
        <h2>Admin</h2>
        <Label
          id={"name-admin"}
          placeHolder={adminData.name}
          title={"Nombre"}
          type={"text"}
        />
        <Label
          id={"password-admin"}
          placeHolder={"Contraseña del administrador"}
          title={"Contraseña"}
          type={"password"}
        />

        <div id="buttons">
          <Button onClick={handleEdit} text={"Editar"} />
        </div>
      </form>
    </main>
  );
}
