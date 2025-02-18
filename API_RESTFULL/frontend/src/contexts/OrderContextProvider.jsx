import axios from "axios";
import { useState } from "react";
import { getUserId } from "../services/utils";

import OrderContext from "./OrderContext";

let endpointOrders = "http://localhost:8080/api/orders";
let endpointOrderLine = "http://localhost:8080/api/orderLine/lines/";

const date = new Date();
const fullDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
  2,
  "0"
)}-${String(date.getDate()).padStart(2, "0")} ${String(
  date.getHours()
).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}:${String(
  date.getSeconds()
).padStart(2, "0")}`;
const id = getUserId();

const token = localStorage.getItem("token");

const OrdersContextProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [orderCart, setOrderCart] = useState([]);
  const [orderLineCart, setOrderLineCart] = useState([]);

  const createOrder = async () => {
    let success = true;

    // Create the order
    const responseOrder = await axios.post(
      endpointOrders,
      new URLSearchParams({ studentId: id, date: fullDate }).toString(),
      {
        headers: {
          Authorization: `Bearer ${token}`,
          // Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    if (responseOrder.statusText !== "OK") success = false;

    console.log("Antes de obtener el id: ", responseOrder.data);
    console.log("Despues de obtener el id: ", responseOrder.data.order);

    // Getting the id for put it in orderlines
    let orderId = responseOrder.data.order.id;

    const updatedOrderLines = orderLineCart.map((line) => ({
      ...line,
      orderId: `${orderId}`,
    }));

    setOrderLineCart(updatedOrderLines);

    // Bulk create order lines
    const responseOrderLines = await axios.post(
      endpointOrderLine,
      updatedOrderLines,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    if (responseOrderLines.statusText !== "OK") success = false;

    clearOrder()
    return true;
  };

  const clearOrder = () => {
    setOrderCart([]);
    setOrderLineCart([]);
  };

  const removeOrderById = (orderId) => {
    setOrders((prevOrders) => prevOrders.filter((order) => parseInt(order.id) !== parseInt(orderId)));
  }

  const createOrderLine = (obj) => {
    setOrderLineCart((prev) => [...prev, obj]);
    console.log("Carrito: ", orderLineCart);
  };

  const removeOrderLine = (pos) => {
    setOrderLineCart((prev) => prev.filter((_, index) => index !== pos));
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        setOrders,
        orderCart,
        orderLineCart,
        createOrderLine,
        removeOrderLine,
        createOrder,
        clearOrder,
        removeOrderById
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export default OrdersContextProvider;
