import SearchBar from "../../components/searchBar/SearchBar";
import Separator from "../../components/separator/Separator";
import TabsBar from "../../components/tabsBar/tabsBar";
import Order from "../../components/order/Order";
import './Orders.scss';

function Orders(){

    // Crear un array de estado para guardar los pedidos y que se mapee para mostrarlos

    return(
        <div id="Orders-page">
            <SearchBar />
            <Separator/>
            <main id="orders-container">
                <Order ID_order={"000000"} date={"10/12/2020"} product={"Super Bocata Combo"} quantity={"x1"} />    
                <Order ID_order={"000000"} studentName={"Isaac DAWT"} date={"10/12/2020"} product={"Super Bocata Combo"} quantity={"x1"} />    
                <Order ID_order={"000000"} date={"10/12/2020"} product={"Super Bocata Combo"} quantity={"x1"} />    
            </main>
            <TabsBar />
        </div>
    )
}

export default Orders