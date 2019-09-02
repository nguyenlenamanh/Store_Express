var express = require('express');
var router = express.Router();
const productController = require('../controllers/products.controller');

router.get('/:id',productController.getbyID);

router.post('/', productController.addProduct);

router.get('/addtoCart/:id',productController.addtoCart);

module.exports = router;