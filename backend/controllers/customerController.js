const connectionMySQL = require("./../connectionMySQL");

exports.getCustomers = async (req, res) => {
  let sql = "SELECT * FROM customers";
  try {
    await connectionMySQL.query(sql, (error, results, fields) => {
      if (error) {
        if (error) throw error;
      }
      res.json(results);
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

// GET **********

exports.getCustomerById = async (req, res) => {
  const { id } = req.params;

  //Vi använder Prepared Statements genom ? i SQL-koden och att ange paramatern i query-funktionen
  let sql = "SELECT * FROM customers WHERE customerId = ?";
  try {
    await connectionMySQL.query(sql, [id], (error, results, fields) => {
      if (error) {
        if (error) throw error;
      }
      res.json(results);
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

// POST ********

exports.postCustomer = async (req, res) => {
  const { customerName, customerMail, customerAdress, customerPassword } =
    req.body;

  if (!customerMail || customerMail.trim().length < 1) {
    return res.status(400).json({
      success: false,
      error: "Du har inte skrivit in någon mail",
    });
  }

  // Använder Prepared Statements genom ? i SQL-koden och att ange paramatern i query-funktionen
  let sql =
    "INSERT INTO customers (customerName, customerMail, customerAdress,customerPassword) VALUES(?, ?, ?, ?)";
  let params = [customerName, customerMail, customerAdress, customerPassword];

  try {
    await connectionMySQL.query(sql, params, (error, results, fields) => {
      if (error) {
        if (error) throw error;
      }
      return res.status(201).json(results);
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// PUT *********
exports.putCustomer = async (req, res) => {
  const {
    customerName,
    customerMail,
    customerAdress,
    customerPassword,
    customerId,
  } = req.body;

  // Använder Prepared Statements genom ? i SQL-koden och att ange paramatern i query-funktionen
  let sql =
    "UPDATE customers SET customerName = ?, customerMail = ?, customerAdress = ?, customerPassword = ? WHERE customerId = ?";
  let params = [
    customerName,
    customerMail,
    customerAdress,
    customerPassword,
    customerId,
  ];

  // Om man inte skrivit in sitt namn ?
  if (!username || customerName.trim().length < 1) {
    return res.status(400).json({
      success: false,
      error: "Du har inte skrivit in något username för användaren",
    });
  }

  // Om man inte skrivit in ID vid PUT
  if (!customerId) {
    return res.status(400).json({
      success: false,
      error: "Du har inte skrivit in något ID för användaren du ska uppdatera!",
    });
  }

  try {
    await connectionMySQL.query(sql, params, (error, results, fields) => {
      if (error) {
        if (error) throw error;
      }
      return res.status(201).json({
        success: true,
        error: "",
      });
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// // // DELETE ********
exports.deleteCustomer = async (req, res) => {
  const { customerId } = req.body;

  // Vi använder Prepared Statements genom ? i SQL-koden och att ange paramatern i query-funktionen
  let sql = "DELETE FROM customer WHERE customerId = ?";

  if (!customerId) {
    return res.status(400).json({
      success: false,
      error: "Du har inte skrivit in något ID för kunden du ska radera!",
    });
  }

  try {
    await connectionMySQL.query(sql, [customerId], (error, results, fields) => {
      if (error) {
        if (error) throw error;
      }
      return res.status(201).json({
        success: true,
        error: "",
        message: "kunden är nu raderad!",
      });
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
