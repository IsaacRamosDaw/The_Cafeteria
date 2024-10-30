import React from "react";
import Button from "../button/Button";
import "./Settings.scss";

function Settings({ type }) {
  

  return (
    type === 'worker' ? formWorker() : 
    type === 'school' ? formSchool() : 
    formAdmin()
  )
    
  //   {
  //   return (
  //     <form id="settings" action="">
  //       <Button submit={true}/>
  //     </form>
  //   )
  // }
  // if (school) {
  //   return (
  //     <form id="settings">
        
  //     </form>
  //   )
  // }
  // if (worker) {
  //   return (
  //     <form id="settings">
        
  //     </form>
  //   )
  // }

}

function formSchool(){

}
function formWorker(){
  return (
    <div>

    </div>
  )
}
function formAdmin(){

}

export default Settings;
