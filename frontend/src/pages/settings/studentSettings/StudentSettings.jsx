import SearchBar from "../../../components/searchBar/SearchBar"
import TabsBar from "../../../components/tabsBar/tabsBar"
import Separator from "../../../components/separator/Separator"
import { Link } from "react-router-dom";

import './StudentSettings.scss'
import Setting from "../../../components/setttingsComp/Setting";
function StudentSettings() {
  
  return (
    <>
      <SearchBar />
      <Separator />
      <main id="student-setttings">
        <div id="wallet-container">
          <div id="wallet">
            <p>Créditos restantes</p>
            <p id="money">37€</p>
          </div>
          <div id="add-money">
            <Link>
              <img src="/public/images/icons/plus.svg" alt="add your money" />
            </Link>
          </div>
        </div>
        <form id="delete">
          <h2>Delete account</h2>
        </form>
        
        <Setting
          title={"Nombre"}
          text={"Escoge tu nuevo nombre"}
          placeholder={"último nombre"}
        />
        <Setting
          title={"Email"}
          text={"Escoge tu nuevo Email"}
          placeholder={"Último Email"}
        />
        <Setting
          title={"Teléfono"}
          text={"Escoge tu nuevo Teléfono"}
          type="number"
          placeholder={"Último Email"}
        />
        <Setting
          title={"Password"}
          text={"Escoge tu nueva contraseña"}
          type="password"
          placeholder={"Último Email"}
          />
      </main>
      <TabsBar />
    </>
  );
}

export default StudentSettings