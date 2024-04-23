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

app.get("/", (req, res) => {
  res.send(console.log("you've entered our index page"));
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
