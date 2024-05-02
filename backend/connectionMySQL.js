const mysql = require("mysql");
const connectionMySQL = mysql.createConnection({
  host: "localhost",
  user: "rootuser",
  password: "sitar123",
  database: "game_store_test",
});

module.exports = connectionMySQL;
