import Button from "../button/Button";
import "./Order.scss";

function Order({ ID_order, date, studentName, product, course, role }) {


  return (
    <section className="order-card">
      <header className="card-order-header">
        <p>ID: {ID_order} </p>
        <p> {date} </p>
      </header>
      <h2 className="text-name-student" >{studentName}<span></span>{course}</h2>
      <ul className="card-order-content">
        <li>
          <p> {product} </p>
        </li>
        <li>
          <p> {product} </p>
        </li>
        <li>
          <p> {product} </p>
        </li>
      </ul>
      {
        role === "worker" ?
          <>
            <form id="finished-order-btn" onSubmit={() => deleteFunction}>
              <button>Borrame</button>
            </form>
          </>
          :
          ""
      }
    </section>
  );
}

export default Order;
