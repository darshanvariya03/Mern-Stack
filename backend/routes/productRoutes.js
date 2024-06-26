const express = require('express');
const router = express.Router();

const cloudinary = require('../config/cloudinary')  

const multer = require('multer')

const storage = multer.diskStorage({});
  
const upload = multer({ storage: storage }).single('image'); 

const  productController =require('../controller/productController');
const { VerifyToken, isAdmin } = require('../middlware/VerifyTokens');

router.post('/productAdd',  VerifyToken, isAdmin, upload,productController.ProductAdd);
router.get('/productView',  productController.productView);
router.delete('/productDelete', VerifyToken,  isAdmin, productController.productDelete);
router.get('/productEdit', VerifyToken, isAdmin, productController.productEdit);
router.put('/productUpdate', VerifyToken, isAdmin, upload,productController.productUpdate);
router.put('/mstatusUpdate', VerifyToken, isAdmin, productController.mstatusUpdate);
router.get('/userProduct', productController.userProduct);
router.get('/singleProduct', productController.singleProduct);
router.get('/newProduct', productController.newProduct);


module.exports = router;
 