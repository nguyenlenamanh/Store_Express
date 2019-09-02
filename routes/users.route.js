var express = require('express');
var router = express.Router();
const userController = require('../controllers/users.controller');
const middleware = require('../middleware/auths.middleware');

router.post('/purchase',userController.purchasePOST);
router.get('/purchase',userController.purchaseGET);

router.get("/",userController.UserInfo);

module.exports = router;