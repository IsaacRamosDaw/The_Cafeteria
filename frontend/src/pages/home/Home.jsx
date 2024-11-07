import SearchBar from "../../components/searchBar/SearchBar";
import TabsBar from "../../components/tabsBar/tabsBar";
import Separator from "../../components/separator/Separator"
import "./Home.scss";
import RecommendedContainer from "../../components/HomeComponents/recommendedContainer/RecommendedContainer";

function Home() {
  return (
    <div id="home-container">
      <SearchBar />
      <Separator />
      <main id="content-home">
        <RecommendedContainer />
      </main>
      <TabsBar />
    </div>
  );
}

export default Home;
