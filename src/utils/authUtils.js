'use strict';

const _ = require('lodash');
const moment = require('moment');
const jwt = require('jwt-simple');
const { jwtSecret } = require('../config/auth');
const { timeFormat } = require('../config/app');

module.exports = {
  generateToken: userInfo => jwt.encode(_.assign({}, userInfo, { expireTime: moment().add(1, 'days').format(timeFormat) }), jwtSecret, 'HS512'),
  decode: token => jwt.decode(token, jwtSecret)
};
