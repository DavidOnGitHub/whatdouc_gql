const { AuthenticationError, ForbiddenError } = require('apollo-server');
const BadUserInputError = require('./BadUserInputError');

module.exports = { AuthenticationError, ForbiddenError, BadUserInputError };
