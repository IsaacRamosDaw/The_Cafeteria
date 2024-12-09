import SearchBar from "../../components/searchBar/SearchBar";
import Separator from "../../components/separator/Separator";
import TabsBar from "../../components/tabsBar/TabsBar";
import Order from "../../components/order/Order";
import { get, getByStudent } from "../../services/order.service";
import { remove } from "../../services/order.service";
import { useEffect, useState } from "react";
import "./Orders.scss";
import { colors } from "@mui/material";
import { getUserId, getUserRole } from "../../services/utils";

function Orders() {
  const [userId, setUserId] = useState(null);
  const [role, setRole] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setUserId(getUserId());
    setRole(getUserRole());
  }, []);

  useEffect(() => {
    async function fetchOrders() {
      try {
        let ordersData = [];
        if (role === "student" && userId) {
          ordersData = await getByStudent(userId);
        } else if (role === "worker") {
          ordersData = await get();
        }
        setOrders(ordersData);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    }

    if (role) {
      fetchOrders();
    }
  }, [role, userId]); // Se ejecuta cuando cambian `role` o `userId`

  const handleCancel = async (id) => {
    await remove(id);
    console.log("holita");
    setOrders((prevOrder) => prevOrder.filter((order) => order.id !== id));
  };

  return (
    <div id="Orders-page">
      <SearchBar />
      <Separator />
      <main id="orders-container">
        {orders.map((order, index) => (
          <div key={index}>
            {role === "worker" ? (
              <Order
                key={index}
                role={role}
                ID_order={order.id}
                studentName={order.id}
                course={"2DAWT"}
                date={order.date}
              />
            ) : (
              <Order
                key={index}
                ID_order={order.id}
                date={"10/12/2020"}
                product={"Super Bocata Combo"}
              />
            )}
            <button onClick={() => handleCancel(order.id)}>BORRAME</button>
          </div>
        ))}
      </main>
      <TabsBar />
    </div>
  );
}

export default Orders;
