const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const authConfig = require('../../config/auth');

const schema = new mongoose.Schema({
  username: String,
  facebookId: String,
  password: String,
  activationCode: String,
  isActivated: Boolean,
  email: String,
  picture: String
});

schema.pre('save', async function(next) {
  if (this.password) {
    const hashedPassword = await bcrypt.hash(this.password, authConfig.bcrypt.rounds);
    this.password = hashedPassword;
    next();
  }
});

schema.methods.checkPassword = function(password) {
  return bcrypt.compare(password, this.password);
};

schema.method('toJson', function() {
  const user = this.toObject();
  delete user.password;
  delete user.__v;

  return user;
});

module.exports = mongoose.model('User', schema);
