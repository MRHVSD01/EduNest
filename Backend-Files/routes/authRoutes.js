const express = require('express');
const path = require('path');
const router = express.Router();
const { signup , login, logout, forgetPassword, resetPassword}  = require('../controllers/authController');
const authenticateToken = require('../middlewares/authMiddleware');

router.post('/register', signup);

router.post('/login', login);

router.get('/logout', authenticateToken, logout);

router.post('/forget-password', forgetPassword);

router.post('/reset-password/:token', resetPassword);

module.exports = router;