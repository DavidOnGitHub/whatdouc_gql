'use strict';

const dictionary = '0123456789';
//   'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

module.exports.randomString = length => {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += dictionary.charAt(Math.floor(Math.random() * dictionary.length));
  }
  return result;
};
