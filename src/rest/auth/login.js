'use strict';

const router = require('express').Router();
const { generateToken } = require('../../utils/authUtils');
const { UserModel } = require('../../models/User');
const { validateLogin } = require('./request-validator');

router.post('/', validateLogin, async (req, res) => {
  const { username, password } = req.body;

  const user = await UserModel.findOne({
    username: username.toLowerCase()
  }).exec();
  if (user) {
    const isMatching = await user.checkPassword(password);
    if (isMatching) {
      const token = generateToken(user.toJson());
      res.status(200).json(Object.assign({ token, user: user.toJson() }));
    } else {
      res.status(401).send('username and password does not match');
    }
  } else {
    res.status(401).send('user not found');
  }
});

module.exports = router;
