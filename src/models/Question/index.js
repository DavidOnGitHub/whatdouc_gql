const schema = require('./schema.gql');
const QuestionModel = require('./QuestionModel');
const resolver = require('./resolver');

module.exports = {
  schema,
  resolver,
  QuestionModel
};
