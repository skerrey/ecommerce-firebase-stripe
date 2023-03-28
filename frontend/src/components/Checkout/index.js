// Description: Checkout component that renders the checkout form and cart

import React, { useState, useEffect, useContext } from "react";
import { Link } from 'react-router-dom';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { CartContext } from "../../contexts/CartContext";
import { useAuth } from "../../contexts/AuthContext";
import Cart from "../Cart/index";
import CheckoutForm from "../CheckoutForm/index";
import Responsive from "../../helpers/Responsive";
import { AiOutlineDownCircle, AiOutlineUpCircle } from 'react-icons/ai';
import { Row, Col } from "react-bootstrap";
import "./style.css";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const checkoutProducts = document.querySelector('.checkout-products');

function Checkout() {
  const { isMobile } = Responsive();
  const cart = useContext(CartContext);
  const { currentUser } = useAuth();
  const [clientSecret, setClientSecret] = useState("");
  const [arrowDirection, setArrowDirection] = useState("down");

  useEffect(() => {
    function handleScroll() {
      if (checkoutProducts.scrollTop > 0) {
        setArrowDirection('up');
      } else {
        setArrowDirection('down');
      }
    }

    checkoutProducts.addEventListener('scroll', handleScroll);
    return () => {
      checkoutProducts.removeEventListener('scroll', handleScroll);
    };
  }, []);

  function scrollToBottom() {
    checkoutProducts.scrollTo(0, checkoutProducts.scrollHeight);
  }

  function scrollToTop() {
    checkoutProducts.scrollTo(0, 0);
  }

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
      <Row xs={1} md={2} className="checkout-cart">
        <Col>
          <h4 className="pt-3">Items in your cart:</h4>
          <div className="checkout-scroll-arrow">
            {arrowDirection === 'down' ? ( // Check if arrow should be up or down
                <AiOutlineDownCircle size={32} onClick={scrollToBottom} />
            ) : (
              <AiOutlineUpCircle size={32} onClick={scrollToTop} />
            )}
          </div>
          <div className="checkout-products" style={{ height: 
          isMobile() ? "100%" : "calc(100vh - 200px)" }}>

            <div xs={1} className="g-0">
              {cart.items.map((currentProduct, index) => (
                <Cart key={index} id={currentProduct.id} quantity={currentProduct.quantity} />
              ))}
            </div>
          </div>
        </Col>
          
        <Col>
          <div className="checkout-form">
            <h2>Total: ${cart.getTotalCost().toFixed(2)}</h2>
            {!currentUser ? <div className="pb-3 fst-italic">Checkout out guest? <Link to="/login" className="fst-normal">Login</Link></div> : null}
            {clientSecret && (
              <Elements options={options} stripe={stripePromise}>
                <CheckoutForm />
              </Elements>
            )}
          </div>
        </Col>
      </Row>
    </>
  );
}

export default Checkout;