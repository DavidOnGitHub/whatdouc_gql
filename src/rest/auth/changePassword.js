const router = require('express').Router();
const bcrypt = require('bcryptjs');
const authConfig = require('../../config/auth');
const { UserModel } = require('../../models/User');
const { validateChangePassword } = require('./request-validator');

router.post('/', validateChangePassword, async (req, res) => {
  const { username, newPassword, oldPassword } = req.body;

  try {
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }
    if (user.checkPassword(oldPassword)) {
      const hashedPassword = await bcrypt.hash(newPassword, authConfig.bcrypt.rounds);
      user.password = hashedPassword;
      await user.save();
      res.status(200);
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
