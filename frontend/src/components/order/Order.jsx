import "./Order.scss";
import Button from "../button/Button";
import { useEffect, useState } from "react";
import { getOne } from "../../services/studentService";
import { findByPk } from "../../services/product.service";
import { getOne as findOneCourse } from "../../services/courseService";

function Order({ ID_order, date, role, deleted, studentId }) {

  date = date.split("T")[0].replace(/-/g, "/");

  const [orderName, setOrderName] = useState();
  const [studentName, setStudentName] = useState();
  const [courseId, setCourseId] = useState("");
  const [courseName, setCourseName] = useState("");

  useEffect(() => {
    async function fetchOrder() {
      let orderName;
      orderName = await findByPk(ID_order)
      setOrderName(orderName.name);
    }

    async function fetchStudentName() {
      let studentNameObject = await getOne(studentId)
      if(studentNameObject) {
        setStudentName(studentNameObject.username)
        setCourseId(studentNameObject.CourseId)
      }
    }

    async function fetchCourseName(){
      let courseObject = await findOneCourse(courseId);
      if(courseObject){
        console.log(courseObject.name)
        setCourseName(courseObject.name)
      }
    }

    fetchOrder()
    fetchStudentName()
    fetchCourseName()
    
  }, [studentId]);

  const cancelOrder = () => {
    deleted(ID_order)
  };


  return (
    <section className="order-card">
      <header className="card-order-header">
        <p>ID: {ID_order} </p>
        <p> {date} </p>
      </header>
      <h2 className="text-name-student">
          {studentName}
        <span></span>
          {courseName}
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
