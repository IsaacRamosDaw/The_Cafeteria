import SearchBar from "../../components/searchBar/SearchBar";
import TabsBar from "../../components/tabsBar/tabsBar";
import Separator from "../../components/separator/Separator"
import Offer from "../../components/offer/Offer";
import "./Home.scss";

function Home() {
  return (
    <div id="home-container">
      <SearchBar />
      <Separator />
      <main id="container-home-page">
        <Offer/>
      </main>
      <TabsBar />
    </div>
  );
}

export default Home;
