import SearchBar from "../../components/searchBar/SearchBar";
import Separator from "../../components/separator/Separator";
import TabsBar from "../../components/tabsBar/TabsBar";
import Order from "../../components/order/Order";

import { BsCupHot } from "react-icons/bs";
import { useEffect, useState, useContext } from "react";

import { get, getByStudent } from "../../services/order.service";
import { getUserId, getUserRole } from "../../services/utils";
import OrderCart from "../../components/menuComponents/orderCart/OrderCart";

import "./Orders.scss";

// Contexts
import OrderContext from "../../contexts/OrderContext";
import WebSocketContext from "../../contexts/WebSocketsContext";

function Orders() {
  const [userId, setUserId] = useState(null);
  const [role, setRole] = useState(null);
  const { orders, setOrders, orderLineCart, removeOrderById  } = useContext(OrderContext);

  const { notifications } = useContext(WebSocketContext)

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

    fetchOrders();
  }, [notifications, setOrders, userId, role]);

  const handleDelete = async (id) => {
    removeOrderById(id) 
  };

  return (
    <div id="Orders-page">
      <SearchBar />
      <Separator />
      <main id="orders-container">
        { role == "student" && orderLineCart.length != 0 ? <OrderCart /> : ""}

        {orders.length == 0 ? (
          <BsCupHot className="cup-img-logo" />
        ) : (
          orders.map((order, index) => {
            {
              return getUserRole() === "worker" ? (
                <Order
                  key={index}
                  pos={index}
                  orderId={order.id}
                  studentIdParam={order.studentId}
                  dateParam={order.date}
                  productId={order.productId}
                  deleted={handleDelete}
                  role={role}
                />
              ) : (
                <Order
                  key={index}
                  orderId={order.id}
                  dateParam={order.date}
                  deleted={handleDelete}
                  status={order.status}
                  productId={order.ProductId}
                />
              );
            }
          })
        )}
      </main>
      <TabsBar />
    </div>
  );
}

export default Orders;
