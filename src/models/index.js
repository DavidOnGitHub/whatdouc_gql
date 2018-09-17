const _ = require('lodash');
const Root = require('./Root');
const Location = require('./Location');
const Question = require('./Question');
const Answer = require('./Answer');
const User = require('./User');

module.exports = {
  schema: [Root.schema, Location.schema, Question.schema, Answer.schema, User.schema],
  resolver: _.merge(Root.resolver, Question.resolver, Answer.resolver, User.resolver)
};
