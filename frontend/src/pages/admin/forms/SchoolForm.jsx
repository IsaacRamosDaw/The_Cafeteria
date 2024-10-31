import React from "react";
import "./Form.scss";
import Label from "../../../components/label/Label";
import Button from '../../../components/button/Button'

function SchoolForm() {
  const handleCreate = async (e) => {
    e.preventDefault();
    const formData = new FormData(document.getElementById("school-form"));

    try {
      const response = await fetch("http://localhost:8080/api/school", {
        method: "POST",
        body: formData,
      });
      console.log(await response.json());
    } catch (error) {
      console.error("Error al crear:", error);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    const formData = new FormData(document.getElementById("worker-form"));

    try {
      const response = await fetch("/api/worker", {
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
      <form id="school-form">
        <h2>Schools</h2>
        <Label
          id={"name-school"}
          placeHolder={"Name of the school"}
          title={"Name"}
          type={"text"}
        />
        <Label
          id={"password-school"}
          placeHolder={"password of the school"}
          title={"Password"}
          type={"password"}
        />
        <Label
          id={"phone-school"}
          placeHolder={"phone of the school"}
          title={"Phone"}
          type={"number"}
        />
        <Label
          id={"phone-school"}
          placeHolder={"Adress of the school"}
          title={"Adress"}
          type={"text"}
        />
        <div id="buttons">
          <Button onClick={handleCreate} text={"Crear"} />
          <Button onClick={handleEdit} text={"Editar"} />
        </div>
      </form>
    </main>
  );
}

export default SchoolForm;
