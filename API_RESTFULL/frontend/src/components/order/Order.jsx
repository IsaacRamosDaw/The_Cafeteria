import Button from "../button/Button";
import { useEffect, useState } from "react";
import { getByOrder } from "../../services/orderLine.service.js";
import { getOne } from "../../services/student.service";
import { findByPk } from "../../services/product.service";
import { getOne as findOneCourse } from "../../services/course.service.js";
import "./Order.scss";
import { getUserRole } from "../../services/utils.js";
import { finishOrder } from "../../services/order.service.js";

function Order({
  orderId,
  dateParam,
  deleted,
  productId,
  status,
  studentIdParam,
}) {
  const [studentName, setStudentName] = useState(null);
  const [courseName, setCourseName] = useState(null);
  const [orderDate, setOrderDate] = useState("");
  const [orderLine, setOrderLine] = useState([]);
  const [totalOrder, setTotalOrder] = useState(0);

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
    deleted(orderId);
  };

  const orderDone = () => {
    finishOrder(orderId)
  }

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
      <ul className="card-order-content">
        {orderLine.length > 0 ? (
          <>
            {orderLine.map((line) => (
              <li key={line.id}>
                <p>
                  {line.quantity} {line.productName} - {line.unitPrice}€ -{" "}
                  {line.unitPrice * line.quantity}€
                </p>
              </li>
            ))}
          </>
        ) : (
          <li>No hay productos en esta orden</li>
        )}
      </ul>
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
