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
    user.isActivated = true;
    await user.save();
    res.end('Activation successful');
  } catch (error) {
    console.log(error);
    res.status(500).end(error);
  }
});

module.exports = router;
