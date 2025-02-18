import { useEffect, useState, useContext } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { BsFillCartCheckFill } from "react-icons/bs";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { findByPk as getOne } from "../../services/product.service";
import { create } from "../../services/orderLine.service";
import { getUserId } from "../../services/utils";
import TabsBar from "../../components/tabsBar/TabsBar";
import Button from "../../components/button/Button";
import "./Product.scss";

// Contexts
import OrderContext from "../../contexts/OrderContext";

function Product() {
  const navigate = useNavigate();
  const folder = "http://localhost:8080/images/";
  const [ordered, setOrdered] = useState(false);
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [priceShown, setPriceShown] = useState(0);

  const { createOrderLine } = useContext(OrderContext);

  const location = useLocation();
  const productId = location.state?.productId || 1;

  //* WebSocket
  // useEffect(() => {
  //   const SERVER_URL = `${process.env.REACT_APP_SERVER_URL}/userId=${userId}&/foodname=${product.name}`
  //   ws.current.onopen = () => {
  //     console.log("open")
  //   }
    
  // }) 

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getOne(productId);
        if (data) {
          setProduct(data);
          setPriceShown(data.price || 0);
        }
      } catch (error) {
        console.error("Error al obtener el producto:", error);
      }
    }

    fetchData();
  }, [productId]);

  const handleQuantity = (operator) => {
    if (!ordered) {
      let newQuantity = quantity;
      if (operator === "+") {
        newQuantity += 1;
      } else if (operator === "-" && quantity > 1) {
        newQuantity -= 1;
      }

      setQuantity(newQuantity);
      setPriceShown((newQuantity * product.price).toFixed(2));
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  const handleOrder = async () => {
    createOrderLine({
      quantity: quantity,
      unitPrice: product.price,
      productId: productId,
    });

    setOrdered(true);
    setTimeout(() => {
      navigate("/orders");
    }, 1000);
  };

  return (
    <div id="page-product">
      <header className="container-header-product">
        <FaArrowLeftLong className="arrow-back-product" onClick={goBack} />
      </header>
      <main className="content-page-product">
        <div className="container-img-product">
          <div className="container-price-title-product">
            {ordered && <BsFillCartCheckFill className="shopping-cart" />}
            <div className="price-product">
              {product.price ? `${product.price}$` : "Precio no disponible"}
            </div>
          </div>
          <img
            src={
              product.filename
                ? `${folder}${product.filename}`
                : "/default-image.jpg"
            }
            alt={`${product.name || "Producto"} image`}
            className="product-image"
          />
          
        </div>
        <div className="container-description-product">
          <h3 className="title-product">
            <p>{product.name || "Producto no encontrado"}</p>
          </h3>
          <article className="description-product">
            {product.description || "Descripción no disponible"}
          </article>
        </div>
        <div className="container-product-order-control">
          <div className="container-amount-product">
            <div className="container-price-order-product">
              <p className={ordered ? "ordered" : ""}>${priceShown}</p>
            </div>
            <span className="container-amount-product-number">{quantity}</span>
            <div className="button-container-product-page">
              <Button
                className={`btn-product-quantity-page ${
                  ordered ? "ordered" : ""
                }`}
                onClick={() => handleQuantity("+")}
                text="+"
                ariaLabel="Aumentar cantidad del producto elegido"
              />
              <Button
                className={`btn-product-quantity-page ${
                  ordered ? "ordered" : ""
                }`}
                onClick={() => handleQuantity("-")}
                text="-"
                ariaLabel="Disminuir cantidad del producto elegido"
              />
            </div>
          </div>
          <div className="container-control-order-product">
            {ordered ? (
              <Button
                onClick={goBack}
                className="btn-cancel-product"
                text="Cancelar"
                ariaLabel="Cancelar y volver atrás"
              />
            ) : (
              <Button
                onClick={handleOrder}
                className="btn-order-product"
                text="Pedir"
                ariaLabel="Confirmar pedido del producto"
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
