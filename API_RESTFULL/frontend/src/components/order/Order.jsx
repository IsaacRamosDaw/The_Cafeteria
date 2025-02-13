import Button from "../button/Button";

import { useEffect, useState } from "react";

import { getOne } from "../../services/student.service";
import { findByPk } from "../../services/product.service";
import { getOne as findOneCourse } from "../../services/course.service.js";

import "./Order.scss";

function Order({ orderId, dateParam, deleted, productId, role, studentIdParam }) {

  const studentId = studentIdParam
  const [studentName, setStudentName] = useState();
  const [courseId, setCourseId] = useState("");
  const [courseName, setCourseName] = useState("");
  const [orderName, setOrderName] = useState();
  const [orderDate, setOrderDate] = useState();

  useEffect(() => {
    setOrderDate(dateParam.split("T")[0].replace(/-/g, "/"))
    //* GET NAME PRODUCT 
    async function fetchOrder() {
      let orderName;
      orderName = await findByPk(productId)

      if (orderName) {
        setOrderName(orderName.name);
      }
    }

    //* GET NAME STUDENT 
    async function fetchStudentName() {
      if (studentIdParam !== undefined) {
        let studentNameObject = await getOne(studentId)
        if (studentNameObject) {
          setStudentName(studentNameObject.username)
          setCourseId(studentNameObject.CourseId)
        }
      }
    }


    //* GET NAME COURSE
    async function fetchCourseName() {
      let courseObject = await findOneCourse(courseId);
      if (courseObject) {
        setCourseName(courseObject.name)
      }
    }

    fetchOrder()
    fetchStudentName()
    fetchCourseName()
  }, [studentId, courseName, productId]);

const cancelOrder = () => {
  deleted(orderId)
};

return (
  <section className="order-card">
    <header className="card-order-header">
      <p id="importantText">ID: {orderId} </p>
      <p> {orderDate} </p>
    </header>
    {
      role &&
      <h2 className="text-name-student">
        {studentName}
        <span></span>
        {courseName}
      </h2>
    }
    <ul className="card-order-content">
      <li>
        <p> {orderName} </p>
      </li>
    </ul>
    <div className="container-btn-card-order">
      {role === "worker" ? (
        <>
          <Button className="btn-card-order btn-done" text={"Terminado"} onClick={cancelOrder} ariaLabel={"Eliminar este pedido"} />
        </>
      ) : (
        <>
          <Button className="btn-card-order btn-done" text={"Cancelar"} onClick={cancelOrder} ariaLabel={"Eliminar este pedido"}/>
        </>
      )}
    </div>
  </section>
);
}

export default Order;

