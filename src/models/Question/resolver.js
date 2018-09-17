const moment = require('moment');
const _ = require('lodash');
const { AnswerModel } = require('../Answer');
const QuestionModel = require('./QuestionModel');
const { UserModel } = require('../User');

module.exports = {
  Query: {
    questions: async (_, args) => {
      const questions = await QuestionModel.find({
        location: {
          $geoWithin: {
            $geometry: args.region
          }
        }
      }).exec();
      console.log(`${questions.length} questions returned`);
      return questions;
    },
    myQuestions: (_, args, context) => {
      return QuestionModel.find({ userId: context.user._id }).exec();
    }
  },

  Question: {
    answers: (question, args, context) => {
      return AnswerModel.find({ questionId: question._id }).exec();
    },
    user: async (question, args, context) => {
      const user = await UserModel.findById(question.userId).exec();
      return user ? user.toJson() : null;
    }
  },

  Mutation: {
    postQuestion: (__, { question }, context) => {
      const newQuestion = Object.assign(new QuestionModel(), question, {
        userId: context.user._id,
        created: moment().utc().format(),
        edited: moment().utc().format(),
      });
      return newQuestion.save();
    },
    saveQuestion: async (___, { questionId, question }, context) => {
      const existingQuestion = await QuestionModel.findById(questionId).exec();
      if (existingQuestion) {
        // TODO: validation
        Object.assign(existingQuestion, _.pick(question, ['subject', 'content']), { edited: moment().utc().format() });
        return existingQuestion.save();
      } else {
        //404 or other error here
        return null;
      }
    },
  },

};
