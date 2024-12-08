import SearchBar from "../../components/searchBar/SearchBar";
import Separator from "../../components/separator/Separator";
import TabsBar from "../../components/tabsBar/TabsBar";
import Order from "../../components/order/Order";
import { get, getByStudent } from "../../services/order.service";
import { useEffect, useState } from "react";
import './Orders.scss';

function Orders() {
	const [userId, setUserId] = useState();
	const token = localStorage.getItem("token");

	const getUserRole = () => {
		if (!token) return null;

			const base64Payload = token.split(".")[1];
			const decodedPayload = JSON.parse(atob(base64Payload));
			useEffect(() => setUserId(decodedPayload.id));
			return decodedPayload.role;
	};

	const role = getUserRole();
	const [orders, setOrders] = useState([]);
	if (role === "student") {
		useEffect(() => {
			async function fetchData() {
				const ordersData = await getByStudent(1);
				console.log("parte - 1 fetch")
				setOrders(ordersData);
			}
			fetchData();
		}, []);
	} else {
		useEffect(() => {
			async function fetchData() {
				const ordersData = await get();
				setOrders(ordersData);
			}
			fetchData();
		}, []);
	}
	return (
		<div id="Orders-page">
			<SearchBar />
			<Separator />
			<main id="orders-container">
				{
					orders.map((order, index) => (
						<div key={index}>
							{role === "worker" ?
								<Order key={index} ID_order={order.id} studentName={order.id} course={'2DAWT'} date={order.date} /> :
								<Order key={index} ID_order={order.id} date={"10/12/2020"} product={"Super Bocata Combo"} />
							}
						</div>
					))
				}
			</main>
			<TabsBar />
		</div>
	)
}

export default Orders