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

// POST: REGISTER *************

exports.registerCustomer = async (req, res) => {
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

// PATCH *********
exports.patchCustomer = async (req, res) => {
  console.log("hej");
  const { customerName, customerMail, customerAdress, customerPassword } =
    req.body;

  const { id } = req.params;

  // Använder Prepared Statements genom ? i SQL-koden och att ange paramatern i query-funktionen
  let sql =
    "UPDATE customers SET customerName = ?, customerMail = ?, customerAdress = ?, customerPassword = ? WHERE customerId = ?";
  let params = [
    customerName,
    customerMail,
    customerAdress,
    customerPassword,
    id,
  ];

  // Om man inte skrivit in ID vid PATCH
  if (!id) {
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
  // const { customerId } = req.body

  const customerId = req.params.id;
  console.log("Deleting customer with ID:", customerId);
  // Vi använder Prepared Statements genom ? i SQL-koden och att ange paramatern i query-funktionen
  let sql = "DELETE FROM customers WHERE customerId = ?";

  if (!customerId) {
    return res.status(400).json({
      success: false,
      error: "Du har inte skrivit in något ID för kunden du ska radera!",
    });
  }

  connectionMySQL.query(sql, [customerId], (error, results, fields) => {
    if (error) {
      console.error("Error during database operation:", error);
      // Specifikt kontrollera SQL-felkoder relaterade till främmande nyckelbegränsningar
      if (
        error.code === "ER_ROW_IS_REFERENCED_2" ||
        error.code === "ER_ROW_IS_REFERENCED"
      ) {
        return res.status(409).json({
          success: false,
          error:
            "Kunden kan inte raderas eftersom den finns med i en eller flera ordrar.",
        });
      } else {
        return res.status(500).json({
          success: false,
          error: "Ett oväntat fel inträffade.",
        });
      }
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        error: "Kunden hittades inte.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Kunden har raderats framgångsrikt.",
    });
  });
};
