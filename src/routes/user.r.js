const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/user.c');
const { validateSignup, validateLogin } = require('../middlewares/validate.u.m');

router.post('/signup', validateSignup, signup);
router.post('/login', validateLogin, login);

module.exports = router;