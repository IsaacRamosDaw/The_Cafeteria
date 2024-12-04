import SearchBar from "../../../components/searchBar/SearchBar";
import Separator from "../../../components/separator/Separator";
import TabsBar from "../../../components/tabsBar/tabsBar";
import './OwnerSettings.scss'
function OwnerSettings() {
  return (
    <>
      <SearchBar />
      <Separator />
      <main id="owner-settings">
        <div id="info">
          <div id="info-orders">
            <h2>Resumen</h2>
            <span id="space"></span>
            <div id="fields-results">
              <div id="fields">
                <p>Pedidots totales</p>
                <p>Pedidos Hechos</p>
                <p>Pedidos no hechos</p>
                <p>Productos totaless</p>
              </div>
              <div id="results">
                <p>40€</p>
                <p>40€</p>
                <p>40€</p>
                <p>40€</p>
              </div>
            </div>
          </div>
          <div id="info-graphics">
            <div id="text">
              <p>Sandwich de pollo</p>
              <p>Sandwich de pollo</p>
              <p>Sandwich de pollo</p>
              <p>Sandwich de pollo</p>
              <p>Sandwich de pollo</p>
              <p>Sandwich de pollo</p>
              <p>Sandwich de pollo</p>
              <p>Sandwich de pollo</p>
            </div>
            <div id="graphics"></div>
          </div>
        </div>
      </main>
      <TabsBar />
    </>
  );
}

export default OwnerSettings;
