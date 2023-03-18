// Description: Show cart products in modal

import React, { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";
import { getProductData } from "../../productStore";
import { BsFillTrash2Fill } from "react-icons/bs";
import "./style.css";

function Cart(props) {
  const cart = useContext(CartContext);
  const id = props.id;
  const quantity = props.quantity;
  const productData = getProductData(id);

  return (
    <>
      <div className="cart-title">
        {productData.title}
        <div className="cart-sub-title">${productData.price}</div>
      </div>
      <div className="cart-image-box">
        <img src={productData.image} alt={productData.imageAlt} className="cart-product-image " />
      </div>
      <div className="cart-info-box">
        {quantity === 1 ?
          <div className="btn cart-btn-custom ps-2" size="sm" onClick={() => cart.deleteFromCart(id)}><BsFillTrash2Fill style={{color: "#aa4a44"}} /></div>
          :
          <div className="btn cart-btn-custom" onClick={() => cart.removeOneFromCart(productData.id)}>-</div>
      } 
        <div className="cart-quantity">{quantity}</div>
        <div className="btn cart-btn-custom float-right" onClick={() => cart.addOneToCart(productData.id)}>+</div>
      </div>
      <hr className="w-75 mx-auto" />
    </>
  )
}

export default Cart;