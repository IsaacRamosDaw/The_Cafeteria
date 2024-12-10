import "./Order.scss";
import Button from "../button/Button";

function Order({ ID_order, date, studentName, product, course, role, deleted }) {
  date = date.split("T")[0].replace(/-/g, "/");

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
        {course}
      </h2>
      <ul className="card-order-content">
        {/* <li>
          <p> Empanadilla</p>
          <span> x1 </span>
        </li> */}
        <li>
          <p> {product} </p>
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
