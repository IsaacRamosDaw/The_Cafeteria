import React from "react";
import "./Form.scss";
import Label from "../../../components/label/Label";

function SchoolForm() {
  return (
    <main className="form-container">
      <form id="school-form">
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
          title={"Name"}
          type={"text"}
        />
      </form>
    </main>
  );
}

export default SchoolForm;
