import React, { useState, useEffect, useContext } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { CartContext } from "../../contexts/CartContext";
import Cart from "../Cart/index";
import CheckoutForm from "../CheckoutForm/index";
import { Row } from "react-bootstrap";
import "./style.css";
import Responsive from "../../helpers/Responsive";

const stripePromise = loadStripe("pk_test_GKcjZ2vSJh0CsQIHg4FRDXuD00VJwUDHV3");

function Checkout() {
  const { isMobile } = Responsive();
  const cart = useContext(CartContext);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Create PaymentIntent as soon as the modal loads
    fetch("http://localhost:4000/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: cart.getTotalCost().toFixed(2) }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <>
      {!isMobile() ? // Check if mobile or desktop
        <>
          <h4 className="pt-3">Items in your cart:</h4>
          <div className="cart-box">
            <div className="product-box">
              <div xs={1} className="g-0">
                {cart.items.map((currentProduct, index) => (
                  <Cart key={index} id={currentProduct.id} quantity={currentProduct.quantity} />
                ))}
              </div>
            </div>
  
            <div className="checkout-box">
              <h2>Total: ${cart.getTotalCost().toFixed(2)}</h2>
              {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                  <CheckoutForm />
                </Elements>
              )}
            </div>
          </div>
        </>
        :
        <>
          <h4 className="pt-3">Items in your cart:</h4>
          <Row xs={1} md={3} className="g-0">
            {cart.items.map((currentProduct, index) => (
              <Cart key={index} id={currentProduct.id} quantity={currentProduct.quantity} />
            ))}
            <h2>Total: ${cart.getTotalCost().toFixed(2)}</h2>
          </Row>
          <div className="pb-5">
            {clientSecret && (
              <Elements options={options} stripe={stripePromise}>
                <CheckoutForm />
              </Elements>
            )}
          </div>
        </>
      }
    </>
  );
}

export default Checkout;