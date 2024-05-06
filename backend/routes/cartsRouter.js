const express = require('express');
const router = express.Router();
const cartsController = require('../controllers/cartsController');

router.get('/api/carts', cartsController.getAllCarts); 
router.get('/api/carts/:id', cartsController.getCart); 
router.post('/api/carts', cartsController.createCart);
router.put('/api/carts/:id', cartsController.updateCart);
router.delete('/api/carts/:id', cartsController.deleteCart);

module.exports = router;
