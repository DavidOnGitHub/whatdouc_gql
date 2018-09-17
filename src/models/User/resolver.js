const { BadUserInputError } = require('../../errors');
const bcrypt = require('bcryptjs');
const authConfig = require('../../config/auth');
const UserModel = require('./UserModel');
const { generateToken } = require('../../utils/authUtils');
const { randomString } = require('../../utils/stringUtils');
const { sendRegisterEmail } = require('../../utils/emailUtils');

module.exports = {
  Mutation: {
    changePassword: async(_, { oldPassword, newPassword }, context) => {
      const user = await UserModel.findOne({ username: context.user.username }).exec();
      const isOldPasswordCorrect = await user.checkPassword(oldPassword);
      if (isOldPasswordCorrect) {
        user.password = newPassword;
        await user.save();
        return 'Password updated';
      }

      throw BadUserInputError('Old password is not correct');
    }
  }
  // Mutation: {
  //   login: async (_, { username, password }) => {
  //     const user = await UserModel.findOne({username: username.toLowerCase()}).exec();
  //     if (user) {
  //       if (!user.isActivated) throw new Error('User is not activated');
  //       const isPassCorrect = await user.checkPassword(password);
  //       if (isPassCorrect) {
  //         const token = generateToken(user.toJson());
  //         return Object.assign({ token, user: user.toJson() });
  //       } else {
  //         throw new Error('Invalid credentials');
  //       }
  //     }
  //   },
  //   register: async (_, { email }) => {
  //     const user = await UserModel.findOne({ email }).exec();
  //     if (user) {
  //       throw new Error('Email has already been registered');
  //     } else {
  //       const newUser = new UserModel();
  //       const activationCode = randomString(64);
  //       await sendRegisterEmail(email, activationCode);
  //       Object.assign(newUser, { username: email, email, activationCode, isActivated: false });
  //       await newUser.save();
  //       return 'User created';
  //     }
  //   },
  //   activate: async (_, { password, activationCode }) => {
  //     const hashedPassword = await bcrypt.hash(password, authConfig.bcrypt.rounds);
  //     const user = await UserModel.findOneAndUpdate({ activationCode }, {
  //       $set: { password: hashedPassword, isActivated: true },
  //       $unset: { activationCode: '' }
  //     }, { new: true }).exec();
  //     if (user) {
  //       return user.toJson();
  //     } else {
  //       throw new Error('Invalid activation code');
  //     }
  //   }
  // }
};
