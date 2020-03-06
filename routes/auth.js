const express = require('express');
const router = express.Router();
const { register, login, getMe, forgotPassword } = require('../controllers/AuthController');
const { protect } = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.post('/forgotpassword', forgotPassword);

module.exports = router;