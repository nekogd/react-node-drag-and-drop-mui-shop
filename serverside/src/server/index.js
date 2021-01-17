const express = require("express");
const os = require("os");
const axios = require("axios");
const bodyParser = require("body-parser");
// new
const cors = require("cors");
const { v4: uuidv4 } = require('uuid');
// new
const queryString = require("query-string");

const app = express();

app.use(express.static("dist"));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(cors());

app.get("/api/products", (req, res) => {
  const stringified = queryString.stringify(req.query);
  console.log(stringified);

  axios
    .get(`http://localhost:3004/products?${stringified}`)
    .then(function (response) {
      return res.send(response.data);
    });
});

app.post("/api/products", (req, res) => {
  axios
    .post("http://localhost:3004/products", req.body)
    .then(function (response) {
      return res.send(response.data);
    });
});

app.put("/api/products/:proId", (req, res) => {
  axios
    .put(`http://localhost:3004/products/${req.params.proId}`, req.body)
    .then(function (response) {
      return res.send(response.data);
    });
});

app.delete("/api/products/:proId", (req, res) => {
  axios
    .delete(`http://localhost:3004/products/${req.params.proId}`)
    .then(function (response) {
      return res.send(response.data);
    });
});

app.get("/api/users", (req, res) => {
  axios.get("http://localhost:3004/users").then(function (response) {
    return res.send(response.data);
  });
});

app.post("/api/users", (req, res) => {
  axios.post("http://localhost:3004/users", req.body).then(function (response) {
    return res.send(response.data);
  });
});

app.put("/api/users/:userId", (req, res) => {
  console.log(req.params);
  axios
    .put(`http://localhost:3004/users/${req.params.userId}`, req.body)
    .then(function (response) {
      return res.send(response.data);
    });
});

app.delete("/api/users/:userId", (req, res) => {
  axios
    .delete(`http://localhost:3004/users/${req.params.userId}`)
    .then(function (response) {
      return res.send(response.data);
    });
});

app.post("/api/orders", (req, res) => {
  const orderId = uuidv4();
  const orderData = req.body;
  orderData.id = orderId;
  console.log(orderData);
  axios
    .post("http://localhost:3004/orders", orderData)
    .then(function (response) {
      return res.send(response.data);
    });
});

app.listen(process.env.PORT || 8080, () =>
  console.log(`Listening on port ${process.env.PORT || 8080}!`)
);
