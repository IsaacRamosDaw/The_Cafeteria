import SearchBar from "../../components/searchBar/SearchBar";
import TabsBar from "../../components/tabsBar/tabsBar";
import Separator from "../../components/separator/Separator";
import RecommendedContainer from "../../components/HomeComponents/recommendedContainer/RecommendedContainer";
import PlateOfTheDayContainer from "../../components/HomeComponents/plateOfTheDayContainer/PlateOfTheDayContainer";
import MenuContainer from "../../components/HomeComponents/menuContainer/MenuContainer";
import RecentsContainer from "../../components/HomeComponents/recentsContainer/RecentsContainer";
import "./Home.scss";

function Home() {

  return (
    <div id="home-container">
      <SearchBar />
      <Separator />
      <main id="content-home">
        <RecommendedContainer />
        <PlateOfTheDayContainer />
        <RecentsContainer/>
        <MenuContainer />
      </main>
      <TabsBar />
    </div>
  );
}

export default Home;
