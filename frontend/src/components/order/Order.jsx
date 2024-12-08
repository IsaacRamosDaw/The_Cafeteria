import Button from "../button/Button";
import "./Order.scss";

function Order({ ID_order, date, studentName, product, course }) {

  const getUserRole = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    try {
      const base64Payload = token.split(".")[1];
      const decodedPayload = JSON.parse(atob(base64Payload));
      return decodedPayload.role;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

  const role = getUserRole();

  const handleFinished = async (e) => {
    e.preventDefault();
  }

  const handleCancel = async (e) => {
    e.preventDefault();
  }

  return (
    <section className="order-card">
      <header className="card-order-header">
        <p>ID: {ID_order} </p>
        <p> {date} </p>
      </header>
      <h2 className="text-name-student" > {studentName}<span></span>{course}</h2>
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
      <form id="cancel-order-btn" onSubmit={handleCancel}>
        <Button text={"Cancelar"} submit={true} />
      </form>
        {
          role === "worker" ?
            <>
              <form id="finished-order-btn" onSubmit={handleFinished}>
                <Button text={"Terminado"} submit={true} />
              </form>
            </>
            :
            ""
        }
    </section>
  );
}

export default Order;
