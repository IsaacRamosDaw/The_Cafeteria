import SearchBar from "../../components/searchBar/SearchBar";
import Separator from "../../components/separator/Separator";
import TabsBar from "../../components/tabsBar/TabsBar";
import Order from "../../components/order/Order";
import './Orders.scss';
import { getUserRole } from "../../services/utils";

function Orders() {

  const role = getUserRole(); 

	return (
		<div id="Orders-page">
			<SearchBar />
			<Separator />
			<main id="orders-container">
			{
			role === "worker" ? 
				<Order ID_order={"0001"} studentName={"Isaac"} course={'2DAWT'} date={"10/12/2020"} product={"Super Bocata Combo"} quantity={"x1"} /> :
				<Order ID_order={"0000"} date={"10/12/2020"} product={"Super Bocata Combo"} quantity={"x1"} />
			}
			{
			role === "worker" ? 
				<Order ID_order={"0001"} studentName={"Isaac"} course={'2DAWT'} date={"10/12/2020"} product={"Super Bocata Combo"} quantity={"x1"} /> :
				<Order ID_order={"0000"} date={"10/12/2020"} product={"Super Bocata Combo"} quantity={"x1"} />
			}
			{
			role === "worker" ? 
				<Order ID_order={"0001"} studentName={"Isaac"} course={'2DAWT'} date={"10/12/2020"} product={"Super Bocata Combo"} quantity={"x1"} /> :
				<Order ID_order={"0000"} date={"10/12/2020"} product={"Super Bocata Combo"} quantity={"x1"} />
			}
			</main>
			<TabsBar />
		</div>
	)
}

export default Orders