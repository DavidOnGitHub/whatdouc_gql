'use strict';

const router = require('express').Router();
const { UserModel } = require('../../models/User');
const { validateActivate } = require('./request-validator');

router.post('/', validateActivate, async (req, res) => {
  const { password, activationCode } = req.body;

  try {
    const user = await UserModel.findOne({ activationCode }).exec();
    if (!user) res.status(400).json({ message: 'invalid activationCode' });

    user.password = password;
    delete user.activationCode;
    const newUser = await user.save();
    res.json(newUser.toJson());
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
