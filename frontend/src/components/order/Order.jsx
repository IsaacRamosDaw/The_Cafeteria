import "./Order.scss";
import Button from "../button/Button";
import { useEffect, useState } from "react";
import { getUserId, getUser } from "../../services/utils";
import { getOne } from "../../services/studentService";
import { findByPk } from "../../services/product.service";

function Order({ ID_order, date, course, role, deleted, studentId }) {

  date = date.split("T")[0].replace(/-/g, "/");

  const [orderName, setOrderName] = useState();
  const [studentName, setStudentName] = useState();


  useEffect(() => {
    async function fetchOrder() {
      let orderName;
      orderName = await findByPk(ID_order)
      setOrderName(orderName.name);
    }
    fetchOrder()

    async function fetchname() {
      let studentNameFetch = await getOne(studentId)
      if(studentNameFetch) {
        console.log(studentNameFetch)
      }
      setStudentName(studentNameFetch.username)
    }
    fetchname()
  }, [studentId]);

  const cancelOrder = () => {
    deleted(ID_order)
  };

  console.log(studentName)

  return (
    <section className="order-card">
      <header className="card-order-header">
        <p>ID: {ID_order} </p>
        <p> {date} </p>
      </header>
      <h2 className="text-name-student">
          {studentName}
        <span></span>
        {course}
      </h2>
      <ul className="card-order-content">
        <li>
          <p> {orderName} </p>
        </li>
      </ul>
      <div className="container-btn-card-order">
        {role === "worker" ? (
          <>
            <Button className="btn-card-order btn-done" text={"Terminado"} onClick={cancelOrder} />
          </>
        ) : (
          <>
            <Button className="btn-card-order btn-done" text={"Cancelar"} onClick={cancelOrder} />
          </>
        )}
      </div>
    </section>
  );
}

export default Order;
