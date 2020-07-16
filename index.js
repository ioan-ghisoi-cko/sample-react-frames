const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");

// Initilize the checkout.com SDK
const { Checkout } = require("checkout-sdk-node");
const cko = new Checkout("sk_test_0b9b5db6-f223-49d0-b68f-f6643dd4f808");

const app = express();
app.use(express.static(path.join(__dirname, "build")));
app.use(express.static(path.join(__dirname, "src")));

app.use(
  cors({
    origin: "*",
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/pay", async (req, res) => {
  const { token, name, billing } = req.body;
  const payment = await cko.payments.request({
    source: {
      token,
      billing_address: billing,
    },
    customer: {
      name,
    },
    currency: "EUR",
    amount: 1000, // cents
    reference: "ORDER123",
  });
  res.send(payment);
});

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(
    "\x1b[36m%s\x1b[34m%s\x1b[0m",
    "💪 Server running on ➡️ ",
    `http://localhost:${port}`
  );
});
