import SearchBar from "../../components/searchBar/SearchBar";
import TabsBar from "../../components/tabsBar/tabsBar";
import Offers from "../../components/offers/Offers";
import "./Home.scss";

function Home() {
  return (
    <main id="home-container">
      <SearchBar />
      <section className="content-home">
        <Offers />
        <Offers />
        <Offers />
        <Offers />
      </section>
      <TabsBar />
    </main>
  );
}

export default Home;
