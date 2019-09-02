var express = require('express');
var categoriesController = require('../controllers/categories.controller');
var router = express.Router();

router.get('/',categoriesController.categoriesAll);

router.get('/:id',categoriesController.categoriesByID);

module.exports = router;