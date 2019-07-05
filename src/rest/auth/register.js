'use strict';

const router = require('express').Router();
const { UserModel } = require('../../models/User');
const { randomString } = require('../../utils/stringUtils');
const { sendRegisterEmail } = require('../../utils/emailUtils');
const { validateRegister } = require('./request-validator');

router.post('/', validateRegister, (req, res) => {
  const email = req.body.username.toLowerCase();
  UserModel.findOne({ email })
    .exec()
    .then(async user => {
      if (user) {
        res.status(409).send('Email already registered');
      } else {
        const newUser = new UserModel();
        const activationCode = randomString(64);
        sendRegisterEmail(email, activationCode).then(() => {
          Object.assign(newUser, {
            username: email,
            email,
            activationCode,
            isActivated: false,
            password: req.body.password
          });
          newUser.save().then(() => {
            res.status(200).send('User created');
          });
        });
      }
    });
});

module.exports = router;
