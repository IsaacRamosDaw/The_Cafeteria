import SearchBar from "../../components/searchBar/SearchBar";
import TabsBar from "../../components/tabsBar/tabsBar";
import Separator from "../../components/separator/Separator"
import "./Home.scss";

function Home() {
  return (
    <>
      <SearchBar />
      <Separator />
      <mian id="home-container">
      </mian>
      <TabsBar />
    </>
  );
}

export default Home;
