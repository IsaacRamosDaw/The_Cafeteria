import Button from "../button/Button";
import "./Order.scss";

function Order({ ID_order, date, studentName ,product, quantity }) {
  return (
    <section className="order-card">
      <header className="card-order-header">
        <p>ID: {ID_order} </p>
        <p> {date} </p>
      </header>
      <h2 className="text-name-student" > {studentName} </h2>
      <ul className="card-order-content">
        <li>
          <p> {product} </p>
          <span> {quantity} </span>
        </li>
        <li>
          <p> {product} </p>
          <span> {quantity} </span>
        </li>
        <li>
          <p> {product} </p>
          <span> {quantity} </span>
        </li>
      </ul>
      <form className="card-order-container-btn">
        <Button text={"Cancelar"} submit={true} />
      </form>
    </section>
  );
}

export default Order;
