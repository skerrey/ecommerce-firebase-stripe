// Description: Checkout Form

import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import { useAuth } from "../../contexts/AuthContext";
import { FaStripe } from 'react-icons/fa';
import "./style.css"

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const { currentUser } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin + "/#/success",
        payment_method_data: {
          billing_details: {
            name,
          },
        },
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const userEmail = currentUser ? currentUser.email : "";
  const userName = currentUser ? currentUser.displayName : "";

  const paymentElementOptions = {
    layout: "tabs",
    defaultValues: {
      billingDetails: {
        email: userEmail,
      }
    }
  }

  return (
    <form id="payment-form" className="checkout-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input type="text" id="name" className="form-control" defaultValue={userName} onChange={(e) => setName(e.target.value)} required />
      </div>

      <LinkAuthenticationElement
        id="link-authentication-element"
        onChange={(e) => setEmail(e.target?.value)}
      />

      <PaymentElement id="payment-element" className="pb-3" options={paymentElementOptions} />
      <button disabled={isLoading || !stripe || !elements} id="submit" className="btn checkout-form-btn-custom">
        <span id="button-text">
          {isLoading ? <div className="checkout-form-spinner"></div>  
            : <>Pay now with <FaStripe size={32} /></>}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}