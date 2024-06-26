const express = require('express');
const router = express.Router();
const cateController = require('../controller/cateController');
const { VerifyToken, isAdmin } = require('../middlware/VerifyTokens');


router.post('/categoryAdd', VerifyToken, isAdmin, cateController.CategoryAdd);
router.get('/categoryView', VerifyToken, cateController.categoryView);
router.delete('/categoryDelete', VerifyToken, isAdmin, cateController.categoryDelete);
router.get('/categoryEdit', VerifyToken, isAdmin, cateController.categoryEdit);
router.put('/categoryUpdate', VerifyToken, isAdmin, cateController.categoryUpdate);



module.exports = router;