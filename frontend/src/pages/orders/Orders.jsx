import SearchBar from "../../components/searchBar/SearchBar";
import TabsBar from "../../components/tabsBar/tabsBar";
import './Orders.scss';

function Orders(){
    return(
        <main>
            <SearchBar />
            <h1>Los pedidos</h1>
            <TabsBar />
        </main>
    )
}

export default Orders