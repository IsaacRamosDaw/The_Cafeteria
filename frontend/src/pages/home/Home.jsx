import SearchBar from "../../components/searchBar/SearchBar";
import TabsBar from "../../components/tabsBar/TabsBar";
import Separator from "../../components/separator/Separator";
import RecommendedContainer from "../../components/HomeComponents/recommendedContainer/RecommendedContainer";
import PlateOfTheDayContainer from "../../components/HomeComponents/plateOfTheDayContainer/PlateOfTheDayContainer";
import MenuContainer from "../../components/HomeComponents/menuContainer/MenuContainer";
import RecentsContainer from "../../components/HomeComponents/recentsContainer/RecentsContainer";
import "./Home.scss";
import { getUserRole } from "../../services/utils";

function Home() {
  return (
    <div id="home-container">
      <SearchBar input="true" />
      <Separator />
      {
      getUserRole() == "student" 
      ?
        <main id="content-home">
          <RecommendedContainer />
          <PlateOfTheDayContainer />
          <RecentsContainer />
          <MenuContainer />
        </main> 
      : 
        <main id="content-home">
        <RecommendedContainer />
      </main>
      }
      <TabsBar />
    </div>
  );
}

export default Home;
