import SearchBar from "../../components/searchBar/SearchBar";
import TabsBar from "../../components/tabsBar/TabsBar";
import CategoriesContainer from "../../components/menuComponents/categoriesContainer/CategoriesContainer";
import { getUserRole } from "../../services/utils";
import MenuOwner from "../menuOwner/MenuOwner";
import "./Menu.scss";
import { useEffect } from "react";
// import { useLocation } from "react-router-dom";

function Menu() {
  // const serverURL = import.meta.env.VITE_SERVER_URL
  // const location = useLocation()
  // const { user } = location.user || {}

  // console.log(user)

  // let ws = {}

  // useEffect(() => {
  //   // const SERVER_URL = `${serverURL}/?username=${user.username}`
  //   // ws.current = new WebSocket(SERVER_URL)

  //   // ws.current.onopen = () => {
  //   //   console.log('Connection Opened')
  //   // }

  //   // ws.current.onmessage = (e) => {
  //   //   const data = JSON.parse(e.data)

  //   //   console.log(data)
  //   // } 

  //   // return () => {
  //   //   console.log("Cleaning up...")
  //   //   ws.current.close()
  //   // }

  // })

  return (
    <div id="menu-page-container">
      <SearchBar />
      {getUserRole() == "student" ? <CategoriesContainer /> : <MenuOwner />}
      <TabsBar />
    </div>
  );
}

export default Menu;
