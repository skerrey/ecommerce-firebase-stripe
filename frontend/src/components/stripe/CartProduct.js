// Description: Show cart products in modal

import { CartContext } from "../../contexts/CartContext";
import { useContext } from "react";
import { getProductData } from "../../productStore";
import { BsFillTrash2Fill } from "react-icons/bs";
import { BiPlusCircle } from "react-icons/bi";
import "./CartProduct.css";

function CartProduct(props) {
  const cart = useContext(CartContext);
  const id = props.id;
  const quantity = props.quantity;
  const productData = getProductData(id);

  return (
    <>
      <div className="prod-box">
        <div className="title">
          {productData.title}
          <div className="sub-title">${productData.price}</div>
        </div>
        <div className="image-box">
          <img src={productData.image} alt={productData.imageAlt} className="product-image " />
        </div>
        <div className="info-box">
          {quantity === 1 ?
            <div className="btn btn-custom ps-2" size="sm" onClick={() => cart.deleteFromCart(id)}><BsFillTrash2Fill style={{color: "#aa4a44"}} /></div>
            :
            <div className="btn btn-custom" onClick={() => cart.removeOneFromCart(productData.id)}>-</div>
        } 
          <div className="quantity">{quantity}</div>
          <div className="btn btn-custom float-right" onClick={() => cart.addOneToCart(productData.id)}>+</div>
        </div>
        <hr />
      </div>
    </>
  )
}

export default CartProduct;