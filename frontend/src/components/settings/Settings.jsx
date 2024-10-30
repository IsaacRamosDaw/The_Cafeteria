import React from "react";
import "./Settings.scss";
import Button from "../button/Button";

function Settings({ school, admin, worker }) {
  if (admin) {
    return (
      <form id="settings" action="">
        <Button submit={true}/>
      </form>
    )
  }
  if (school) {
    return (
      <form id="settings">
        
      </form>
    )
  }
  if (worker) {
    return (
      <form id="settings">
        
      </form>
    )
  }
}

export default Settings;
