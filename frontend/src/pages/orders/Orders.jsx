import SearchBar from "../../components/searchBar/SearchBar";
import Separator from "../../components/separator/Separator";
import TabsBar from "../../components/tabsBar/TabsBar";
import Order from "../../components/order/Order";
import './Orders.scss';

function Orders() {
  const getUserRole = () => {
    const token = localStorage.getItem("token"); 
    if (!token) return null;
    try {
      const base64Payload = token.split(".")[1];
      const decodedPayload = JSON.parse(atob(base64Payload));
      return decodedPayload.role; 
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

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