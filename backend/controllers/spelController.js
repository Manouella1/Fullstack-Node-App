const connectionMySQL = require("../connectionMySQL");

// Hämta våra spel

exports.getGames = async (req, res) => {
  let sql = "SELECT * FROM products";
  try {
    await connectionMySQL.query(sql, (error, results, fields) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results);
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

// exports.getGames = async (req, res) => {
//   let sql = "SELECT * FROM OrderView";
//   try {
//     await connectionMySQL.query(sql, (error, results, fields) => {
//       if (error) {
//         throw error;
//       }
//       res.status(200).json(results);
//     });
//   } catch (error) {
//     return res.status(500).json({
//       error: error.message,
//     });
//   }
// };

// Hämta ett spel
exports.getGame = async (req, res) => {
  const { id } = req.params;
  //  prepared statement med ?
  let sql = "SELECT * FROM products WHERE productId = ?";

  if (id < 1) {
    res.status(500).json({
      error: "Could not find game specified",
    });
  }

  try {
    await connectionMySQL.query(sql, [id], (error, results, fields) => {
      if (error) throw error;
      res.json(results);
    });
  } catch (error) {
    return res.status(500).json({
      error: "Could not find game specified",
    });
  }
};

// Skjut in ett spel
exports.postGame = async (req, res) => {
  const {
    pubPro,
    productSerial,
    productName,
    productImage,
    productStock,
    productPrice,
    productCategory,
  } = req.body;

  let sql =
    "INSERT INTO products(pubpro, productSerial, productName, productImage, productStock, productPrice, productCategory) VALUES(?,?,?,?,?,?,?)";

  let params = [
    pubPro,
    productSerial,
    productName,
    productImage,
    productStock,
    productPrice,
    productCategory,
  ];

  if (pubPro < 1 && pubPro > 4) {
    return res.status(500).json({
      error: "Wrong platform and/or doesn't exist!",
    });
  }

  try {
    await connectionMySQL.query(sql, params, (error, results, fields) => {
      if (error) throw error;
      res.status(201).json(results);
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

// Ändra ett spel
exports.putGame = async (req, res) => {
  const {
    pubPro,
    productSerial,
    productName,
    productImage,
    productStock,
    productPrice,
    productCategory,
    productId,
  } = req.body;

  let sql =
    "UPDATE products SET pubPro = ?, productSerial = ?, productName = ?, productImage = ?, productStock = ?, productPrice = ?, productCategory = ? WHERE productID = ?";

  let params = [
    pubPro,
    productSerial,
    productName,
    productImage,
    productStock,
    productPrice,
    productCategory,
    productId,
  ];

  if (!productId) {
    return res.status(400).json({
      success: false,
      error: "Invalid productId and/or missing",
    });
  }

  try {
    await connectionMySQL.query(sql, params, (error, results, fields) => {
      if (error) throw error;
      res.status(200).json(results);
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Radera ett spel
exports.delGame = async (req, res) => {
  const { productId } = req.body;
  let sql = "DELETE FROM products WHERE productId = ?";
  try {
    await connectionMySQL.query(sql, [productId], (error, results, fields) => {
      if (error) throw error;
      res.status(200).json({
        success: true,
        message: "successfully removed game",
      });
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};
