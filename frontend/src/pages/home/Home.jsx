import SearchBar from "../../components/searchBar/SearchBar";
import TabsBar from "../../components/tabsBar/tabsBar";
import Separator from "../../components/separator/Separator"
import "./Home.scss";
import RecommendedContainer from "../../components/HomeComponents/recommendedContainer/RecommendedContainer";
import PlateOfTheDayContainer from "../../components/HomeComponents/plateOfTheDayContainer/PlateOfTheDayContainer";
import MenuContainer from "../../components/HomeComponents/menuContainer/MenuContainer";

function Home() {
  return (
    <div id="home-container">
      <SearchBar />
      <Separator />
      <main id="content-home">
        <RecommendedContainer />
        <PlateOfTheDayContainer />
        <MenuContainer />
      </main>
      <TabsBar />
    </div>
  );
}

export default Home;
