const { ApolloError } = require('apollo-server');

module.exports = (message, properties) => (
  new ApolloError(message, 'BAD_USER_INPUT', properties)
);
