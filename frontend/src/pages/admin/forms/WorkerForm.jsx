import React from "react";
import "./Form.scss";
import Label from "../../../components/label/Label";

function WorkerForm() {
  return (
    <main className="form-container">
      <form id="worker-form">
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
          title={"Name"}
          type={"text"}
        />
      </form>
    </main>
  );
}

export default WorkerForm;
