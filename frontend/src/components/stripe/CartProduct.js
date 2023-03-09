// Description: Show cart products in modal

import Button from "react-bootstrap/Button";
import { CartContext } from "../../contexts/CartContext";
import { useContext } from "react";
import { getProductData } from "../../productStore";
import "./CartProduct.css";

function CartProduct(props) {
  const cart = useContext(CartContext);
  const id = props.id;
  const quantity = props.quantity;
  const productData = getProductData(id);

  return (
    <>
      <div className="">
        <img src={productData.image} alt={productData.imageAlt} className="product-image " />
        <h3>{productData.title}</h3>
        <p>{quantity} total</p>
        <p>${ (quantity * productData.price).toFixed(2) }</p>
        <Button size="sm" onClick={() => cart.deleteFromCart(id)}>Remove</Button>
        <hr />
      </div>
    </>
  )
}

export default CartProduct;