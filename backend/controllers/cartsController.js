const connectionMySQL = require('../connectionMySQL');

exports.getAllCarts = async (req, res) => {
    let sql = "SELECT * FROM cart";
    try {
        await connectionMySQL.query(sql, (error, results, fields) => {
            if (error) {
                return res.status(500).json({
                    error: error.message 
                });
            }
            res.json(results);
        });
    } catch (error) {
        return res.status(500).json({
            error: error.message 
        });
    }
};

exports.getCart = async (req, res) => {
    const { id } = req.params; 
    if (!id || id < 1) {
        return res.status(400).json({
            error: "Invalid Cart ID"
        });
    }

    let sql = "SELECT * FROM cart WHERE cartId = ?";
    try {
        await connectionMySQL.query(sql, [id], (error, results, fields) => {
            if (error) {
                throw error; 
            }
            res.json(results); 
        });
    } catch (error) {
        return res.status(500).json({
            error: "Cart not found"
        });
    }
};

exports.createCart = async (req, res) => {
    const { deliveryOption, deliveryCompany } = req.body;
    let sql = 'INSERT INTO cart (deliveryOption, deliveryCompany) VALUES (?, ?)';
    let params = [deliveryOption, deliveryCompany];

    try {
        await connectionMySQL.query(sql, params, (error, results, fields) => {
            if (error) {
                throw error; 
            }
            res.status(201).json({
                message: 'New cart created successfully!'
            });
        });
    } catch (error) {
        return res.status(500).json({
            error: error.message,
        });
    }
};

exports.updateCart = async (req, res) => {
    const { id, deliveryOption, deliveryCompany } = req.body; 
    if (!id) {
        return res.status(400).json({
            error: "Invalid or missing Cart ID"
        });
    }

    let sql = 'UPDATE cart SET deliveryOption = ?, deliveryCompany = ? WHERE cartId = ?';
    let params = [deliveryOption, deliveryCompany, id];

    try {
        await connectionMySQL.query(sql, params, (error, results, fields) => {
            if (error) {
                throw error;
            }
            res.status(200).json({
                message: `Cart with ID ${id} updated successfully!`
            });
        });
    } catch (error) {
        return res.status(500).json({
            error: error.message,
        });
    }
};

exports.deleteCart = async (req, res) => {
    const { id } = req.params; 
    if (!id) {
        return res.status(400).json({
            error: "Invalid or missing Cart ID"
        });
    }

    let sql = 'DELETE FROM cart WHERE cartId = ?';
    try {
        await connectionMySQL.query(sql, [id], (error, results, fields) => {
            if (error) {
                throw error;
            }
            res.status(200).json({
                message: `Cart with ID ${id} deleted successfully!`
            });
        });
    } catch (error) {
        return res.status(500).json({
            error: error.message,
        });
    }
};
