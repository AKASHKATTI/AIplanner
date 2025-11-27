const userController = require('../controller/user.controller');
const { authenticateUser } = require('../middleware/user.middleware');

const express = require('express');
const router = express.Router();

router.post('/register',userController.registerUser);
router.post('/login',userController.loginUser);
router.get('/profile', authenticateUser ,userController.getUserProfile);
router.post('/logout',userController.logoutUser);


module.exports = router;