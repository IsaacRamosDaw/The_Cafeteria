import SearchBar from "../../components/searchBar/SearchBar";
import TabsBar from "../../components/tabsBar/tabsBar";
import Separator from "../../components/separator/Separator";
import "./Home.scss";
import RecommendedContainer from "../../components/HomeComponents/recommendedContainer/RecommendedContainer";
import PlateOfTheDayContainer from "../../components/HomeComponents/plateOfTheDayContainer/PlateOfTheDayContainer";
import MenuContainer from "../../components/HomeComponents/menuContainer/MenuContainer";
import { useTheme } from "../../contexts/ThemeContext";
import RecentsContainer from "../../components/HomeComponents/recentsContainer/RecentsContainer";

function Home() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div id="home-container">
      <SearchBar />
      <Separator />
      <main id="content-home">
        <button onClick={toggleTheme}>
          Switch to {theme === "light" ? "dark" : "light"} mode
        </button>
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
