import SearchBar from "../../components/searchBar/SearchBar";
import Separator from "../../components/separator/Separator";
import TabsBar from "../../components/tabsBar/TabsBar";
import Order from "../../components/order/Order";
import { get, getByStudent } from "../../services/order.service";
import { findByPk } from "../../services/product.service"
import { remove } from "../../services/order.service";
import { useEffect, useState } from "react";
import { colors } from "@mui/material";
import { getUserId, getUserRole } from "../../services/utils";
import "./Orders.scss";

function Orders() {
  const [userId, setUserId] = useState(null);
  const [role, setRole] = useState(null);
  const [orders, setOrders] = useState([]);
  const [orderName, setOrderName] = useState();

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

  // const getName = async (id) => {
  //   const productData = await findByPk(id)
  //   console.log(productData.name)
  //   setOrderName(productData)
  //   console.log(orderName)
  //   return productData.name;
  // }

  

  return (
    <div id="Orders-page">
      <SearchBar />
      <Separator />
      <main id="orders-container">
        {orders.map((order, index) => {
          // let productName = [getName(order.ProductId)]
          {
            return role === "worker" ? (
              <Order
                key={index}
                role={role}
                ID_order={order.id}
                studentName={order.id}
                course={"2DAWT"}
                date={order.date}
                deleted={handleCancel}
                product={1}

              />
            ) : (
              <Order
                key={index}
                ID_order={order.id}
                date={"10/12/2020"}
                product={1}
                deleted={handleCancel}
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
