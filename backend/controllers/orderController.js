const connectionMySQL = require("../connectionMySQL");

exports.getOrder = async (req, res) => {
  const d = new Date();
  const time = d.toString().slice(0, 24);

  //   let sql = "SELECT * FROM OrderView";

  //   let sql = "SELECT * FROM orders";

  let sql =
    "SELECT orders.orderId, products.productName, customers.customerName, cart.shippingAdress, orders.orderNumber, products.productSerial, orders.orderQuantity FROM products INNER JOIN orders ON products.productId = orders.productOrder INNER JOIN customers ON orders.customerOrder = customers.customerId INNER JOIN cart ON orders.cartOrder = cart.cartId ORDER BY orders.orderId DESC";

  try {
    await connectionMySQL.query(sql, (error, results, fields) => {
      if (error) throw error;
      res.status(200).json({
        result: results,
        success: true,
        log: { date: time, text: "Successfully GET orders" },
      });
    });
  } catch (error) {
    return res.status(200).json({
      success: false,
      error: error.message,
    });
  }
};

exports.postOrder = async (req, res) => {
  const d = new Date();
  const time = d.toString().slice(0, 24);

  const { productOrder, orderNumber, customerOrder, cartOrder, orderQuantity } =
    req.body;

  let sql =
    "INSERT INTO orders (productOrder, orderNumber,  customerOrder, cartOrder, orderQuantity) VALUES (?, ?, ?, ?, ?)";

  let params = [
    productOrder,
    orderNumber,
    customerOrder,
    cartOrder,
    orderQuantity,
  ];

  try {
    await connectionMySQL.query(sql, params, (error, results, fields) => {
      if (error) throw error;
      return res.status(201).json({
        result: results,
        success: true,
        log: { date: time, text: "Successfully POSTed new order !" },
      });
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.patchOrder = async (req, res) => {
  const { id } = req.params;
  const aField = req.body;
  try {
    let sql = "UPDATE orders SET ? WHERE orderId = ?";
    const params = [aField, id];
    await connectionMySQL.query(sql, params, (error, results, field) => {
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

exports.deleteOrder = async (req, res) => {
  const { orderId } = req.body;
  let sql = "DELETE FROM orders WHERE orderId = ?";
  //   let params = [orderId];
  try {
    await connectionMySQL.query(sql, [orderId], (error, results, fields) => {
      if (error) throw error;
      res.status(200).json({
        success: true,
        message: results,
      });
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.listGameStock = async (req, res) => {
  let sql = "SELECT productId, productName, productStock FROM products";
  try {
    await connectionMySQL.query(sql, (error, results, field) => {
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
