import "./Product.scss";

import { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { BsFillCartCheckFill } from "react-icons/bs";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import TabsBar from "../../components/tabsBar/TabsBar";
import Button from "../../components/button/Button";
import SearchBar from "../../components/searchBar/SearchBar";
import Separator from "../../components/separator/Separator";
import Divider from "@mui/material/Divider";
import { getOne } from "../../services/product.service";
import { create } from "../../services/order.service";
import { getUserId } from "../../services/utils";
function Product() {
  const navigate = useNavigate();
  let { category, name } = useParams();
  name = name.replace(/-/g, " ");

  const [userId, setUserId] = useState(null);
  useEffect(() => {
    setUserId(getUserId());
  }, []);

  const [product, setProduct] = useState({});
  let [quantity, setQuantity] = useState(1.0);
  let [priceShown, setPriceShown] = useState(quantity);
  const [ordered, setOrdered] = useState(false);

  const location = useLocation();
  const id = location.state?.productId || 1;

  useEffect(() => {
    async function fetchData() {
      const data = await getOne(id)
      setProduct(data);
      setPriceShown(data.price || 1);
    }

    fetchData();
  }, [id]);

  const handleQuantity = (operador) => {
    if (!ordered) {
      setQuantity((prevQuantity) => {
        let newQuantity = prevQuantity;

        if (operador === "+") {
          newQuantity = prevQuantity + 1;
        } else if (operador === "-" && prevQuantity > 1) {
          newQuantity = prevQuantity - 1;
        }

        setPriceShown((newQuantity * product.price).toFixed(2));
        return newQuantity;
      });
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  const handleOrder = () => {
    create(userId,product.id)
    const res = {
      id: 1,
      name: product.name,
      amount: quantity,
      price: parseFloat(priceShown),
    };
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
          <img src={product.filename} alt="Img product page" />
        </div>
        <div className="container-description-product">
          <h3 className="title-product">
            <p> {product.name} </p>
          </h3>
          <article className="description-product">
            {product.description}
          </article>
        </div>
        <div className="container-product-order-control">
          <div className="container-amount-product">
            <div className="container-price-order-product">
              <p className={ordered ? "ordered" : ""}> ${priceShown}</p>
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
              <button className="btn-cancel-product" onClick={handleOrder}>crea</button>
              // <Button
              //   onClick={() => {
              //     setOrdered(false)
              //   }}
              //   onOrder={() => handleOrder}
              //   className="btn-cancel-product"
              //   text={"Cancelar"}
              // />
            ) : (
              // <Button
              //   onClick={() => {
              //     setOrdered(true), handleOrder;
              //   }}
              //   onOrder={() => handleOrder}

              //   className="btn-order-product"
              //   text={"Pedir"}
              // />
              <button className="btn-order-product" onClick={handleOrder}>Ordena</button>
            )}
          </div>
        </div>
      </main>
      <TabsBar />
    </div>
  );
}

export default Product;
