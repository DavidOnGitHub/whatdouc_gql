'use strict';

const _ = require('lodash');
const {validation} = require('../../utils/validationUtils');

const validateLogin = (req, res, next) => {
    const error = validation(req.body)
        .require('username')
        .require('password')
        .getErrors();

    return _.isEmpty(error) ? next() : next({status: 400, error});
};

const validateFacebookLogin = (req, res, next) => {
    const error = validation(req.body)
        .require('token')
        .getErrors();

    return _.isEmpty(error) ? next() : next({status: 400, error});
};

const validateRegister = (req, res, next) => {
    const error = validation(req.body)
        .require('email')
        .validEmail('email')
        .getErrors();

    return _.isEmpty(error) ? next() : next({status: 400, error});
};

const validateActivate = (req, res, next) => {
    const error = validation(req.body)
        .require('password')
        .require('activationCode')
        .validPassword('password')
        .getErrors();

    return _.isEmpty(error) ? next() : next({status: 400, error});
};

const validateSuggestNickname = (req, res, next) => {
    const error = validation(req.body)
        .require('name')
        .containsOnly(['name'])
        .getErrors();

    return _.isEmpty(error) ? next() : next({status: 400, error});
};

const validateChangePassword = (req, res, next) => {
    const error = validation(req.body)
        .require('oldPassword')
        .require('newPassword')
        .validPassword('oldPassword')
        .validPassword('newPassword')
        .getErrors();

    return _.isEmpty(error) ? next() : next({status: 400, error});
};

module.exports = {
    validateLogin,
    validateFacebookLogin,
    validateRegister,
    validateActivate,
    validateSuggestNickname,
    validateChangePassword
};
