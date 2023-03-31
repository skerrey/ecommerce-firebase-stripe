// Description: Express backend for Stripe checkout

const express = require("express");
var cors = require("cors");
require('dotenv').config();
const stripe = require("stripe")(process.env.REACT_APP_STRIPE_SECRET_KEY);

// Middleware
const app = express();
app.use(cors());
app.use(express.static("public"));
app.use(express.json());

app.use('*', function(req, res, next) {
  res.send('<!DOCTYPE html><html><head><title>My App</title></head><body><div id="root"></div><script src="bundle.js"></script></body></html>');
});



const calculateOrderAmount = (items) => {
  console.log(`Item total: ${items}`);
  totalCost = items * 100;
  return totalCost;
};

/**
 * Payment intent Stripe
 */
app.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.floor(calculateOrderAmount(items)),
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

app.listen(4000, () => console.log("Server started on port 4000"));