import "./Product.scss";

import { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { BsFillCartCheckFill } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";

import TabsBar from "../../components/tabsBar/TabsBar";
import Button from "../../components/button/Button";
import SearchBar from "../../components/searchBar/SearchBar";
import Separator from "../../components/separator/Separator";
import Divider from "@mui/material/Divider";

function Product() {
  const navigate = useNavigate();
  let { category, name } = useParams();
  const [product, setProduct] = useState({});
  let [quantity, setQuantity] = useState(1);
  let [priceShown, setPriceShown] = useState(quantity);
  const [ordered, setOrdered] = useState(false);

  name = name.replace(/-/g, " ");

  useEffect(() => {
    const data = {
      title: "Bocata Combo con doble de cangrejo y salsa de queso",
      description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
      price: 14.95,
      img: "/images/ImgMenus/sandwiches.jpg",
    };

    setProduct(data);
    setPriceShown(data.price);
  }, []);

  const handleQuantity = (operador) => {
    if (!ordered) {
      setQuantity((prevQuantity) => {
        let newQuantity = prevQuantity;

        if (operador === "+") {
          newQuantity = prevQuantity + 1;
        } else if (operador === "-" && prevQuantity > 1) {
          newQuantity = prevQuantity - 1;
        }

        setPriceShown((newQuantity * product.price).toFixed(2)); // Calcula el precio mostrado
        return newQuantity;
      });
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  const handleOrder = () => {
    const res = {
      id: 1,
      name: product.title,
      amount: quantity,
      price: parseFloat(priceShown),
    };
    console.log(res);
  };

  return (
    <div id="page-product">
      <header className="container-header-product">
        <FaArrowLeftLong className="arrow-back-product" onClick={goBack} />
      </header>
      <main className="content-page-product">
        <div className="container-img-product">
          <div className="container-price-title-product">
            {ordered ? <BsFillCartCheckFill className="shopping-cart" /> : ""}
            <div className="price-product"> {product.price}$ </div>
          </div>
          <img src={product.img} alt="Img product page" />
        </div>
        <div className="container-description-product">
          <h3 className="title-product">
            <p> {product.title} </p>
          </h3>
          <article className="description-product">
            {product.description}
          </article>
        </div>
        <div className="container-product-order-control">
          <div className="container-amount-product">
            <div className="container-price-order-product">
              <p className={ordered ? "ordered" : ""}>${priceShown}</p>
            </div>

            <span className="container-amount-product-number">{quantity}</span>

            <div className="button-container-product">
              <Button
                className={`btn-product-quantity ${ordered ? "ordered" : ""}`}
                onClick={() => handleQuantity("+")}
                text={"+"}
              />
              <Button
                className={`btn-product-quantity ${ordered ? "ordered" : ""}`}
                onClick={() => handleQuantity("-")}
                text={"-"}
              />
            </div>
          </div>
          <div className="container-control-order-product">
            {ordered ? (
              <Button
                onClick={() => setOrdered(false)}
                className="btn-cancel-product"
                text={"Cancelar"}
              />
            ) : (
              <Button
                onClick={() => {
                  setOrdered(true), handleOrder;
                }}
                className="btn-order-product"
                text={"Pedir"}
              />
            )}
          </div>
        </div>
      </main>
      <TabsBar />
    </div>
  );
}

export default Product;
