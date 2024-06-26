const express = require('express');
const router = express.Router();
const cartController = require('../controller/cartController');
const { VerifyToken } = require('../middlware/VerifyTokens');


router.get('/singleProduct', VerifyToken, cartController.singleProduct);
router.post('/cartAdd', VerifyToken, cartController.cartAdd);
router.get('/cartView', VerifyToken, cartController.cartView);
router.delete('/cartDelete', VerifyToken, cartController.cartDelete);
router.post('/cartUpdate', VerifyToken, cartController.cartUpdate);
router.delete('/cartClear', VerifyToken, cartController.cartClear);



module.exports = router;