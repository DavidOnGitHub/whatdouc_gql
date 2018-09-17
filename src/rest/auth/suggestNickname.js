'use strict';

const router = require('express').Router();
const { UserModel } = require('../../models/User');
const { validEmail } = require('../../utils/validationUtils');
const { randomString } = require('../../utils/stringUtils');
const { validateSuggestNickname } = require('./request-validator');

let counter = 0;
let totalCount = 0;
const suggestNickname = (name) => new Promise((resolve, reject) => {
  let nickname = `${name}.${randomString(3)}`;
  UserModel.findOne({ nickname }).exec()
    .then((user) => {
      if (user) {
        if (totalCount > 20) {
          resolve(nickname);
        }
        if (counter > 10) {
          counter = 0;
          resolve(suggestNickname(`${name}${randomString(1)}`));
        } else {
          counter += 1;
          totalCount += 1;
          resolve(suggestNickname(name));
        }
      } else {
        resolve(nickname);
      }
    }, reject);
});

router.post('/', validateSuggestNickname, (req, res) => {
  const { name } = req.body;
  if (validEmail(name)) {
    const username = name.split('@')[0];
    const firstName = username.split('.')[0];
    suggestNickname(firstName).then(suggestedName => res.json({ suggestedName}));
  } else {
    suggestNickname(name).then(suggestedName => res.json({ suggestedName}));
  }
});

module.exports = router;
