import React from "react";
import Button from "../../../components/button/Button";
import "./Form.scss";
import Label from "../../../components/label/Label";

function AdminForm() {
  const handleCreate = async (e) => {
    const formData = new FormData(document.getElementById("admin-form"));
    try {
      const response = await fetch("http://localhost:8080/api/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          // "Content-Type": "multipart/form-data",
        },
        body: formData,
      });
      console.log(await response.json());
    } catch (error) {
      console.error("Error al crear:", error);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    const formData = new FormData(document.getElementById("admin-form"));

    try {
      const response = await fetch("/api/admin", {
        method: "PUT",
        body: formData,
      });

      console.log(await response.json());
    } catch (error) {
      console.error("Error al editar:", error);
    }
  };

  return (
    <main className="form-container">
      <form id="admin-form">
        <h2>Admin</h2>
        <Label
          id={"name-admin"}
          placeHolder={"Nombre del administrador"}
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
          <Button onClick={handleCreate} text={"Crear"} />
          <Button onClick={handleEdit} text={"Editar"} />
        </div>
      </form>
    </main>
  );
}

export default AdminForm;
