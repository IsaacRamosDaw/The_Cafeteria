import SearchBar from "../../components/searchBar/SearchBar";
import Separator from "../../components/separator/Separator";
import TabsBar from "../../components/tabsBar/TabsBar";
import Order from "../../components/order/Order";

import { BsCupHot } from "react-icons/bs";
import { useEffect, useState, useContext } from "react";

import { get, getByStudent, remove } from "../../services/order.service";
import { getUserId, getUserRole } from "../../services/utils";
import OrderCart from "../../components/menuComponents/orderCart/OrderCart";

import "./Orders.scss";

// Contexts
import OrderContext from "../../contexts/OrderContext";
import { removeByOrder } from "../../services/orderLine.service";

function Orders() {
  const [userId, setUserId] = useState(null);
  const [role, setRole] = useState(null);
  const [orders, setOrders] = useState([]);

  const { orderLineCart } = useContext(OrderContext);

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
  }, [role, userId, orderLineCart]);

  const handleCancel = async (id) => {
    try {
      await remove(id);
      await removeByOrder(id);
    } catch (error) {
      console.log("Error while trying to delete order:", error);
    }
    setOrders((prevOrder) => prevOrder.filter((order) => order.id !== id));
  };

  return (
    <div id="Orders-page">
      <SearchBar />
      <Separator />
      <main id="orders-container">
        {role == "student" && orderLineCart.length != 0 ? <OrderCart /> : ""}

        <hr />

        {orders.length == 0 ? (
          <BsCupHot className="cup-img-logo" />
        ) : (
          orders.map((order, index) => {
            {
              return getUserRole() === "worker" ? (
                <Order
                  key={index}
                  orderId={order.id}
                  studentIdParam={order.studentId}
                  dateParam={order.date}
                  productId={order.productId}
                  deleted={handleCancel}
                  role={role}
                />
              ) : (
                <Order
                  key={index}
                  orderId={order.id}
                  dateParam={order.date}
                  deleted={handleCancel}
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
