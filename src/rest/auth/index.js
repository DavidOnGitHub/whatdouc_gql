'use strict';

const router = require('express').Router();
const login = require('./login');
const facebookLogin = require('./facebookLogin');
const activate = require('./activate');
const register = require('./register');
const suggestNickname = require('./suggestNickname');

router.use('/login', login);
router.use('/facebook-login', facebookLogin);
router.use('/activate', activate);
router.use('/register', register);
router.use('/suggest-nickname', suggestNickname);

module.exports = router;
