import { useState } from "react";
import Button from "../../components/button/Button";
import "./Product.scss";

function Product({ img }) {
  const [valor, setValor] = useState(12.42);
  const [cuantity, setCuantity] = useState(1);

  const increaseQuantity = () => {
    const newQuantity = cuantity + 1;
    setCuantity(newQuantity);
    changePrice(newQuantity);
  };

  const decreaseQuantity = () => {
    const newQuantity = cuantity > 1 ? cuantity - 1 : 1;
    setCuantity(newQuantity);
    changePrice(newQuantity);
  };

  const changePrice = (quantity) => {
    setValor(12.42 * quantity); 
  };
  
  return (
    <main id="product">
      <h2>Name of Product</h2>
      <img src={img} alt="" />
      <p id="product-text">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Natus,
        molestias ipsum eligendi ratione ducimus eveniet suscipit tempore
        architecto neque at id facilis quas, deleniti autem aliquid sit enim
        laudantium animi?
      </p>
      <div id="display">
        <p className="bg">{valor}€</p>
        <p>{cuantity}</p>
        <p className="bg">
          <button onClick={increaseQuantity}>&#43;</button>
          <button onClick={decreaseQuantity}>&#8722;</button>
        </p>
      </div>
      <div id="buttons">
        <Button text={"Order"} submit={true} />
        <Button text={"Cancel"} submit={true} />
      </div>
    </main>
  );
}

export default Product;
