const UserModel = require('./UserModel');
const resolver = require('./resolver');
const schema = require('./schema.gql');

module.exports = {
  schema,
  resolver,
  UserModel
};
