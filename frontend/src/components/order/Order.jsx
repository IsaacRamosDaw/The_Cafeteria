import "./Order.scss";
import Button from "../button/Button"
function Order() {
  return (
    <div id="order">
      <div className="info">
        <p>Id: Number</p>
        <p>Name of the thing</p>
        <p>Cuantity</p>
      </div>
      <form action="">
        <p>10/12/24</p>
        <Button text={'Cancelar'} submit={true}/>
      </form>
    </div>
  )

}

export default Order;
