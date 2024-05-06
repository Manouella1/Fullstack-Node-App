const express = require("express");
const app = express();
const cors = require("cors");
const port = 3000;
const mysql = require("mysql");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
// app.use(express.static("../frontend"));

const spelRouter = require("./routes/spelRouter");
const newsRouter = require("./routes/newsRouter");
const orderRouter = require("./routes/orderRouter");
app.use(spelRouter);
app.use(newsRouter);
app.use(orderRouter);

const customerRouter = require("./routes/customerRouter");
app.use(customerRouter);

const cartsRouter = require("./routes/cartsRouter")
const reviewRouter = require("./routes/reviewRouter");
app.use(cartsRouter)
app.use(reviewRouter)

app.get("/", (req, res) => {
  console.log("you've entered our index page");
  res.send("Hello World!");
});

const mongoDBConnection = require("./mongoDBConnection");
mongoDBConnection();

app.get("/hello", (req, res) => {
  console.log("you've entered our index page");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
