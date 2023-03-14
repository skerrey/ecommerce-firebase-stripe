import React, { useState, useEffect, useContext } from 'react';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { CartContext } from "../../contexts/CartContext";
import CartProduct from './CartProduct';
import CheckoutForm from "./CheckoutForm";
import { Row, Col } from "react-bootstrap";

const stripePromise = loadStripe("pk_test_GKcjZ2vSJh0CsQIHg4FRDXuD00VJwUDHV3");

function Checkout() {
  const cart = useContext(CartContext);

  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Create PaymentIntent as soon as the modal loads
    fetch("http://localhost:4000/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: cart.getTotalCost() }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <>
      <p>Items in your cart:</p>
      <Row xs={1} md={3} className="g-0">
        {cart.items.map((currentProduct, index) => (
          <CartProduct key={index} id={currentProduct.id} quantity={currentProduct.quantity} />
        ))}
        <h2>Total: ${cart.getTotalCost().toFixed(2)}</h2>
      </Row>
      <div>
        {clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        )}
      </div>
    </>
  );
}

export default Checkout;