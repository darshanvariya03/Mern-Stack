const express = require('express');
const router = express.Router();
const userController = require('../controller/userController'); // Correct the path if necessary
const { VerifyToken, isAdmin } = require('../middlware/VerifyTokens'); // Correct the path if necessary

router.post('/registeruser',  userController.registerUser);
router.post('/loginuser',  userController.loginUser);
router.get('/adminAuth', VerifyToken, isAdmin, userController.adminAuth);
router.get('/getUser', VerifyToken, userController.getUser);
router.get('/getUserprofile', VerifyToken, userController.getUserprofile);
router.put('/updateUser', VerifyToken, userController.updateUser);
router.put('/changePassword', VerifyToken, userController.changePassword);
router.delete('/deleteUser', VerifyToken, isAdmin, userController.deleteUser);

module.exports = router;
