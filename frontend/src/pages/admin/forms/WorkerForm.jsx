import React from "react";
import "./Form.scss";
import Label from "../../../components/label/Label";
import Button from "../../../components/button/Button";

function WorkerForm() {
  const handleCreate = async (e) => {
    e.preventDefault();
    const formData = new FormData(document.getElementById("worker-form"));

    try {
      const response = await fetch("http://localhost:8080/api/worker", {
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
      <form id="worker-form">
        <h2>Worker</h2>
        <Label
          id={"name-worker"}
          placeHolder={"Name of the worker"}
          title={"Name"}
          type={"text"}
        />
        <Label
          id={"password-worker"}
          placeHolder={"password of the worker"}
          title={"Password"}
          type={"password"}
        />
        <Label
          id={"phone-worker"}
          placeHolder={"phone of the worker"}
          title={"Phone"}
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

export default WorkerForm;
