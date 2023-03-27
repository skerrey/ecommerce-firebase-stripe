// Description: Checkout component that renders the checkout form and cart

import React, { useState, useEffect, useContext } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { CartContext } from "../../contexts/CartContext";
import Cart from "../Cart/index";
import CheckoutForm from "../CheckoutForm/index";
import { Row } from "react-bootstrap";
import "./style.css";
import Responsive from "../../helpers/Responsive";
import { AiOutlineDownCircle, AiOutlineUpCircle } from 'react-icons/ai';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

function Checkout() {
  const { isMobile } = Responsive();
  const cart = useContext(CartContext);
  const [clientSecret, setClientSecret] = useState("");
  const [arrowDirection, setArrowDirection] = useState("down");

  useEffect(() => {
    const checkoutBox = document.querySelector('.checkout-product-box');
    function handleScroll() {
      if (checkoutBox.scrollTop > 0) {
        setArrowDirection('up');
      } else {
        setArrowDirection('down');
      }
    }

    checkoutBox.addEventListener('scroll', handleScroll);
    return () => {
      checkoutBox.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
          <div className="checkout-cart-box">
            <div className="checkout-product-box">
              <div className="checkout-scroll-arrow">
                {arrowDirection === 'down' ? (
                    <>
                      <AiOutlineDownCircle size={32} />
                    </>

                ) : (
                  <AiOutlineUpCircle size={32} />
                )}
              </div>
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