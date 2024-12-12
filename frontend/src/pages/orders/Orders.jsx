import SearchBar from "../../components/searchBar/SearchBar";
import Separator from "../../components/separator/Separator";
import TabsBar from "../../components/tabsBar/TabsBar";
import Order from "../../components/order/Order";
import "./Orders.scss";
import { BsCupHot } from "react-icons/bs";
import { useEffect, useState } from "react";
import { get, getByStudent, remove } from "../../services/order.service";
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

  }, [role, userId]);

  const handleCancel = async (id) => {
    await remove(id);
    setOrders((prevOrder) => prevOrder.filter((order) => order.id !== id));
  };  


  return (
    <div id="Orders-page">
      <SearchBar />
      <Separator />
      <main id="orders-container">
        {
          orders.length == 0 
          ? <BsCupHot  className="cup-img-logo" /> 
          : orders.map((order, index) => {
          {
            return role === "worker" ? (
              <Order
                key={index}
                orderId={order.id}
                studentIdParam={order.StudentId}
                dateParam={order.date}
                productId={order.ProductId}
                deleted={handleCancel}
                role={role}
              />
            ) : (
              <Order
                key={index}
                orderId={order.id}
                date={order.date}
                deleted={handleCancel}
                productId={order.ProductId}
              />
            );
          }
          // <button onClick={() => handleCancel(order.id)}>BORRAME</button>;
        })}
      </main>
      <TabsBar />
    </div>
  );
}

export default Orders;
