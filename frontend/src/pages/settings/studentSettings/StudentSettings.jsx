import SearchBar from "../../../components/searchBar/SearchBar"
import Setting from "../../../components/setttingsComp/Setting"
import TabsBar from "../../../components/tabsBar/tabsBar"
import Separator from "../../../components/separator/Separator"

import './StudentSettings.scss'
function StudentSettings() {
  
  return (
    <>
      <SearchBar />
      <Separator />
      <main id="student-setttings">
        <div>
          <div id="wallet">
            <p>Créditos restantes</p>
            <p id="money">$dinero</p>
          </div>
          <Setting
            title={"Perfil"}
            icon={"../../../../public/images/icons/profile.svg"}
            to={""}
          />
          <Setting
            title={"Creditos"}
            icon={"../../../../public/images/icons/credits.svg"}
            to={""}
          />
        </div>
      </main>
      <TabsBar />
    </>
  );
}

export default StudentSettings