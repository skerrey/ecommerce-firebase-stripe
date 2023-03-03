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

app.post("/checkout", async (req, res) => {

  console.log(req.body);
  const items = req.body.items;
  let lineItems = [];
  items.forEach((item) => {
    lineItems.push(
      {
        price: item.id,
        quantity: item.quantity
      }
    )
  });

  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: "payment",
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cancel"
  });

  res.send(JSON.stringify({
    url: session.url
  }));

});

// -------------------Stripe Element-------------------
const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400; 
};

app.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
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