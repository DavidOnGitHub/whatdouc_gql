const moment = require('moment');

module.exports = {
  Query: {
    date: () => moment().format()
  },
};
