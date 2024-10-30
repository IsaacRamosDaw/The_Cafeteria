import SearchBar from "../../components/searchBar/SearchBar";
import TabsBar from "../../components/tabsBar/tabsBar";
import Separator from "../../components/separator/Separator"
import Offer from "../../components/offer/Offer";
import "./Home.scss";

function Home() {
  return (
    <>
      <SearchBar />
      <Separator />
      <main id="home-container">
        <Offer/>
      </main>
      <TabsBar />
    </>
  );
}

export default Home;
