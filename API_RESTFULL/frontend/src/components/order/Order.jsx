import Button from "../button/Button";
import { useContext, useEffect, useState } from "react";
import { getByOrder } from "../../services/orderLine.service.js";
import { getOne } from "../../services/student.service";
import { findByPk } from "../../services/product.service";
import { getOne as findOneCourse } from "../../services/course.service.js";
import { getUserRole } from "../../services/utils.js";
import { finishOrder } from "../../services/order.service.js";

import "./Order.scss";

// Contexts
import OrderContext from "../../contexts/OrderContext.jsx";

function Order({
  orderId,
  dateParam,
  deleted,
  productId,
  status,
  studentIdParam,
  pos,
}) {
  const [studentName, setStudentName] = useState(null);
  const [courseName, setCourseName] = useState(null);
  const [orderDate, setOrderDate] = useState("");
  const [orderLine, setOrderLine] = useState([]);
  const [totalOrder, setTotalOrder] = useState(0);

  const { removeOrderById } = useContext(OrderContext)

  let role = getUserRole();

  useEffect(() => {
    async function fetchAllData() {
      try {
        if (dateParam) {
          setOrderDate(dateParam.split("T")[0].replace(/-/g, "/"));
        }
        if (studentIdParam !== undefined) {
          const student = await getOne(studentIdParam);
          if (student) {
            setStudentName(student.username);
            if (student.CourseId) {
              const course = await findOneCourse(student.CourseId);
              if (course) {
                setCourseName(course.name);
              }
            }
          }
        }
        const orderLines = await getByOrder(orderId);
        if (orderLines) {
          const updatedOrderLines = await Promise.all(
            orderLines.map(async (line) => {
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
        }
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    }

    fetchAllData();
  }, [orderId, dateParam, studentIdParam]);

  const cancelOrder = () => {
    
  }

  const orderDone = async () => {
    await finishOrder(orderId);
    removeOrderById(orderId)
  };

  return (
    <section className="order-card">
      <header className="card-order-header">
        <p id="importantText">ID: {orderId}</p>
        <p>{orderDate}</p>
      </header>
      {role && (
        <h2 className="text-name-student">
          {studentName} <span></span> {courseName}
        </h2>
      )}
      <table className="card-order-content">
        <thead>
          <tr>
            <th className="container-quantity-table-orders"> </th>
            <th> Descripcion </th>
            <th> Precio </th>
            <th> Importe </th>
          </tr>
        </thead>
        <tbody>
          {orderLine.length > 0 ? (
            <>
              {orderLine.map((line) => (
                <tr key={line.id}>
                  <td className="container-quantity-table-orders">
                    {line.quantity}
                  </td>
                  <td>{line.productName}</td>
                  <td>{line.unitPrice}€</td>
                  <td>{line.unitPrice * line.quantity}€</td>
                </tr>
              ))}
            </>
          ) : (
            <tr>
              <td>
                <p>No hay productos en esta orden</p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <p>Total: {totalOrder}€</p>
      {status ? <p>Estado: {status || "No disponible"}</p> : ""}
      <div className="container-btn-card-order">
        {role === "worker" ? (
          <Button
            className="btn-card-order btn-done"
            text={"Terminado"}
            onClick={orderDone}
          />
        ) : (
          <Button
            className="btn-card-order btn-done"
            text={"Cancelar"}
            onClick={cancelOrder}
          />
        )}
      </div>
    </section>
  );
}

export default Order;
