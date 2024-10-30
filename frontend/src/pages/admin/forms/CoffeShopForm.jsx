import React from "react";
import './Form.scss'
import Label from "../../../components/label/Label";


function CoffeShopForm() {
  return (
    <main className="form-container">
      <form id="coffeShop-form">
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
      </form>
    </main>
  );
}

export default CoffeShopForm;
