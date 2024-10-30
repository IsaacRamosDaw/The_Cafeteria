import React from "react";
import "./Settings.scss";
import Button from "../../button/Button";
import Label from "../../label/Label";

function formCoffeShop() {
  return (
    <div id="CoffeShop-form">
      <Label
        id={"name-coffeShop"}
        placeHolder={"Name of the CoffeShop"}
        title={"Name"}
        type={"text"}
      />
      <Label
        id={"password-coffeShop"}
        placeHolder={"password of the CoffeShop"}
        title={"Password"}
        type={"password"}
      />
      <Label
        id={"adress-coffeShop"}
        placeHolder={"adress of the CoffeShop"}
        title={"Adress"}
        select={true}
      />
    </div>
  );
}
function formSchool() {
  return (
    <div id="school-form">
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
    </div>
  );
}
function formWorker() {
  return (
    <div id="worker-form">
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
    </div>
  );
}
function formAdmin() {
  return (
    <div id="admin-form">
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
    </div>
  );
}
function Settings() {
  return (
    <>
      <p>hola</p>
    </>
  )
  
}

export default Settings;
