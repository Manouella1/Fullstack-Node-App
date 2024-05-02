const express = require("express");
const app = express();
const cors = require("cors");
const port = 3000;
const mysql = require("mysql");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(express.static("../frontend/public"));

const spelRouter = require("./routes/spelRouter");
app.use(spelRouter);

const customerRouter = require("./routes/customerRouter");
app.use(customerRouter);

app.get("/", (req, res) => {
  console.log("you've entered our index page");
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
