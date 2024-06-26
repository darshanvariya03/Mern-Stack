const express = require('express');
const router = express.Router();
const orderController = require('../controller/orderController');
const { VerifyToken, isAdmin } = require('../middlware/VerifyTokens');


router.post('/orderAdd', VerifyToken, orderController.orderAdd);
router.get('/orderView', VerifyToken, orderController.orderView);
router.delete('/orderDelete', VerifyToken, isAdmin, orderController.orderDelete);
router.put('/orderUpdate', VerifyToken,isAdmin, orderController.orderUpdate);


module.exports = router;