import { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { BsFillCartCheckFill } from "react-icons/bs";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { findByPk as getOne } from "../../services/product.service";
import { create } from "../../services/order.service";
import { getUserId } from "../../services/utils";

import TabsBar from "../../components/tabsBar/TabsBar";
import Button from "../../components/button/Button";

import "./Product.scss";

function Product() {

  const navigate = useNavigate();
  let { category, name } = useParams();
  name = name.replace(/-/g, " ");

  const folder = "http://localhost:8080/images/";

  const [userId, setUserId] = useState(null);
  useEffect(() => {
    setUserId(getUserId());
  }, []);

  const [ordered, setOrdered] = useState(false);
  const [product, setProduct] = useState({});
  let [quantity, setQuantity] = useState(1.0);
  let [priceShown, setPriceShown] = useState(quantity);

  const location = useLocation();
  const id = location.state?.productId || 1;

  useEffect(() => {
    async function fetchData() {
      const data = await getOne(id);
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
    create(product.id, userId, product.price);
    navigate("/orders")
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
          <img src={folder+product.filename || "" } alt="Img product page" />
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

            <div className="button-container-product-page">
              <Button
                className={`btn-product-quantity-page ${ordered ? "ordered" : ""}`}
                onClick={() => handleQuantity("+")}
                text={"+"}
                ariaLabel={"Aumentar cantidad del producto elegido"}
              />
              <Button
                className={`btn-product-quantity-page ${ordered ? "ordered" : ""}`}
                onClick={() => handleQuantity("-")}
                text={"-"}
                ariaLabel={"disminuir cantidad del producto elegido"}
              />
            </div>
          </div>
          <div className="container-control-order-product">
            {ordered ? (
              // <button className="btn-cancel-product" onClick={handleOrder}>crea</button>
              <form>
                <Button
                  onClick={handleOrder}
                  className="btn-cancel-product"
                  text={"Cancelar"}
                  ariaLabel={"Cancelar elegir el producto"}
                />
              </form>
            ) : (
              <Button
                onClick={handleOrder}
                className="btn-order-product"
                text={"Pedir"}
                ariaLabel={"Confirmar elegir el producto"}
              />
              // <button className="btn-order-product" onClick={handleOrder}>Ordena</button>
            )}
          </div>
        </div>
      </main>
      <TabsBar />
    </div>
  );
}

export default Product;
