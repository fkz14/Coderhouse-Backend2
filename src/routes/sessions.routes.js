const express = require('express');
const router = express.Router();
const passport = require('passport');
require('../config/passport')(); // inicializa strategies
const auth = require('../controllers/auth.controller');

router.post('/register', auth.register);
router.post('/login', auth.login);
router.get('/current', passport.authenticate('jwt', { session: false }), auth.current);
router.post('/forgot-password', auth.forgotPassword);
router.post('/reset-password/:token', auth.resetPassword);

module.exports = router;
