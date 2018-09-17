const mongoose = require('mongoose');
const config = require('./config/app');

const setupDb = () => {
  mongoose.Promise = Promise;
  mongoose.connect(config.mongoUri);
  const db = mongoose.connection;
  db.on('error', () => console.error('db connection error......'));
  db.on('openUri', () => console.log('db connected......'));
  console.log('mongodb configured.');
};

module.exports = {
  setupDb
};
