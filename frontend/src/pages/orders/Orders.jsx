import SearchBar from "../../components/searchBar/SearchBar";
import Separator from "../../components/separator/Separator";
import TabsBar from "../../components/tabsBar/tabsBar";
import Order from "../../components/order/Order";
import './Orders.scss';

function Orders(){
    return(
        <>
            <SearchBar />
            <Separator/>
            <main id="orders-container">
                <h1>Orders</h1>
                <Order/>    
                <Order/>    
                <Order/>    
                <Order/>    
            </main>
            <TabsBar />
        </>
    )
}

export default Orders