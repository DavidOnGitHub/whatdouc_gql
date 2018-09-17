'use strict';

const router = require('express').Router();
const fetch = require('node-fetch');
const { generateToken } = require('../../utils/authUtils');
const { convertFacebookResponse } = require('../../utils/convertUtils');
const { UserModel } = require('../../models/User');
const { validateFacebookLogin } = require('./request-validator');

router.post('/', validateFacebookLogin, (req, res) => {
  const { token } = req.body;

  fetch(`https://graph.facebook.com/v2.5/me?fields=id,email,first_name,last_name,name,age_range,picture,gender&access_token=${token}`)
    .then(response => response.json(), error => console.log(error))
    .then(response => {
      const facebookUser = convertFacebookResponse(response);
      UserModel.findOne({ facebookId: facebookUser.facebookId }).exec().then(existingUser => {
        if (existingUser) {
          const userInfo = Object.assign({}, existingUser.toJson(), facebookUser);
          const token = generateToken(userInfo);
          res.json({ user: userInfo, token });
        } else {
          const newUser = Object.assign(new UserModel(), {
            facebookId: facebookUser.facebookId
          });

          newUser.save().then(savedUser => {
            const userInfo = Object.assign({}, savedUser, facebookUser);
            const token = generateToken(userInfo);
            res.json({ user: userInfo, token });
          }, error => console.log('save error', error))
          .catch(err => console.log('uncaught error', err));
        }
      }, error => console.log('find error', error));
    });
});

module.exports = router;
