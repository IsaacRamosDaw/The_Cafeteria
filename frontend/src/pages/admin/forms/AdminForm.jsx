import React from "react";
import "./Form.scss";

import Label from "../../../components/label/Label";

function AdminForm() {
  return (
    <main className="form-container">
      <form id="admin-form">
        <Label
          id={"name-admin"}
          placeHolder={"Name of the admin"}
          title={"Name"}
          type={"text"}
        />
        <Label
          id={"password-admin"}
          placeHolder={"password of the admin"}
          title={"Password"}
          type={"password"}
        />
      </form>
    </main>
  );
}


export default AdminForm;
