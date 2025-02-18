import OrderContext from "../../../contexts/OrderContext";
import Button from "../../button/Button";
import { findByPk } from "../../../services/product.service";
import { useContext, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";

import "./OrderCart.scss";
import WebSocketContext from "../../../contexts/WebSocketsContext";
import { getUserId } from "../../../services/utils";

export default function OrderCart() {
  const [orderLine, setOrderLine] = useState([]);
  const [totalOrder, setTotalOrder] = useState(0);

  const { sendMessage } = useContext(WebSocketContext)
 
  const { orderLineCart, removeOrderLine, createOrder, clearOrder } =
    useContext(OrderContext);

  const makeOrder = () => {
    try {
      createOrder();

      sendMessage( JSON.stringify({
        type: "notification",
        data: {
          message: "new order created",
          notificationType: "newOrder",
          userId: getUserId()
        },
      }) )
    } catch (error) {
      console.log("Error al hacer pedido: ", error);
    }
  };

  const cancelOrder = () => {
    clearOrder();
  };

  const deleteOrderLine = (pos) => {
    removeOrderLine(pos)
  }

  const getProducts = async () => {
    const updatedOrderLines = await Promise.all(
      orderLineCart.map(async (line) => {
        const product = await findByPk(line.productId);
        return {
          ...line,
          productName: product ? product.name : "Producto no encontrado",
        };
      })
    );

    setOrderLine(updatedOrderLines);

    const total = updatedOrderLines.reduce(
      (acc, line) => acc + line.unitPrice * line.quantity,
      0
    );
    setTotalOrder(total);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <section className="order-card">
      <header className="card-order-header">
        <p id="importantText">Ordering...</p>
      </header>

      <ul className="card-order-content">
        {orderLine.map((line, index) => (
          <li key={index}>
            <p>
              {" "}
              {line.quantity} {line.productName} - {line.unitPrice}€ -{" "}
              {line.unitPrice * line.quantity}€{" "}
            </p>
            <FaTrash onClick={() => deleteOrderLine(index)} />
          </li>
        ))}
      </ul>
      <p>Total: {totalOrder || 0}€</p>
      <div className="container-btn-card-order">
        <Button
          className="btn-card-order btn-done"
          text={"Pedir"}
          onClick={makeOrder}
        />

        <Button
          className="btn-card-order btn-done"
          text={"Cancelar"}
          onClick={cancelOrder}
        />
      </div>
    </section>
  );
}
