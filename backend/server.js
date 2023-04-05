// Description: Express backend for Stripe checkout

const express = require("express");
const path = require('path'); 
var cors = require("cors");
require('dotenv').config();
const stripe = require("stripe")(process.env.REACT_APP_STRIPE_SECRET_KEY);

// Middleware
const app = express();
  
app.use(cors());
// app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, './../public')));



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

// Handles any requests that don't match the ones above
app.get('*', (req, res) =>{
  res.sendFile(path.join(__dirname + './../public/index.html'));
});


app.listen(4000, () => console.log("Server started on port 4000"));